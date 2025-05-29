describe('Basic UI Automation - OrangeHRM', () => {
  const adminUsername = 'Admin';
  const adminPassword = 'admin123';

  it.skip('1. Admin menambahkan karyawan baru', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Login sebagai admin
    cy.get('input[name="username"]').type(adminUsername);
    cy.get('input[name="password"]').type(adminPassword);
    cy.get('button[type="submit"]').click();

    // Akses menu PIM > Add Employee
    cy.contains('PIM').click();
    cy.contains('Add Employee').click();

    // Tambah karyawan baru
    cy.get('input[name="firstName"]').type('mawar');
    cy.get('input[name="lastName"]').type('biru');
    cy.get('.oxd-switch-input').click()
    
    cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type('mawarbiru')
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('mawar123')
    cy.get('.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('mawar123')
    cy.get('button[type="submit"]').contains('Save').click();

    // Verifikasi alert sukses muncul
    cy.get('.oxd-toast-content', { timeout: 10000 })
    .should('be.visible')
    .and('contain', 'Successfully Saved');

    cy.get('h6.oxd-text.oxd-text--h6.orangehrm-main-title', { timeout: 25000 })
    .should('contain', 'Personal Details');

  });

  it.skip('2. Admin menambahkan jatah cuti untuk karyawan baru', () => {
    // Pastikan sudah login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type(adminUsername);
    cy.get('input[name="password"]').type(adminPassword);
    cy.get('button[type="submit"]').click();

    // Menu Leave > Entitlements > Add Entitlements
    cy.contains('Leave').click();
    cy.contains('Entitlements').click();
    cy.contains('Add Entitlements').click();

    // Isi form jatah cuti
    cy.get('input[placeholder="Type for hints..."]').type('mawar');
    cy.wait(3000); // tunggu auto-suggest muncul
    cy.get('div[role="listbox"] > div').first().click(); // pilih Budi

    // Pilih Leave Type
    cy.get('div.oxd-select-text--after').first().click();
    cy.contains('CAN - Personal').click();
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').first().click();
    cy.contains('2024-01-01 - 2024-31-12').click();

    // Isi jatah cuti
    cy.get(':nth-child(2) > .oxd-input').type('10');
    cy.get('button[type="submit"]').contains('Save').click();

    cy.contains('Updating Entitlement').should('be.visible');
    cy.get('button').contains('Confirm').click();

    cy.contains('Successfully Saved', { timeout: 10000 }).should('be.visible');

    // cy.screenshot('2-berhasil-tambah-jatah-cuti');
  });

  it.skip('3. Negative Test - Coba login sebagai Budi tanpa akun aktif', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]').type('budi');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');

    cy.screenshot('3-gagal-login-budi');
  });
});
