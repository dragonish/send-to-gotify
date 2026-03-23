import * as core from '@actions/core';
import { getApiUrl, parsePriority, parseContentType, isDisplayContentType, parseExtras } from './common.js';
import { send } from './sendNotify.js';

function panic(msg: string) {
  core.error(msg);
  core.setFailed(msg);
}

async function main() {
  const inputs: Inputs = {
    url: core.getInput('url', { required: true }),
    token: core.getInput('token', { required: true }),
    message: core.getInput('message', { required: true }),
    title: core.getInput('title'),
    priority: core.getInput('priority'),
    contentType: core.getInput('content-type'),
    clickUrl: core.getInput('click-url'),
    bigImageUrl: core.getInput('big-image-url'),
    intentUrl: core.getInput('intent-url'),
    extras: core.getInput('extras'),
  };

  if (!inputs.url) {
    panic('Gotify service address ie empty!');
    return;
  }
  if (!inputs.token) {
    panic('Gotify application token ie empty!');
    return;
  }
  if (!inputs.message) {
    panic('The message is empty!');
    return;
  }

  const apiUrl = getApiUrl(inputs.url, inputs.token);
  const priority = parsePriority(inputs.priority);
  if (inputs.priority && priority == undefined) {
    core.warning('The priority cannot be parsed correctly!');
  }
  const contentType = parseContentType(inputs.contentType);
  if (!isDisplayContentType(contentType)) {
    core.info(`Note: Client display content is set to "${contentType}". This is not a common value; it is usually "text/plain" or "text/markdown".`);
  }
  const extras = parseExtras(inputs.extras);
  if (extras === null) {
    core.warning('Error in parsing of extras!');
  }

  core.info('Sending notification...');

  try {
    const res = await send({
      apiUrl,
      contentType,
      priority,
      extras,
      message: inputs.message,
      title: inputs.title,
      clickUrl: inputs.clickUrl,
      bigImageUrl: inputs.bigImageUrl,
      intentUrl: inputs.intentUrl,
    });

    core.info('Notification sent successfully.');
    core.setOutput('id', res.id);
    core.setOutput('appid', res.appid);
    core.setOutput('date', res.date);
    core.setOutput('success', 'true');
  } catch (err) {
    const msg = (err as unknown as Error).message;
    core.error('Failed to send notification!');
    core.error(`Error: ${msg}`);
    core.setOutput('id', 0);
    core.setOutput('appid', 0);
    core.setOutput('date', '');
    core.setOutput('success', 'false');
  }
}

main();
