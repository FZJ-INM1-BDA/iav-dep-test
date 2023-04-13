const {
    JWT_ACCESS_TOKEN,
    KG_V3_DS_QUERY_ID = "bebbe365-a0d6-41ea-9ff8-2554c15f70b7",
    KG_V3_STAGE="RELEASED",
  } = process.env
  const apiEndPoint = `https://core.kg.ebrains.eu/v3-beta/queries/`
  
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
          done()
        })
        .catch(done)
    })
    const dataset_id = "0f1ccc4a-9a11-4697-b43f-9c9c8ac543e6"
    describe(`> connectivity query kgid: ${KG_V3_DS_QUERY_ID}, stage: ${KG_V3_STAGE}`, () => {
      it('> fetches results', done => {
        const url = `${apiEndPoint}/${KG_V3_DS_QUERY_ID}/instances?stage=${KG_V3_STAGE}&dataset_id=${dataset_id}`

        request(url, {
          method: 'GET',
          auth: {
            bearer: JWT_ACCESS_TOKEN || fetchedAccessToken
          }
        }, (err, resp, body) => {

          if (err) throw err
          if (resp.statusCode >= 400) throw resp.statusCode
          const result = JSON.parse(body)
          
          expect(
            !!(result && result.data)
          ).to.be.true

          expect(
            (result.data).length
          ).to.equal(1)
          
          expect(
            (result.data[0].versions || []).length
          ).to.be.greaterThan(0)
          
          for (const version of result.data[0].versions) {
            expect(version.files.length).to.be.greaterThan(0)
          }
          
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
    })
  })
  