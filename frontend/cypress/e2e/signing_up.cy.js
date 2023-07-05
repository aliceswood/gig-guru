// describe("Signing up", () => {
//   it("with valid credentials, redirects to '/login'", () => {
//     cy.visit("/signup");
//     cy.get("#username").type("username1");
//     cy.get("#email").type("someone@example.com");
//     cy.get("#password").type("password");
//     cy.get("#submit").click();

//     cy.url().should("include", "/login");
//   });

it("with missing password, redirects to '/signup'", () => {
  cy.visit("/signup");
  cy.get("#username").type("username1");
  cy.get("#email").type("someone@example.com");
  cy.get("#submit").click();

  cy.url().should("include", "/signup");
});