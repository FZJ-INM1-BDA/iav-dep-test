
const { JSDOM } = require('jsdom')
const request = require('request')
require('mocha')

const url = `https://doi.org/10.25493/WRCY-8Z1`

const wait = timeout => new Promise(rs => setTimeout(rs, timeout))

const retryUntil = async (fn, { timeout = 5000 } = {}) => {
  let timeCounter = 0
  do {
    if (fn()) {
      break
    }
    timeCounter += 500
    await wait(500)
    if (timeCounter >= timeout) throw new Error(`Exceeded retry timeout ${timeout}`)
  } while (true)
}

describe(`> doi-kg`, () => {
  describe(`> doi redirect to kg dataset page`, () => {
    it('> https://doi.org/10.25493/WRCY-8Z1 redirects works expected', done => {

      request(url, async (err, resp, body) => {
        if (err) throw err
      
        const dom = new JSDOM(body, {
          url: resp.request.uri.href,
          resources: 'usable',
          runScripts: 'dangerously',
          userAgent: 'JSDOM headless - IAV dependency monitor runner - inm1-bda'
        })
        try {
          await retryUntil(() => {
            const regex = /Probabilistic\ cytoarchitectonic\ map\ of\ Area\ hIP7\ \(IPS\)\ \(v7\.1\)/
            return regex.test(dom.window.document.body.textContent)
          }, { timeout: 5000 })
          done()
        } catch (e) {
          done(e)
        }
      })      
    })
  })
})
