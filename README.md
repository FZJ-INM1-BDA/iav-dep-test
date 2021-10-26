# Interactive atlas viewer dependency monitoring

This repo contains the API tests for dependencies of interactive atlas viewer.

## siibra-api

| anme | status |
| --- | --- |
| siibra-api e2e | [![[siibra-api] [10min]](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions/workflows/siibra.api.yml/badge.svg)](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions/workflows/siibra.api.yml) |

## siibra-explorer

| name | status | 
| --- | --- |
| siibra-explorer (front page loadable) | [![[siibra-explorer] [10min]](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions/workflows/siibra.explorer.yml/badge.svg)](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions/workflows/siibra.explorer.yml)|
| iav saneUrl | [![[iav] [2hr] saneurl api](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions/workflows/iav.saneUrl.yml/badge.svg)](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions/workflows/iav.saneUrl.yml) |

## siibra direct dependencies

currently testing for:

- data-preview (required for PLI volumes)
- kg-search (v1) required for `siibra-api` and `siibra-python`. Indirectly required by `siibra-explorer`
- spatial-xform - required by `siibra-explorer` when switching templates.

| name | status |
| --- | --- |
| dependencies | [![[siibra/dep] [10min]](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions/workflows/siibra.dep.yml/badge.svg)](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions/workflows/siibra.dep.yml) |

## ebrain services

| name | status |
| --- | --- |
| KeyCloak OAuthV2 | [![[ebrain services] [10min] OAuth v2](https://github.com/FZJ-INM1-BDA/iav-dep-test/workflows/%5Bebrain%20services%5D%20%5B10min%5D%20OAuth%20v2/badge.svg)](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions?query=workflow%3A%22%5Bebrain+services%5D+%5B10min%5D+OAuth+v2%22) |
| DOI redirect | [![[ebrain services] [10min] DOI Redirect](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions/workflows/ebrains.doi.yml/badge.svg)](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions/workflows/ebrains.doi.yml) |
