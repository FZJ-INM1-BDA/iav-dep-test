const request = require('request')
const { assert } = require('chai')
const url = `https://hbp-kg-dataset-previewer.apps.hbp.eu/datasetPreview/e715e1f7-2079-45c4-a67f-f76b102acfce`
const arr = [
  {
    "name": "Receptor density fingerprint of Area hOc1",
    "filename": "fingerprint",
    "mimetype": "application/json"
  },
  {
    "name": "Sample autoradiograph of GABAᴀ(BZ) in Area hOc1",
    "filename": "GABAᴀ(BZ)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of α₁(NA) in Area hOc1",
    "filename": "α₁(NA)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of NMDA (Glu) in Area hOc1",
    "filename": "NMDA (Glu)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of GABAᴀ(GABA) in Area hOc1",
    "filename": "GABAᴀ(GABA)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of α₂(NA) in Area hOc1",
    "filename": "α₂(NA)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of α₄β₂(ACh) in Area hOc1",
    "filename": "α₄β₂(ACh)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of M₁(ACh) in Area hOc1",
    "filename": "M₁(ACh)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of 5-HT₁ᴀ(5-HT) in Area hOc1",
    "filename": "5-HT₁ᴀ(5-HT)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of kainate (Glu) in Area hOc1",
    "filename": "kainate (Glu)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of M₂(ACh) in Area hOc1",
    "filename": "M₂(ACh)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of AMPA (Glu) in Area hOc1",
    "filename": "AMPA (Glu)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of D₁(DA) in Area hOc1",
    "filename": "D₁(DA)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of M₃(ACh) in Area hOc1",
    "filename": "M₃(ACh)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of mGluR2/3 (Glu) in Area hOc1",
    "filename": "mGluR2\\/3 (Glu)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of 5-HT₂(5-HT) in Area hOc1",
    "filename": "5-HT₂(5-HT)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample autoradiograph of GABAᴃ(GABA) in Area hOc1",
    "filename": "GABAᴃ(GABA)/autoradiography",
    "mimetype": "image/jpeg"
  },
  {
    "name": "Sample profile of GABAᴀ(BZ) in Area hOc1",
    "filename": "GABAᴀ(BZ)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of α₁(NA) in Area hOc1",
    "filename": "α₁(NA)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of NMDA (Glu) in Area hOc1",
    "filename": "NMDA (Glu)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of GABAᴀ(GABA) in Area hOc1",
    "filename": "GABAᴀ(GABA)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of α₂(NA) in Area hOc1",
    "filename": "α₂(NA)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of α₄β₂(ACh) in Area hOc1",
    "filename": "α₄β₂(ACh)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of M₁(ACh) in Area hOc1",
    "filename": "M₁(ACh)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of 5-HT₁ᴀ(5-HT) in Area hOc1",
    "filename": "5-HT₁ᴀ(5-HT)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of M₂(ACh) in Area hOc1",
    "filename": "M₂(ACh)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of AMPA (Glu) in Area hOc1",
    "filename": "AMPA (Glu)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of D₁(DA) in Area hOc1",
    "filename": "D₁(DA)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of M₃(ACh) in Area hOc1",
    "filename": "M₃(ACh)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of mGluR2/3 (Glu) in Area hOc1",
    "filename": "mGluR2\\/3 (Glu)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of 5-HT₂(5-HT) in Area hOc1",
    "filename": "5-HT₂(5-HT)/profile",
    "mimetype": "application/json"
  },
  {
    "name": "Sample profile of GABAᴃ(GABA) in Area hOc1",
    "filename": "GABAᴃ(GABA)/profile",
    "mimetype": "application/json"
  }
]

describe(`> dataset-preview @ https://hbp-kg-dataset-previewer.apps.hbp.eu`, () => {
  it('> querying hoc1 works', done => {
    request(url, (err, resp, body) => {
      if (err) return done(err)
      assert(
        resp.statusCode === 200,
        'response code === 200'
      )
      const respBodyJson = JSON.parse(body)
      assert(
        respBodyJson.length === arr.length,
        'fetched resp length === expected resp length'
      )

      for (const { name: eName, filename: eFilename, mimetype: eMimetype } of arr) {
        const idx = respBodyJson.findIndex(({ name, filename, mimetype }) => {
          return name === eName && filename === eFilename && mimetype === eMimetype
        })

        assert(
          idx >= 0,
          `expected ${eName} can be found in response`
        )
      }

      done()
    })
  })
})