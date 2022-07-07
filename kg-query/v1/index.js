const {
  KG_INSTANCE_ID,
  JWT_ACCESS_TOKEN,
  KG_DS_QUERY_ID = "interactiveViewerKgQuery-v1_0",
} = process.env
const apiEndPoint = `https://kg.humanbrainproject.eu/query/`


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

const { getAccessToken } = require("../token")
require("mocha")
const request = require('request')
const { expect } = require('chai')

describe(`> REST end for kg @ ${apiEndPoint}`, () => {

  let fetchedAccessToken
  before(done => {
    if (!!JWT_ACCESS_TOKEN) {
      console.warn(`JWT_ACCESS_TOKEN set, using it rather than fetching client access token`)
      return done()
    }
    getAccessToken()
      .then(token => {
        fetchedAccessToken = token
        console.log(token)
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
