const request = require('request')
const { assert, expect } = require('chai')

const connectivityBase = `https://connectivity-query-v1-1-connectivity.apps.hbp.eu`

describe(`> connectivity backend @ ${connectivityBase}`, () => {
  describe(`> metadata`, () => {
    const metadataUrl = `${connectivityBase}/studies`
    it(`> can be fetched properly at ${metadataUrl}`, done => {
      request(metadataUrl, (err, resp, body) => {
        if (err) throw err
        assert(
          /application\/json/i.test(resp.headers["content-type"])
        )
        assert(resp.statusCode < 400)
        const { shortname, title, description } = JSON.parse(body)
        for (const item of [shortname, title, description]) {
          expect(!!item).to.be.true
        }
        done()
      })
    })
  })

  describe(`> fetch data`, () => {
    const fetchdataUrl = `${connectivityBase}/connectivity`
    const payload = {"area":"Area hOc1 (V1, 17, CalcS) - left hemisphere"}
    const body = JSON.stringify(payload)
    it(`> can be fetched properly at ${fetchdataUrl}`, done => {
      request(fetchdataUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body
      }, (err, resp, body) => {
        if (err) throw err
        assert(resp.statusCode < 400, 'http response code < 400')
        assert(
          /application\/json/.test(resp.headers["content-type"]),
          'assert header has correct content type header'
        )
        const jsonBody = JSON.parse(body)
        assert(
          Object.keys(jsonBody).length === 212,
          'assert response has exactly 212 areas'
        )
        done()
      })
    })
  })
})