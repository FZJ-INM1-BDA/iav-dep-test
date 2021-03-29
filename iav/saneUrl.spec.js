const request = require('request')
const { expect, assert } = require('chai')

const repoId = 'git@github.com:FZJ-INM1-BDA/iav-dep-test.git'

const crypto = require('crypto')

const checkExist = id => new Promise((rs, rj) => {
  request.get(`${API_ENDPOINT}/saneUrl/${id}`, (err, resp) => {
    if (err) return rj(err)
    if (resp.statusCode === 200) return rs(true)
    if (resp.statusCode === 404) return rs(false)
    rj(new Error(resp.statusCode))
  })
})

const getRandomUuid = async () => {
  let randomUuid
  do {
    randomUuid = `__${crypto.randomBytes(16).toString('hex')}`
  } while (
    await checkExist(randomUuid)
  )
  return randomUuid
}

const payload = {
  queryString: `?createdBy=${encodeURIComponent(repoId)}`
}

const { API_ENDPOINT } = process.env
const knownId = `icbm_fg1`
describe(`> saneUrl api of ${API_ENDPOINT}`, () => {
  describe('> fetches existing works', () => {
    it('> fetches existing works', done => {
      request.get(
        `${API_ENDPOINT}/saneUrl/${knownId}`,
        (err, resp, body) => {
          expect(!!err).to.be.false
          expect(resp.statusCode).to.equal(200)
          // there is a bug that the content type is text/html, even though it should be application/json
          try {
            const { expiry } = JSON.parse(body)
            expect(!!expiry).to.be.false
            done()
          } catch (e) {
            console.error(e)
            assert(
              false,
              'Does not expect error'
            )
            done()
          }
        }
      )
    })

    it('> fetches existing with accept header returns html', done => {
      request.get(
        `${API_ENDPOINT}/saneUrl/${knownId}`,
        {
          headers: {
            accept: 'text/html'
          }
        },
        (err, resp, body) => {
          expect(!!err).to.be.false
          expect(resp.statusCode).to.equal(200)
          const contentType = resp.headers['content-type']
          expect(contentType.includes('text/html')).to.be.true
          done()
        }
      )
    })
  })

  describe('> create new links works', () => {
    it('> existing link returns 409', done => {

      request.post(
        `${API_ENDPOINT}/saneUrl/${knownId}`,
        {
          headers: {
            ['content-type']: 'application/json'
          },
          body: JSON.stringify(payload)
        },
        (err, resp, _body) => {
          expect(!!err).to.be.false
          expect(resp.statusCode).to.equal(409)
          done()
        }
      )
    })
    it('> new link can be created', done => {
      getRandomUuid()
        .then(async uuid => {
          const existFlagBefore = await checkExist(uuid)
          expect(existFlagBefore).to.equal(false, `Before post, expect exist flag to be false`)
          request.post(
            `${API_ENDPOINT}/saneUrl/${uuid}`,
            {
              headers: {
                ['content-type']: 'application/json'
              },
              body: JSON.stringify(payload)
            },
            async (err, resp, body) => {
              expect(!!err).to.be.false
              expect(resp.statusCode).to.equal(200)
              const existFlag = await checkExist(uuid)
              expect(existFlag).to.equal(true, `Once post completed, the obj should not exist`)
              done()
            }
          )
        })
    })
  })

  describe('> rate limiter works', () => {

    const getPostStatus = uuid => new Promise((rs, rj) => {
      request.post(
        `${API_ENDPOINT}/saneUrl/${uuid}`,
        {
          headers: {
            ['content-type']: 'application/json'
          },
          body: JSON.stringify(payload)
        },
        async (err, resp, body) => {
          if (err) return rj(err)
          rs(resp.statusCode)
        }
      )
    })

    it('> 6 requests within 5 sec will result in at least 1 429', async () => {
      const randomUuids = []
      while (randomUuids.length < 6) {
        const newUuid = await getRandomUuid()
        const existInArray = randomUuids.includes(newUuid)
        if (
          !existInArray
        ) {
          randomUuids.push(newUuid)
        }
      }

      const respStatuses = await Promise.all(
        randomUuids.map(getPostStatus)
      )

      assert(
        respStatuses.some(s => s === 429),
        `expecting rate limiting to hit some responses`
      )
      
    })
  })
})
