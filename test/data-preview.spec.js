const request = require('request')
const { assert } = require('chai')
const url = `https://hbp-kg-dataset-previewer.apps.hbp.eu/datasetPreview/${encodeURIComponent('minds/core/dataset/v1.0.0')}/e715e1f7-2079-45c4-a67f-f76b102acfce`
const arr = [
  {
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "filename" : "hOc1_ar_examples/BZ/hOc1_ar_BZ.tif",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "name" : "hOc1_ar_BZ.tif",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ]
  },
  {
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "filename" : "hOc1_ar_examples/AMPA/hOc1_ar_AMPA.tif",
     "referenceSpaces" : [
        {
           "name" : "*",
           "fullId" : "*"
        }
     ],
     "name" : "hOc1_ar_AMPA.tif",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined"
  },
  {
     "referenceSpaces" : [
        {
           "name" : "*",
           "fullId" : "*"
        }
     ],
     "name" : "hOc1_ar_mGluR2_3.tif",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "filename" : "hOc1_ar_examples/mGluR2_3/hOc1_ar_mGluR2_3.tif",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png"
  },
  {
     "filename" : "hOc1_pr_examples/5-HT1A/hOc1_pr_5-HT1A.tsv",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "name" : "hOc1_pr_5-HT1A.tsv",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     }
  },
  {
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png",
     "name" : "hOc1_pr_alpha2.tsv",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "filename" : "hOc1_pr_examples/alpha2/hOc1_pr_alpha2.tsv"
  },
  {
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_ar_GABAB.tif",
     "filename" : "hOc1_ar_examples/GABAB/hOc1_ar_GABAB.tif",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png"
  },
  {
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "filename" : "hOc1_pr_examples/mGluR2_3/hOc1_pr_mGluR2_3.tsv",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "name" : "hOc1_pr_mGluR2_3.tsv",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ]
  },
  {
     "name" : "hOc1_ar_M3.tif",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "filename" : "hOc1_ar_examples/M3/hOc1_ar_M3.tif",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png"
  },
  {
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_ar_5-HT1A.tif",
     "filename" : "hOc1_ar_examples/5-HT1A/hOc1_ar_5-HT1A.tif"
  },
  {
     "name" : "hOc1_ar_NMDA.tif",
     "referenceSpaces" : [
        {
           "name" : "*",
           "fullId" : "*"
        }
     ],
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "filename" : "hOc1_ar_examples/NMDA/hOc1_ar_NMDA.tif",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png"
  },
  {
     "filename" : "hOc1_ar_examples/D1/hOc1_ar_D1.tif",
     "name" : "hOc1_ar_D1.tif",
     "referenceSpaces" : [
        {
           "name" : "*",
           "fullId" : "*"
        }
     ],
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     }
  },
  {
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "filename" : "hOc1_ar_examples/GABAA/hOc1_ar_GABAA.tif",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "name" : "hOc1_ar_GABAA.tif",
     "referenceSpaces" : [
        {
           "name" : "*",
           "fullId" : "*"
        }
     ]
  },
  {
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "filename" : "hOc1_pr_examples/alpha1/hOc1_pr_alpha1.tsv",
     "referenceSpaces" : [
        {
           "name" : "*",
           "fullId" : "*"
        }
     ],
     "name" : "hOc1_pr_alpha1.tsv",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined"
  },
  {
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "filename" : "hOc1_pr_examples/NMDA/hOc1_pr_NMDA.tsv",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "name" : "hOc1_pr_NMDA.tsv",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ]
  },
  {
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "referenceSpaces" : [
        {
           "name" : "*",
           "fullId" : "*"
        }
     ],
     "name" : "hOc1_ar_alpha1.tif",
     "filename" : "hOc1_ar_examples/alpha1/hOc1_ar_alpha1.tif"
  },
  {
     "filename" : "hOc1_pr_examples/kainate/hOc1_pr_kainate.tsv",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "referenceSpaces" : [
        {
           "name" : "*",
           "fullId" : "*"
        }
     ],
     "name" : "hOc1_pr_kainate.tsv",
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     }
  },
  {
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png",
     "referenceSpaces" : [
        {
           "name" : "*",
           "fullId" : "*"
        }
     ],
     "name" : "hOc1_pr_GABAB.tsv",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "filename" : "hOc1_pr_examples/GABAB/hOc1_pr_GABAB.tsv"
  },
  {
     "name" : "hOc1_ar_alpha2.tif",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "filename" : "hOc1_ar_examples/alpha2/hOc1_ar_alpha2.tif",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png"
  },
  {
     "filename" : "hOc1_pr_examples/D1/hOc1_pr_D1.tsv",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_pr_D1.tsv",
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     }
  },
  {
     "filename" : "hOc1_pr_examples/M2/hOc1_pr_M2.tsv",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_pr_M2.tsv",
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     }
  },
  {
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "name" : "hOc1_pr_GABAA.tsv",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "filename" : "hOc1_pr_examples/GABAA/hOc1_pr_GABAA.tsv"
  },
  {
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_pr_alpha4beta2.tsv",
     "filename" : "hOc1_pr_examples/alpha4beta2/hOc1_pr_alpha4beta2.tsv",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png"
  },
  {
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "filename" : "hOc1_ar_examples/M1/hOc1_ar_M1.tif",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "name" : "hOc1_ar_M1.tif",
     "referenceSpaces" : [
        {
           "name" : "*",
           "fullId" : "*"
        }
     ]
  },
  {
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "filename" : "hOc1_ar_examples/5-HT2/hOc1_ar_5-HT2.tif",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_ar_5-HT2.tif",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined"
  },
  {
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "filename" : "hOc1_ar_examples/alpha4beta2/hOc1_ar_alpha4beta2.tif",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_ar_alpha4beta2.tif"
  },
  {
     "filename" : "hOc1_fp_20171202.tsv",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_fp_20171202.tsv",
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     }
  },
  {
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_pr_M1.tsv",
     "filename" : "hOc1_pr_examples/M1/hOc1_pr_M1.tsv",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png"
  },
  {
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "filename" : "hOc1_pr_examples/AMPA/hOc1_pr_AMPA.tsv",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_pr_AMPA.tsv",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined"
  },
  {
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_pr_5-HT2.tsv",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "filename" : "hOc1_pr_examples/5-HT2/hOc1_pr_5-HT2.tsv",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png"
  },
  {
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "filename" : "hOc1_pr_examples/M3/hOc1_pr_M3.tsv",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_pr_M3.tsv",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined"
  },
  {
     "filename" : "hOc1_ar_examples/M2/hOc1_ar_M2.tif",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_ar_M2.tif",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     }
  },
  {
     "filename" : "hOc1_ar_examples/kainate/hOc1_ar_kainate.tif",
     "referenceSpaces" : [
        {
           "fullId" : "*",
           "name" : "*"
        }
     ],
     "name" : "hOc1_ar_kainate.tif",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "mimetype" : "image/png",
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     }
  },
  {
     "@context" : {
        "kg_container_root" : "https://object.cscs.ch/v1/AUTH_227176556f3c4bb38df9feea4b91200c/hbp-d000045_receptors-human-hOc1_pub/v1.0/"
     },
     "mimetype" : "image/png",
     "url" : "getImagePipe?kgSchema=minds%2Fcore%2Fdataset%2Fv1.0.0&kgId=e715e1f7-2079-45c4-a67f-f76b102acfce&filename=undefined",
     "name" : "hOc1_pr_BZ.tsv",
     "referenceSpaces" : [
        {
           "name" : "*",
           "fullId" : "*"
        }
     ],
     "filename" : "hOc1_pr_examples/BZ/hOc1_pr_BZ.tsv"
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