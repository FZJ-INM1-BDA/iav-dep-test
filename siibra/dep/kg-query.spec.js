const request = require('request')
const { expect } = require('chai')
require('mocha')

const apiEndPoint = `https://kg.humanbrainproject.eu/query/`
const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN

const {
  OAUTH_V2_SA_CLIENT_ID,
  OAUTH_V2_SA_CLIENT_SECRET,
  OAUTH_V2_SA_ENDPOINT='https://iam.ebrains.eu/auth/realms/hbp/protocol/openid-connect',
  OAUTH_V2_SA_SCOPES='',
  KG_INSTANCE_ID,
  KG_DS_QUERY_ID="interactiveViewerKgQuery-v1_0",
} = process.env

function getAccessToken(){
  console.log(`getting access token from ${OAUTH_V2_SA_ENDPOINT}`)
  return new Promise((rs, rj) => {
    request({
      uri: `${OAUTH_V2_SA_ENDPOINT}/token`,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        grant_type: 'client_credentials',
        client_id: OAUTH_V2_SA_CLIENT_ID,
        client_secret: OAUTH_V2_SA_CLIENT_SECRET,
        scope: OAUTH_V2_SA_SCOPES
      }
    }, (error, resp, body) => {
      if (error) return rj(error)
      if (resp.statusCode >= 400) {
        const {
          statusCode,
          statusMessage,
          body
        } = resp
        return rj({ statusCode, statusMessage, body })
      }
      const json = JSON.parse(body)
      rs(json['access_token'])
    })
  })
}

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
    getAccessToken()
      .then(token => {
        fetchedAccessToken = token
        done()
      })
      .catch(done)
  })

  describe('> minds/core/dataset/v1.0.0', () => {
    it('> fetches results', done => {
      request(`${apiEndPoint}/minds/core/dataset/v1.0.0/instances?size=32&databaseScope=RELEASED`, {
        method: 'POST',
        auth: {
          bearer: JWT_ACCESS_TOKEN || fetchedAccessToken
        },
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/ld+json'
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

    // Even though the query is stored, possibly due to the many links it queries, takes ~ 10 seconds to complete
    // it('> fetched stored query', done => {
    //   request(`${apiEndPoint}/minds/core/dataset/v1.0.0/${KG_DS_QUERY_ID}/instances?size=32&databaseScope=RELEASED`, {
    //     method: 'GET',
    //     auth: {
    //       bearer: JWT_ACCESS_TOKEN || fetchedAccessToken
    //     },
    //     headers: {
    //       accept: 'application/json',
    //     },
    //   }, (err, resp, body) => {
    //     if (err) throw err
    //     if (resp.statusCode >= 400) throw resp.statusCode
    //     const jsonResponse = JSON.parse(body)
    //     const { total, results } = jsonResponse
    //     expect(total).to.be.greaterThan(500)
    //     done()
    //   })
    // })

    if (KG_INSTANCE_ID) {
      it(`> can fetch kg instance id at ${KG_INSTANCE_ID}`, done => {
        request(`${apiEndPoint}/minds/core/dataset/v1.0.0/${KG_DS_QUERY_ID}/instances/${KG_INSTANCE_ID}?databaseScope=RELEASED`, {
          method: 'GET',
          auth: {
            bearer: JWT_ACCESS_TOKEN || fetchedAccessToken
          },
          headers: {
            accept: 'application/json',
          },
        }, (err, resp, body) => {
          if (err) throw err
          if (resp.statusCode >= 400) throw resp.statusCode
          const parsedBody = JSON.parse(body)
          done()
        })
      })
    }
  })
})
