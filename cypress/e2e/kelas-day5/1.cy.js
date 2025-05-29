describe("UI automation cypress", async function () {
  it("login", async function () {
    await cy.visit("https://opensource-demo.orangehrmlive.com/");
    await cy.get('[name="username"]').type("Admin");
    // await cy.get('[name="password"]');
    let password = cy.get('[name="password"]');
    await password.type("password");
    await password.clear();
    await password.type("admin123");
    await cy.get("button").click();
  });
});
