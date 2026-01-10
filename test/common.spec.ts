import 'mocha';
import { expect } from 'chai';
import { getApiUrl, parsePriority, parseContentType, isDisplayContentType, parseExtras } from '../src/common.js';

describe('common', function () {
  it('getApiUrl', function () {
    expect(getApiUrl('https://example.com', 'abcdef123')).to.eq('https://example.com/message?token=abcdef123');
    expect(getApiUrl('https://example.com/', 'abcdef123')).to.eq('https://example.com/message?token=abcdef123');
  });

  it('parsePriority', function () {
    expect(parsePriority('0')).to.eq(0);
    expect(parsePriority('1')).to.eq(1);
    expect(parsePriority('-1')).to.eq(-1);
    expect(parsePriority('0.1')).to.eq(0);
    expect(parsePriority('1.1')).to.eq(1);
    expect(parsePriority('-1.1')).to.eq(-1);
    expect(parsePriority('')).to.be.undefined;
    expect(parsePriority('a')).to.be.undefined;
  });

  it('parseContentType', function () {
    expect(parseContentType('')).to.eq('text/plain');
    expect(parseContentType(' ')).to.eq('text/plain');
    expect(parseContentType('text/plain')).to.eq('text/plain');
    expect(parseContentType('text/markdown')).to.eq('text/markdown');
    expect(parseContentType('application/json')).to.eq('application/json');
  });

  it('isDisplayContentType', function () {
    expect(isDisplayContentType('')).to.be.false;
    expect(isDisplayContentType('text/plain')).to.be.true;
    expect(isDisplayContentType('text/markdown')).to.be.true;
    expect(isDisplayContentType('application/json')).to.be.false;
  });

  it('parseExtras', function () {
    expect(parseExtras('')).to.be.undefined;
    expect(parseExtras(' ')).to.be.undefined;
    expect(parseExtras('undefined')).to.be.null;
    expect(parseExtras('null')).to.be.null;
    expect(parseExtras('0')).to.be.null;
    expect(parseExtras('[]')).to.be.null;
    expect(parseExtras('{}')).to.be.an('object');
  });
});
