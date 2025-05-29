describe("Karyawan Baru Request Cuti", () => {
    it("Karyawan Baru request cuti - Positive Case", () => {
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

      // // a. Login sebagai karyawan baru
      cy.get('input[name="username"]').type("DinaSari");
      cy.get('input[name="password"]').type("dina123");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/dashboard");

      // // b. Request cuti
      cy.contains("Leave").click();
      cy.contains("Apply").should("be.visible").click();
      cy.get(".oxd-form").should("be.visible");

      // // Pilih Leave Type (HARUS VALID)
      cy.get(".oxd-select-text-input").eq(0).click({ force: true });
      cy.contains("div.oxd-select-option", "CAN - Personal").click();

      // // Isi tanggal cuti
      cy.get(".oxd-date-input input").eq(0).clear().type("2025-05-14", { force: true });
      cy.get(".oxd-date-input input").eq(1).clear().type("2025-05-20", { force: true });

      // // Isi keterangan sebelum submit!
      cy.get(".oxd-textarea").type("Izin cuti melahirkan", { force: true });

      // // Submit permohonan cuti
      cy.get('button[type="submit"]').click();
      cy.get(".oxd-toast-content", { timeout: 10000 }).should("contain.text", "Successfully Saved");

      // // Logout dari karyawan
      cy.get('.oxd-userdropdown-tab > .oxd-icon').click();
      cy.contains("Logout").click();

      // c. Login sebagai admin
      cy.get('input[name="username"]').type("admin");
      cy.get('input[name="password"]').type("admin123");
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/dashboard");

      // d. Approve cuti pegawai
      cy.contains("Leave").click();
      cy.contains("Leave List").click();

      // Cari cuti dari user "johndoe"
      cy.get(".oxd-autocomplete-text-input input").type("Dina");
      cy.wait(1000);
      cy.get(".oxd-autocomplete-option").first().click();

      // Klik Search
      cy.get('button[type="submit"]').click();
      cy.wait(2000);

      // Approve baris pertama
      cy.get(".oxd-table-card").first().find('input[type="checkbox"]').check({ force: true });
      cy.contains('Approve').click({ force: true });
      cy.contains('Yes, Confirm').should('be.visible').click({ force: true });
      cy.get('.oxd-toast-content', { timeout: 10000 }).should('contain', 'Success');

      // Logout admin
      cy.get(".oxd-userdropdown-icon").click();
      cy.contains("Logout").click();

      // e. Login kembali sebagai karyawan
      cy.get('input[name="username"]').type("DinaSari");
      cy.get('input[name="password"]').type("dina123");
      cy.get('button[type="submit"]').click();

      // f. Verifikasi status cuti di My Leave
      cy.contains("Leave").click();
      cy.contains("My Leave").click();
      cy.wait(2000);

      // Screenshot hasil akhir
      cy.screenshot("cuti-approved-karyawan-success");
    });

    it("Gagal request cuti karena data tidak lengkap", () => {
		// a. Login sebagai karyawan baru
		cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
		cy.get('input[name="username"]').type("DinaSari");
		cy.get('input[name="password"]').type("dina123");
		cy.get('button[type="submit"]').click();
		cy.url().should("include", "/dashboard");

		// b. Masuk ke halaman Apply Leave
		cy.contains("Leave").click();
		cy.contains("Apply").should("be.visible").click();
		cy.get(".oxd-form").should("be.visible");

		// Klik tombol submit langsung
		cy.get('button[type="submit"]').click();

		// Validasi muncul pesan error
		cy.get(".oxd-input-field-error-message")
			.should("exist")
			.and("contain", "Required");

		// Screenshot hasil validasi
		cy.screenshot("cuti-request-gagal-karena-data-kosong");
	});
});
