describe('My First Test', () => {
    it('test1-verify title-positive', () => {
      cy.visit("https://opensource-demo.orangehrmlive.com/")
      cy.title().should('eq', 'OrangeHRM')
    });
  
    it('verify title-Nagative test', () => {
      cy.visit("https://opensource-demo.orangehrmlive.com/")
      cy.title().should('eq', 'OrangeHRM123')
    });
});