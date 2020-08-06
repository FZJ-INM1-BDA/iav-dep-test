const request = require('request')
const { expect } = require('chai')
require('mocha')

const apiEndPoint = `https://kg.humanbrainproject.eu/query/`
const OIDC_TOKEN_URL = process.env.OIDC_TOKEN_URL
const OIDC_CLIENT_ID = process.env.OIDC_CLIENT_ID
const OIDC_CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN
const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN
let fetchedAccessToken

const queryBody = {
  "@context": {
    "@vocab": "https://schema.hbp.eu/graphQuery/",
    "query": "https://schema.hbp.eu/myQuery/",
    "fieldname": {
      "@id": "fieldname",
      "@type": "@id"
    },
    "merge": {
      "@type": "@id",
      "@id": "merge"
    },
    "relative_path": {
      "@id": "relative_path",
      "@type": "@id"
    }
  },
  "fields": [
    {
      "fieldname": "query:@id",
      "relative_path": "@id"
    },
    {
      "fieldname": "query:name",
      "relative_path": "http://schema.org/name"
    }
  ]
}

describe(`> REST end for kg @ ${apiEndPoint}`, () => {

  before(done => {
    if (
      !OIDC_TOKEN_URL ||
      !OIDC_CLIENT_ID ||
      !OIDC_CLIENT_SECRET ||
      !JWT_REFRESH_TOKEN
    ) {
      return done()
    }
    request(`${OIDC_TOKEN_URL}`, {
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        grant_type: 'refresh_token',
        client_id: OIDC_CLIENT_ID,
        client_secret: OIDC_CLIENT_SECRET,
        refresh_token: JWT_REFRESH_TOKEN
      }
    }, (err, resp, body) => {
      if (err) throw err
      if (resp.statusCode >= 500) {
        console.warn(`cannot get jwt access token`, resp.statusCode, resp.statusMessage)
        done()
      }
      try {
        const { access_token, error } = JSON.parse(body)
        if (error) console.warn(`refreshing token error`, error)
        fetchedAccessToken = access_token
      } catch (e) {
        console.warn(`parsing body error`, e)
      }
      done()
    })
  })

  describe('> minds/core/dataset/v1.0.0', () => {
    it('> fetches results', done => {

      request(`${apiEndPoint}/minds/core/dataset/v1.0.0/instances?size=32`, {
        method: 'POST',
        auth: {
          bearer: JWT_ACCESS_TOKEN || fetchedAccessToken
        },
        headers: {
          accept: 'application/json',
          ['Content-Type']: 'application/ld+json'
        },
        body: JSON.stringify(queryBody)
      }, (err, resp, body) => {
        if (err) throw err
        if (resp.statusCode >= 400) throw resp.statusCode
        const { total } = JSON.parse(body)
        expect(total).to.be.greaterThan(500)
        done()
      })
    })
  })
})
