import "@testing-library/cypress/add-commands";
Cypress.Commands.add("LoginWithPageSession", (randomEmail) => {
  cy.session([randomEmail], () => {
    cy.visit("/login");

    cy.get('[type="email"]').type(randomEmail, { force: true });
    cy.get('[placeholder="Password"]').type("correctpass1234", {
      force: true,
    });
    cy.get(".login-btn").click({ force: true });

    //Check if redirected to home page
    cy.url().should("include", "/UpdateProfile");
    cy.findByRole("textbox", { name: /email:/i }).should(
      "have.value",
      randomEmail
    );
  });
});
