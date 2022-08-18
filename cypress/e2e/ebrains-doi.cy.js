const doi = "https://doi.org/10.25493/WRCY-8Z1"
describe('empty spec', () => {
  it('passes', () => {
    cy.visit(doi)
    cy.contains("Probabilistic cytoarchitectonic map of Area hIP7 (IPS)")
    cy.wait(2)
  })
})
