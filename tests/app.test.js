const frisby = require('frisby');

it('Should return pong', async () => {
  return frisby
    .get('http://localhost:3000/ping')
    .expect('status', 200)
    .expect('json', 'res', 'pong!');
});

describe('Authors tests', () => {
  it('Can log in with success', () => {});
  it('Cannot log in without email', () => {});
  it('Cannot log in without password', () => {});
  it('Cannot log in with wrong password', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
});
