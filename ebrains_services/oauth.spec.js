const request = require('request')
const crypto = require('crypto')
const { URL } = require('url')
const {
  OAUTH_V2_CLIENT_ID,
  OAUTH_V2_REDIRECT_URL,
  OAUTH_V2_SCOPES,
  OAUTH_V2_ENDPOINT,
} = process.env


describe('> v2', () => {
  it('> should not result in error', done => {
    request({
      url: OAUTH_V2_ENDPOINT,
      followRedirect: false,
      followAllRedirects: false,
      qs: {
        client_id: OAUTH_V2_CLIENT_ID,
        scope: OAUTH_V2_SCOPES,
        response_type: 'code',
        redirect_uri: OAUTH_V2_REDIRECT_URL,
        state: crypto.randomBytes(16).toString('hex')
      }
    }, (err, resp, body) => {
      if (err) throw err
      if (!resp.headers['location']) {
        return done(new Error(`response header location is expected, was not found: ${JSON.stringify(resp.headers)}`))
      }
      const redirectUrl = new URL(resp.headers['location'])
      const errorParam = redirectUrl.searchParams.get('error')
      const errorDesc = redirectUrl.searchParams.get('error_description')
      if (errorParam || errorDesc) {
        return done(new Error(`expected no error, but got error: | ${errorParam} | ${errorDesc}`))
      }
      done()
    })
  })
})