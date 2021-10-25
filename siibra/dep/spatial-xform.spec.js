const request = require('request')
const url = `https://hbp-spatial-backend.apps.hbp.eu/v1/transform-points`

const getTest = ({ source_space, target_space, cb }) => {
  const json = {
    "source_points": [
      [
        -56.180688,
        -32,
        35.406444
      ]
    ],
    source_space,
    target_space
  }
  request({
    uri: url,
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(json)
  }, cb)
}

describe(`> spatial-transform @ ${url}`, () => {

  const MNI152_COLIN27 = `MNI152 -> colin27`
  const MNI152_BIGBRAIN = `MNI152 -> bigbrain`
  const BIGBRAIN_MNI152 = `BIGBRAIN -> MNI152`

  it(`> ${MNI152_COLIN27}`, done => {
    console.time(MNI152_COLIN27)

    getTest({
      source_space: "MNI 152 ICBM 2009c Nonlinear Asymmetric",
      target_space: "MNI Colin 27",
      cb: (err, resp, body) => {
        if (err) return done(err)
        if (resp.statusCode >= 400) return done({ statusCode: resp.statusCode, body })
        console.timeEnd(MNI152_COLIN27)
        done()
      }
    })
    
  })

  it(`> ${MNI152_BIGBRAIN}`, done => {

    console.time(MNI152_BIGBRAIN)
    getTest({
      source_space: "MNI 152 ICBM 2009c Nonlinear Asymmetric",
      target_space: "Big Brain (Histology)",
      cb: (err, resp, body) => {
        if (err) return done(err)
        if (resp.statusCode >= 400) return done({ statusCode: resp.statusCode, body })
        console.timeEnd(MNI152_BIGBRAIN)
        done()
      }
    })
  })

  it(`> ${BIGBRAIN_MNI152}`, done => {

    console.time(BIGBRAIN_MNI152)
    getTest({
      source_space: "Big Brain (Histology)",
      target_space: "MNI 152 ICBM 2009c Nonlinear Asymmetric",
      cb: (err, resp, body) => {
        if (err) return done(err)
        if (resp.statusCode >= 400) return done({ statusCode: resp.statusCode, body })
        console.timeEnd(BIGBRAIN_MNI152)
        done()
      }
    })
  })
})

