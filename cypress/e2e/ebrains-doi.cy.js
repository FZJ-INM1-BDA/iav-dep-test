const doi = "https://doi.org/10.25493/WRCY-8Z1"
describe(`visiting doi ${doi}`, () => {
  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      cy.document().then((doc) => {
        cy.task('log', '\n===== PAGE HTML AT FAILURE =====\n')
        cy.task('log', doc.documentElement.outerHTML)
        cy.task('log', '\n===== END PAGE HTML =====\n')
      })
    }
  })

  it('can find expected text', () => {
    cy.visit(doi)
    cy.contains("Probabilistic cytoarchitectonic map of Area hIP7 (IPS)",  { timeout: 30000 })
    cy.wait(2)
  })
})
