import got, { HTTPError } from 'got';

export async function send(inputs: SendInputs) {
  const { apiUrl, message, title, priority, contentType, clickUrl, bigImageUrl, intentUrl, extras } = inputs;
  const body: MessageBody = {
    message,
    extras: {
      'client::display': {
        contentType,
      },
    },
  };

  if (title) {
    body.title = title;
  }
  if (priority != undefined) {
    body.priority = priority;
  }
  if (clickUrl || bigImageUrl) {
    body.extras['client::notification'] = {};
    if (clickUrl) {
      Object.assign(body.extras['client::notification'], {
        click: {
          url: clickUrl,
        },
      });
    }
    if (bigImageUrl) {
      Object.assign(body.extras['client::notification'], {
        bigImageUrl,
      });
    }
  }
  if (intentUrl) {
    body.extras['android::action'] = {
      onReceive: {
        intentUrl,
      },
    };
  }
  if (extras) {
    Object.assign(body.extras, extras);
  }

  try {
    const res = await got
      .post<MessageResponse>(apiUrl, {
        retry: {
          limit: 1,
        },
        timeout: {
          request: 30000,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'json',
        body: JSON.stringify(body),
      })
      .json<MessageResponse>();

    return res;
  } catch (err) {
    if (err instanceof HTTPError && err.response.body) {
      const bad: BadResponse = err.response.body;
      throw new Error(bad.errorDescription);
    } else {
      throw new Error('Other types of errors (network errors, timeouts, etc.).');
    }
  }
}
