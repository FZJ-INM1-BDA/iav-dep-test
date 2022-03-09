const { expect, assert } = require('chai')
const got = require('got')

const { SIIBRA_EXPLORER_ENDPOINT } = process.env

if (!SIIBRA_EXPLORER_ENDPOINT) throw new Error(`SIIBRA_EXPLORER_ENDPOINT env var needs to be populated`)

const trimmedEndpoint = SIIBRA_EXPLORER_ENDPOINT.replace(/\/$/, '')

function getSaneUrl(name, json){
  return got(`${trimmedEndpoint}/saneUrl/${name}`, {
    headers: {
      'x-noop': '1'
    },
    method: json ? 'POST': 'GET',
    json
  })
}

const saneUrls = [
  'mebrains',
  'allen2017',
  'whs4',
  'bigbrainGreyWhite',
  'icbm_fg1',
]

describe(`> siibra-explorer @ ${SIIBRA_EXPLORER_ENDPOINT}`, () => {
  
  describe('> saneurl', () => {
    for (const saneUrl of saneUrls) {
      it(`> works for ${saneUrl}`, async () => {
        const response = await getSaneUrl(saneUrl)
        assert(response, 'response is truthy')
      })
    }
//     it('> ratelimiting works', done => {
//       Promise.all(
//         Array(10).fill(null).map(
//           () => getSaneUrl('test', { hello: 'world' })
//         )
//       )
//         .then(() => {
//           done(new Error(`expected some to fail, but all returned`))
//         })
//         .catch(() => {
//           done()
//         })
//     })
  })
})
