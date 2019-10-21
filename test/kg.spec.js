require('mocha')
const puppeteer = require('puppeteer')
const { assert } = require('chai')

describe('dependant service: kg', () => {

  let browser

  before(async () => {
    browser = await puppeteer.launch({
      headless: true,
      // TODO fix: in future, use sandbox
      args: ['--no-sandbox']
    })
  })

  after(() => {
    browser.close()
  })

  describe('kgReference', () => {
    it('doi: https://doi.org/10.25493/WRCY-8Z1 redirect should redirect to kg page: Probabilistic cytoarchitectonic map of Area hIP7 (IPS) (v7.1)', (done) => {
      (async () => {
        const page = await browser.newPage()
        await page.goto(`https://doi.org/10.25493/WRCY-8Z1`, { waitUntil: 'networkidle2' })
        await page.waitFor(10000)
        const content = await page.content()
        const regex = /Probabilistic\ cytoarchitectonic\ map\ of\ Area\ hIP7\ \(IPS\)\ \(v7\.1\)/
        assert(regex.test(content))
        done()
      })()
    })
  })
})