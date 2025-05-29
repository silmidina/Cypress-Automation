describe('Tambah Karyawan Baru', function () {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('Admin adds leave allowance for new employees-Success', () => {
    // login
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard') // pastikan login berhasil

     // Menu Leave > Entitlements > Add Entitlements
    cy.contains('Leave').click();
    cy.contains('Entitlements').click();
    cy.contains('Add Entitlements').click();

    // Isi form jatah cuti
    cy.get('input[placeholder="Type for hints..."]').type('Dina');
    cy.wait(3000); // tunggu auto-suggest muncul
    cy.get('div[role="listbox"] > div').first().click(); // pilih Budi

    // Pilih Leave Type
    cy.get('div.oxd-select-text--after').first().click();
    cy.contains('CAN - Personal').click();
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').first().click();
    cy.contains('2025-01-01 - 2025-31-12').click();

    // Isi jatah cuti
    cy.get(':nth-child(2) > .oxd-input').type('10');
    cy.get('button[type="submit"]').contains('Save').click();

    cy.contains('Updating Entitlement').should('be.visible');
    cy.get('button').contains('Confirm').click();

    cy.contains('Successfully Saved', { timeout: 10000 }).should('be.visible');
  })

  it('Admin gagal menambahkan jatah cuti karena field kosong', () => {
    // Login
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    // Navigasi ke Add Entitlements
    cy.contains('Leave').click();
    cy.contains('Entitlements').click();
    cy.contains('Add Entitlements').click();

    // Isi form tanpa isi jumlah cuti
    cy.get('input[placeholder="Type for hints..."]').type('Dina');
    cy.wait(3000); // tunggu auto-suggest
    cy.get('div[role="listbox"] > div').first().click();

    cy.get('div.oxd-select-text--after').first().click();
    cy.contains('CAN - Personal').click();

    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').first().click();
    cy.contains('2024-01-01 - 2024-31-12').click();

    // Klik Save
    cy.get('button[type="submit"]').contains('Save').click();

    // Verifikasi error muncul di field entitlement
    cy.get('.oxd-input-group__message')
      .should('be.visible')
      .and('contain', 'Required'); // tergantung teks errornya
  });
  
})
