describe("Viewing Feed", () => {
  
  beforeEach(() => {
    cy.signup("user@email.com", "12345678", "username");
  });
  
  it("with valid credentials, redirects to '/'", () => {
    cy.visit("/login");
    cy.get("#email").type("user@email.com");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();

    cy.url().should("include", "/");
    cy.get("[data-cy='feed']").should("be.visible");
    cy.get("[data-cy='like-button']").should("be.visible");
  });

  it("with no token, redirects to /signup", () => {
    cy.visit("/");
    cy.url().should("include", "/signup");
  })
})
