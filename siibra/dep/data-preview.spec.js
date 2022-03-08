const request = require('request')
const { assert } = require('chai')

const urls = [{
   url: `https://hbp-kg-dataset-previewer.apps.hbp.eu/v2/minds%2Fcore%2Fdataset%2Fv1.0.0/b08a7dbc-7c75-4ce7-905b-690b2b1e8957/Overlay%20of%20data%20modalities`,
   expected: {
      "name": "Overlay of data modalities",
      "filename": "Overlay of data modalities",
      "data": {
          "iav-registered-volumes": {
              "volumes": [
                  {
                      "name": "PLI Fiber Orientation Red Channel",
                      "source": "precomputed://https://neuroglancer.humanbrainproject.eu/precomputed/PLI_FOM/BI-FOM-HSV_R",
                      "shader": "void main(){ float x = toNormalized(getDataValue()); if (x < 0.1) { emitTransparent(); } else { emitRGB(vec3(1.0 * x, x * 0., 0. * x )); } }",
                      "transform": [
                          [
                              0.7400000095367432,
                              0,
                              0,
                              11020745
                          ],
                          [
                              0,
                              0.2653011679649353,
                              -0.6908077001571655,
                              2533286.5
                          ],
                          [
                              0,
                              0.6908077001571655,
                              0.2653011679649353,
                              -32682974
                          ],
                          [
                              0,
                              0,
                              0,
                              1
                          ]
                      ],
                      "opacity": 1
                  },
                  {
                      "name": "PLI Fiber Orientation Green Channel",
                      "source": "precomputed://https://neuroglancer.humanbrainproject.eu/precomputed/PLI_FOM/BI-FOM-HSV_G",
                      "shader": "void main(){ float x = toNormalized(getDataValue()); if (x < 0.1) { emitTransparent(); } else { emitRGB(vec3(0. * x, x * 1., 0. * x )); } }",
                      "transform": [
                          [
                              0.7400000095367432,
                              0,
                              0,
                              11020745
                          ],
                          [
                              0,
                              0.2653011679649353,
                              -0.6908077001571655,
                              2533286.5
                          ],
                          [
                              0,
                              0.6908077001571655,
                              0.2653011679649353,
                              -32682974
                          ],
                          [
                              0,
                              0,
                              0,
                              1
                          ]
                      ],
                      "opacity": 0.5
                  },
                  {
                      "name": "PLI Fiber Orientation Blue Channel",
                      "source": "precomputed://https://neuroglancer.humanbrainproject.eu/precomputed/PLI_FOM/BI-FOM-HSV_B",
                      "shader": "void main(){ float x = toNormalized(getDataValue()); if (x < 0.1) { emitTransparent(); } else { emitRGB(vec3(0. * x, x * 0., 1.0 * x )); } }",
                      "transform": [
                          [
                              0.7400000095367432,
                              0,
                              0,
                              11020745
                          ],
                          [
                              0,
                              0.2653011679649353,
                              -0.6908077001571655,
                              2533286.5
                          ],
                          [
                              0,
                              0.6908077001571655,
                              0.2653011679649353,
                              -32682974
                          ],
                          [
                              0,
                              0,
                              0,
                              1
                          ]
                      ],
                      "opacity": 0.25
                  },
                  {
                      "name": "Blockface Image",
                      "source": "precomputed://https://neuroglancer.humanbrainproject.eu/precomputed/PLI_FOM/BI",
                      "shader": "void main(){ float x = toNormalized(getDataValue()); if (x < 0.1) { emitTransparent(); } else { emitRGB(vec3(0.8 * x, x * 1., 0.8 * x )); } }",
                      "transform": [
                          [
                              0.7400000095367432,
                              0,
                              0,
                              11020745
                          ],
                          [
                              0,
                              0.2653011679649353,
                              -0.6908077001571655,
                              2533286.5
                          ],
                          [
                              0,
                              0.6908077001571655,
                              0.2653011679649353,
                              -32682974
                          ],
                          [
                              0,
                              0,
                              0,
                              1
                          ]
                      ],
                      "opacity": 1
                  },
                  {
                      "name": "PLI Transmittance",
                      "source": "precomputed://https://neuroglancer.humanbrainproject.eu/precomputed/PLI_FOM/BI-TIM",
                      "shader": "void main(){ float x = toNormalized(getDataValue()); if (x > 0.9) { emitTransparent(); } else { emitRGB(vec3(x * 1., x * 0.8, x * 0.8 )); } }",
                      "transform": [
                          [
                              0.7400000095367432,
                              0,
                              0,
                              11020745
                          ],
                          [
                              0,
                              0.2653011679649353,
                              -0.6908077001571655,
                              2533286.5
                          ],
                          [
                              0,
                              0.6908077001571655,
                              0.2653011679649353,
                              -32682974
                          ],
                          [
                              0,
                              0,
                              0,
                              1
                          ]
                      ],
                      "opacity": 1
                  },
                  {
                      "name": "T2w MRI",
                      "source": "precomputed://https://neuroglancer.humanbrainproject.eu/precomputed/PLI_FOM/BI-MRI",
                      "shader": "void main(){ float x = toNormalized(getDataValue()); if (x < 0.1) { emitTransparent(); } else { emitRGB(vec3(0.8 * x, 0.8 * x, x * 1. )); } }",
                      "transform": [
                          [
                              0.7400000095367432,
                              0,
                              0,
                              11020745
                          ],
                          [
                              0,
                              0.2653011679649353,
                              -0.6908077001571655,
                              2533286.5
                          ],
                          [
                              0,
                              0.6908077001571655,
                              0.2653011679649353,
                              -32682974
                          ],
                          [
                              0,
                              0,
                              0,
                              1
                          ]
                      ],
                      "opacity": 1
                  },
                  {
                      "name": "MRI Labels",
                      "source": "precomputed://https://neuroglancer.humanbrainproject.eu/precomputed/PLI_FOM/BI-MRS",
                      "transform": [
                          [
                              0.7400000095367432,
                              0,
                              0,
                              11020745
                          ],
                          [
                              0,
                              0.2653011679649353,
                              -0.6908077001571655,
                              2533286.5
                          ],
                          [
                              0,
                              0.6908077001571655,
                              0.2653011679649353,
                              -32682974
                          ],
                          [
                              0,
                              0,
                              0,
                              1
                          ]
                      ],
                      "opacity": 1
                  }
              ]
          }
      },
      "referenceSpaces": [
          {
              "name": "Big Brain (Histology)",
              "fullId": "minds/core/referencespace/v1.0.0/a1655b99-82f1-420f-a3c2-fe80fd4c8588"
          }
      ],
      "mimetype": "application/json"
   }
}]

for (const {url, expected } of urls) {

   describe(`> dataset-preview @ ${url}`, () => {
      it('> querying works', done => {
         request(url, (err, resp, body) => {
            if (err) return done(err)
            assert(
               resp.statusCode === 200,
               'response code === 200'
            )
            const respBodyJson = JSON.parse(body)
            assert(
               JSON.stringify(respBodyJson) === JSON.stringify(expected),
               'fetched resp === expected resp'
            )
         })
      })
   })
}
