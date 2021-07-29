const { expect, assert } = require('chai')
const got = require('got')

const { SIIBRA_API_ENDPOINT, SIIBRA_ATLAS_ID, SIIBRA_PARC_ID, SIIBRA_REGION_ID } = process.env

const VERSION = 'v1_0'

if (!SIIBRA_API_ENDPOINT) throw new Error(`SIIBRA_API_ENDPOINT env var needs to be populated`)

const atlasId = SIIBRA_ATLAS_ID || 'juelich/iav/atlas/v1.0.0/1'
const parcId = SIIBRA_PARC_ID || 'minds/core/parcellationatlas/v1.0.0/94c1125b-b87e-45e4-901c-00daee7f2579'
const regionId = SIIBRA_REGION_ID || 'Area hOc1 (V1, 17, CalcS) right '
describe(`> siibra-api @ ${SIIBRA_API_ENDPOINT}`, () => {
  const trimmedEndpoint = SIIBRA_API_ENDPOINT.replace(/\/$/, '')
  it('> query atlas', async () => {
    const { body } = await got(`${trimmedEndpoint}/${VERSION}/atlases`)
    const arr = JSON.parse(body)
    /**
     * expecting 3 atlases
     */
    expect(arr.length).to.equal(3)
  })

  describe('> regions', () => {

    it('> query regions', async () => {

      const { body } = await got(`${trimmedEndpoint}/${VERSION}/atlases/${encodeURIComponent(atlasId)}/parcellations/${encodeURIComponent(parcId)}/regions`)
      const arr = JSON.parse(body)
      /**
       * expecting nested regions
       */
      expect(arr.length).to.be.greaterThan(0)
    })

    describe('> regional features', () => {

      it('> query features directory', async () => {

        const { body } = await got(`${trimmedEndpoint}/${VERSION}/atlases/${encodeURIComponent(atlasId)}/parcellations/${encodeURIComponent(parcId)}/regions/${encodeURIComponent(regionId)}/features`)
        const feat = JSON.parse(body)
        
        expect(!!feat.features).to.be.true
        expect(feat.features instanceof Array).to.equal(true)
        expect(feat.features.length).to.be.greaterThan(0)
      })

      it('> query receptor', async () => {

        const { body } = await got(`${trimmedEndpoint}/${VERSION}/atlases/${encodeURIComponent(atlasId)}/parcellations/${encodeURIComponent(parcId)}/regions/${encodeURIComponent(regionId)}/features/ReceptorDistribution`)
        const receptor = JSON.parse(body)
        expect(receptor.length).to.be.greaterThan(0)
      })

      it('> query ebrains regional dataset', async () => {

        const { body } = await got(`${trimmedEndpoint}/${VERSION}/atlases/${encodeURIComponent(atlasId)}/parcellations/${encodeURIComponent(parcId)}/regions/${encodeURIComponent(regionId)}/features/EbrainsRegionalDataset`)
        const ebrainsRegional = JSON.parse(body)
        
        expect(ebrainsRegional.length).to.be.greaterThan(0)
        /**
         * we shouldn't expect regional dataset to have more than 100 dataset
         */
        expect(ebrainsRegional.length).to.be.lessThan(100)
      })

      it('> query connectivity data', async () => {
        
        const { body } = await got(`${trimmedEndpoint}/${VERSION}/atlases/${encodeURIComponent(atlasId)}/parcellations/${encodeURIComponent(parcId)}/regions/${encodeURIComponent(regionId)}/features/ConnectivityProfile`)
        const conn = JSON.parse(body)
        expect(conn.length).to.be.greaterThan(0)
      })
    })

  })
})
