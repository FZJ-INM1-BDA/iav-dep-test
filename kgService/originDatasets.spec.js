const { expect, assert } = require("chai")
const got = require('got')
const {
  DS_PREVIEW_URL,
  DS_PREVIEW_URL_VERSION,
  NEHUBA_UI_BRANCH,
} = process.env

const getJsonUrl = ({ ref, filename }) => `https://raw.githubusercontent.com/HumanBrainProject/interactive-viewer/${ref}/src/res/ext/${filename}`

const jsonFiles = [
  'bigbrain.json',
  'colin.json',
  'MNI152.json',
  'waxholmRatV2_0.json',
  'allenMouse.json'
]

const getGetKgPrvUrl = ({ version, baseUrl }) => ({ kgSchema, kgId, filename }) =>  `${baseUrl}/${ version === 'v0' ? '' : (encodeURIComponent(kgSchema) + '/') }${encodeURIComponent(kgId)}/${encodeURIComponent(filename)}`

const getKgPrvUrl = getGetKgPrvUrl({ version: DS_PREVIEW_URL_VERSION, baseUrl: DS_PREVIEW_URL })

describe(`kgPrvService @ ${DS_PREVIEW_URL} version@${DS_PREVIEW_URL_VERSION}`, () => {
  before(async () => {
    const urls = jsonFiles.map(filename => getJsonUrl({ ref: NEHUBA_UI_BRANCH, filename }))
    const respArr = await Promise.all(
      urls.map(url => got(url))
    )

    for (const resp of respArr) {
      const template = JSON.parse(resp.body)

      describe(`checking template space ${template.name}`, () => {
        for (const parc of template.parcellations) {

          const flattenedRegions = []
          const flattenRegion = region => {
            flattenedRegions.push(region)
            if (region.children && Array.isArray(region.children)) {
              region.children.forEach(flattenRegion)
            }
          }
          parc.regions.forEach(flattenRegion)

          describe(`checking parcellation ${parc.name}`, () => {
            for (const region of flattenedRegions.filter(r => r.originDatasets && r.originDatasets.length)){
              describe(`checking ${region.name}`, () => {

                for (const { kgId, kgSchema, filename } of region.originDatasets) {

                  const url = getKgPrvUrl({ kgId, kgSchema, filename })
                  let prvUrl
                  it(`[dsPrvService] check dsPrv service for ${url}`, async () => {
                    
                    const { body } = await got(url)
                    const { url: _prvUrl } = JSON.parse(body)
                    prvUrl = _prvUrl
                    assert(
                      !!prvUrl
                      `prvUrl is populated`
                    )
                  })

                  it(`[cscs][switchObjStore] checking prvUrl: ${prvUrl} using HEAD method`, async () => {
                    assert(
                      !!prvUrl,
                      `prvUrl is populated`
                    )
                    // using HEAD method ot test if end point exists
                    // rather than GET request, which takes longer 
                    await got(prvUrl, {
                      method: 'HEAD'
                    })
                  })
                }
              })
            }
          })
        }
      })
    }
  })

  it('dummy test', () => {
    expect(true).to.equal(true)
  })
})