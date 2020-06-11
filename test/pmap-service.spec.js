require('mocha')
const request = require('request')
const { assert } = require('chai')

const pmapUrl = `https://pmap-pmap-service-new.apps.hbp.eu`

describe(`> pmap-service @ ${pmapUrl}`, () => {
  describe('> list images', () => {
    it('> works', done => {
      request(`${pmapUrl}/images`, (err, resp, body) => {
        if (err) throw err
        assert(
          resp.statusCode < 400,
          'assert response is < 400'
        )
        assert(
          /application\/json/.test(resp.headers["content-type"]),
          'assert response header has correct header'
        )
        const jsonBody = JSON.parse(body)
        assert(
          jsonBody.length > 0,
          'assert pmap images has at least 1 image'
        )
        done()
      })
    })
  })
  describe('> merge images', () => {
    const payload = {
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

    const body = JSON.stringify(payload)
    it('> works', done => {
      request(`${pmapUrl}/multimerge`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body
      }, (err, resp, body) => {
        if (err) throw err
        assert(
          resp.statusCode < 400,
          'assert resp.code < 400'
        )
        assert(
          /filename=.*?\.nii\.gz$/.test(resp.headers["content-disposition"]),
          'assert content disposition has correct extension'
        )
        done()
      })
    })
  })
})