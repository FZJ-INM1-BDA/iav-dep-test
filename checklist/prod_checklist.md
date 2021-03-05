# interactive atlas viewer production check list

## About

This is a manual checklist for e2e functionalities. This should be carried out on the staging deployment to ensure that all the expected behaviours of the viewer is functional.

## Checklist

### Region exploration

- [ ] on region selection, pmap is displayed
- [ ] on region selection, regional features are visible
- [ ] region can be deselected via
  - [ ] clicking x at search bar
  - [ ] clicking x at chip
- [ ] regional features exploration can be launched via regional feature panel
- [ ] regional feature exploration can be escaped out of
- [ ] explore in other templates work as expected

### Receptor density (hoc1)

- [ ] Dataset can be found
- [ ] Fingerprint exists, can be found, and can be displayed
- [ ] profile/ar exists, can be found, and can be displayed

### Connectivity

- [ ] Can be found
- [ ] Connection strength can be visualised
- [ ] Connection strength visualisation can be turned off
  - [ ] via side panel
  - [ ] via bottom chip