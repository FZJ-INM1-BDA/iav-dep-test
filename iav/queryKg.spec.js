const request = require('request')
const { expect, assert } = require('chai')
require('mocha')

const apiEndpoints = [
  `https://interactive-viewer.apps.hbp.eu`,
  `https://atlases.ebrains.eu/viewer`
]

const kgInfoPath = `/datasets/kgInfo?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=5c669b77-c981-424a-858d-fe9f527dbc07`
const expectedName = `Probabilistic cytoarchitectonic map of Area hOc1 (V1, 17, CalcS) (v2.4)`
const dataFeaturePath = `/datasets/byRegion/minds%2Fcore%2Fparcellationregion%2Fv1.0.0%2F5151ab8f-d8cb-4e67-a449-afe2a41fb007?hemisphere=right%20hemisphere&referenceSpaceId=minds/core/referencespace/v1.0.0/dafcffc5-4826-4bf1-8ff6-46b8a31ff8e2`

for (const url of apiEndpoints) {
  describe(`testing ${url}`, () => {
    it('> queries kg metadata and returns fine', done => {
      request(`${url}${kgInfoPath}`, (err, resp, body) => {
        if (err) throw err
        try {
          const json = JSON.parse(body)
          expect(json.name).to.equal(
            expectedName
          )
          done()
        } catch (e) {
          console.error(e)
          done(`error`)
        }
      })
    })

    it('> queries data and returns fine', done => {
      request(`${url}${dataFeaturePath}`, (err, resp, body) => {
        if (err) throw err
        try {
          const json = JSON.parse(body)
          
          assert(
            Array.isArray(json),
            'return is an array'
          )
          expect(json.length).to.be.greaterThan(0)

          done()
        } catch (e) {
          console.error(e)
          done(`error`)
        }
      })
    })
  })
}
