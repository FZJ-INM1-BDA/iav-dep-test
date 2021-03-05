# Interactive atlas viewer dependency monitoring

This repo contains the API tests for dependencies of interactive atlas viewer.

## iav monitoring

| name | frequency | status | 
| --- | --- | --- |
| data/metadata query | every 10 min | |

## ebrain services

| name | frequency | status |
| --- | --- | --- |
| KeyCloak OAuthV2 | every 10 min | [![[ebrain services] [10min] OAuth v2](https://github.com/FZJ-INM1-BDA/iav-dep-test/workflows/%5Bebrain%20services%5D%20%5B10min%5D%20OAuth%20v2/badge.svg)](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions?query=workflow%3A%22%5Bebrain+services%5D+%5B10min%5D+OAuth+v2%22) |
| DOI redirect | every 10 min |  |

## KG Dataset Preview (deprecating soon... only used for PMaps and volumes)

| name | frequency | status |
| --- | --- | --- |
| pmaps preview | hourly | [![Monitoring KG Dataset Preview Service](https://github.com/fzj-inm1-bda/iav-dep-test/workflows/Monitoring%20KG%20Dataset%20Preview%20Service/badge.svg)](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions?query=workflow%3A%22Monitoring+KG+Dataset+Preview+Service%22) |



## Misc (TODO split into more granular tests)

Frequency: once every 10 min

[![Monitoring IAV dependency services](https://github.com/fzj-inm1-bda/iav-dep-test/workflows/Monitoring%20IAV%20dependency%20services/badge.svg)](https://github.com/FZJ-INM1-BDA/iav-dep-test/actions?query=workflow%3A%22Monitoring+IAV+dependency+services%22)
