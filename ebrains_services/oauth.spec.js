const request = require('request')
const crypto = require('crypto')
const { URL } = require('url')
const {
  OAUTH_V2_CLIENT_ID,
  OAUTH_V2_REDIRECT_URL,
  OAUTH_V2_SCOPES,
  OAUTH_V2_ENDPOINT,

  VOLUBA_OAUTH_V2_CLIENT_ID,
  VOLUBA_OAUTH_V2_REDIRECT_URL,
  VOLUBA_OAUTH_V2_SCOPES,
  VOLUBA_OAUTH_V2_ENDPOINT,
} = process.env


const applications = [
  ['iav', {
    client_id: OAUTH_V2_CLIENT_ID,
    redirect_uri: OAUTH_V2_REDIRECT_URL,
    scope: OAUTH_V2_SCOPES,
    url: OAUTH_V2_ENDPOINT,
  } ],
  ['voluba', {
    client_id: VOLUBA_OAUTH_V2_CLIENT_ID,
    redirect_uri: VOLUBA_OAUTH_V2_REDIRECT_URL,
    scope: VOLUBA_OAUTH_V2_SCOPES,
    url: VOLUBA_OAUTH_V2_ENDPOINT,
  }]
]

describe('> v2', () => {
  for (const [ name, { client_id, redirect_uri, scope, url } ] of applications) {
    describe(`> ${name}`, () => {

      it('> should not result in error', done => {
        request({
          url,
          followRedirect: false,
          followAllRedirects: false,
          qs: {
            client_id,
            scope,
            response_type: 'code',
            redirect_uri,
            state: crypto.randomBytes(16).toString('hex')
          }
        }, (err, resp, body) => {
          if (err) throw err
          if (resp.statusCode === 200) return done()
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
  }
})