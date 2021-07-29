const { expect, assert } = require('chai')
const got = require('got')

const { SIIBRA_EXPLORER_ENDPOINT } = process.env

if (!SIIBRA_EXPLORER_ENDPOINT) throw new Error(`SIIBRA_EXPLORER_ENDPOINT env var needs to be populated`)

describe(`> siibra-explorer @ ${SIIBRA_EXPLORER_ENDPOINT}`, () => {
  const trimmedEndpoint = SIIBRA_EXPLORER_ENDPOINT.replace(/\/$/, '')
  it('> can be queried', async () => {
    await got(trimmedEndpoint)
  })
})
