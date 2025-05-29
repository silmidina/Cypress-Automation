describe('Tambah Karyawan Baru', function () {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('Add New Employee-Success', () => {
    // login
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard') // pastikan login berhasil

    cy.contains('PIM').click()
    cy.contains('Add Employee').click()
    cy.get('input[name="firstName"]').type('Dina')
    cy.get('input[name="lastName"]').type('Sari')
    cy.get('.oxd-switch-input').click()

    cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type('DinaSari')
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('dina123')
    cy.get('.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('dina123')
    cy.get('button[type="submit"]').contains('Save').click();

    // Verifikasi alert sukses muncul
    cy.get('.oxd-toast-content', { timeout: 10000 })
    .should('be.visible')
    .and('contain', 'Successfully Saved');

    cy.get('h6.oxd-text.oxd-text--h6.orangehrm-main-title', { timeout: 55000 })
    .should('contain', 'Personal Details');

    // Screenshot hasil akhir
    cy.screenshot("add-employee-success")
  })

  it('Failed to add employee due to empty data', () => {
    // login
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard') // pastikan login berhasil

    cy.contains('PIM').click()
    cy.contains('Add Employee').click()
    cy.get('button[type="submit"]').contains('Save').click();

    // Screenshot hasil akhir
    cy.screenshot("add-employee-failed")
  })
})
