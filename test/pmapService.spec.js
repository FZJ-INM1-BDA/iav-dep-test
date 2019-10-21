const request = require('request')
const { expect } = require('chai')
require('mocha')

const PMAP_SERVICE_URL = process.env.PMAP_SERVICE_URL || 'http://pmap-pmap-service.apps-dev.hbp.eu'

describe(`pmapService @ ${PMAP_SERVICE_URL}`, () => {
  it('GET / - help page is up', done => {
    request({
      url: PMAP_SERVICE_URL
    }, (err, resp, body) => {
      if (err) return done(err)
      expect(resp.statusCode).to.be.lessThan(400)
      done()
    })
  })

  it('GET /images - list image works', done => {
    request({
      url: `${PMAP_SERVICE_URL}/images`
    }, (err, resp, body) => {
      if (err) return done(err)
      done()
    })
  })

  const body = {
    "areas": [
      {
        "name": "Area-Fp1",
        "hemisphere": "left"
      },
      {
        "name": "Area-Fp1",
        "hemisphere": "right"
      }
    ],
    "threshold": 0.2
  }
  it('POST /multimerge - merge images work', done => {
    request({
      url: `${PMAP_SERVICE_URL}/multimerge`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }, (err, resp, body) => {
      if (err) return done(err)
      expect(resp.statusCode).to.be.lessThan(400)
      done()
    })
  })
})