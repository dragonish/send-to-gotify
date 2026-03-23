import 'dotenv/config';
import 'mocha';
import { expect } from 'chai';
import { send } from '../src/sendNotify.js';

let apiUrl = '';

describe('sendNotify', function () {
  before(function () {
    apiUrl = process.env.API_URL || '';
    if (!apiUrl) {
      console.error('The API URL is empty! Please create a .env file in the project root directory and set the API_URL variable.');
      this.skip();
    }
  });

  it('send a message', async function () {
    const res = await send({
      apiUrl,
      message: 'This is a test message.',
      contentType: 'text/plain',
    });
    expect(res).to.have.own.property('message');
    expect(res).to.have.own.property('extras');
    expect(res).to.have.own.property('appid');
    expect(res).to.have.own.property('date');
    expect(res).to.have.own.property('id');
  });

  it('send a message with title', async function () {
    const res = await send({
      apiUrl,
      title: 'Test title',
      message: 'This is a test message with title.',
      contentType: 'text/plain',
    });
    expect(res).to.have.own.property('title');
    expect(res).to.have.own.property('message');
    expect(res).to.have.own.property('extras');
    expect(res).to.have.own.property('appid');
    expect(res).to.have.own.property('date');
    expect(res).to.have.own.property('id');
  });

  it('send a message with priority', async function () {
    const res = await send({
      apiUrl,
      message: 'This is a test message with priority.',
      contentType: 'text/plain',
      priority: 10,
    });
    expect(res).to.have.own.property('priority');
    expect(res).to.have.own.property('message');
    expect(res).to.have.own.property('extras');
    expect(res).to.have.own.property('appid');
    expect(res).to.have.own.property('date');
    expect(res).to.have.own.property('id');
  });

  it('send a message with clickUrl', async function () {
    const res = await send({
      apiUrl,
      message: 'This is a test message with clickUrl.',
      contentType: 'text/plain',
      priority: 10,
      clickUrl: 'https://gotify.net',
    });
    expect(res).to.have.own.property('priority');
    expect(res).to.have.own.property('message');
    expect(res).to.have.own.property('appid');
    expect(res).to.have.own.property('date');
    expect(res).to.have.own.property('id');
    expect(res).to.have.deep.property('extras', {
      'client::display': {
        contentType: 'text/plain',
      },
      'client::notification': {
        click: { url: 'https://gotify.net' },
      },
    });
  });

  it('send a message with bigImageUrl', async function () {
    const res = await send({
      apiUrl,
      message: 'This is a test message with bigImageUrl.',
      contentType: 'text/plain',
      bigImageUrl: 'https://gotify.net/img/logo.png',
    });
    expect(res).to.have.own.property('message');
    expect(res).to.have.own.property('appid');
    expect(res).to.have.own.property('date');
    expect(res).to.have.own.property('id');
    expect(res).to.have.deep.property('extras', {
      'client::display': {
        contentType: 'text/plain',
      },
      'client::notification': {
        bigImageUrl: 'https://gotify.net/img/logo.png',
      },
    });
  });

  it('send a message with intentUrl', async function () {
    const res = await send({
      apiUrl,
      message: 'This is a test message with intentUrl.',
      contentType: 'text/plain',
      intentUrl: 'https://gotify.net',
    });
    expect(res).to.have.own.property('message');
    expect(res).to.have.own.property('appid');
    expect(res).to.have.own.property('date');
    expect(res).to.have.own.property('id');
    expect(res).to.have.deep.property('extras', {
      'client::display': {
        contentType: 'text/plain',
      },
      'android::action': {
        onReceive: { intentUrl: 'https://gotify.net' },
      },
    });
  });

  it('send a message with extras', async function () {
    const res = await send({
      apiUrl,
      message: 'This is a test message with extras.',
      contentType: 'text/plain',
      extras: {
        'home::lighting': {
          onLighting: {
            brightness: 15,
          },
        },
      },
    });
    expect(res).to.have.own.property('message');
    expect(res).to.have.own.property('appid');
    expect(res).to.have.own.property('date');
    expect(res).to.have.own.property('id');
    expect(res).to.have.deep.property('extras', {
      'client::display': {
        contentType: 'text/plain',
      },
      'home::lighting': {
        onLighting: {
          brightness: 15,
        },
      },
    });
  });

  it('send a message without token', async function () {
    let res = '';
    try {
      await send({
        apiUrl: apiUrl.slice(0, -5),
        message: 'This is a test message without token.',
        contentType: 'text/plain',
      });
    } catch (err) {
      res = (err as unknown as Error).message;
    }
    expect(res).to.not.be.empty;
  });

  it('send a message with the fake apiUrl', async function () {
    let res = '';
    try {
      await send({
        apiUrl: 'http://127.0.0.1:8080',
        message: 'This is a test message with the fake apiUrl.',
        contentType: 'text/plain',
      });
    } catch (err) {
      res = (err as unknown as Error).message;
    }
    expect(res).to.not.be.empty;
  });
});
