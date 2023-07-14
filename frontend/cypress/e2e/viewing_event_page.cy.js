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
    cy.get("[data-cy='more-info-button']").should("be.visible");
    cy.get("[data-cy='more-info-button']").first().click();

    cy.url().should("include", "/event/");
    cy.get("[data-cy='event-div']").should("be.visible")
    cy.get("[data-cy='event-name']").should("be.visible")
  });

  it("with valid credentials it redirects to '/' from the liked events", () => {
    cy.visit("/login");
    cy.get("#email").type("user@email.com");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();
    
    cy.get("[data-cy='feed']").should("be.visible");
    cy.get("[data-cy='actual-like-button']").should("be.visible");
    cy.get("[data-cy='actual-like-button']").first().click();

    cy.get("[data-cy='user-page-button']").should("be.visible");
    cy.get("[data-cy='user-page-button']").first().click();

    cy.url().should("include", "/account");
    cy.get("[data-cy='clickable-carousel-item']").should("be.visible")
    cy.get("[data-cy='clickable-carousel-item']").first().click();

    cy.url().should("include", "/event/");
    cy.get("[data-cy='event-div']").should("be.visible")
    cy.get("[data-cy='event-name']").should("be.visible")
  })
})
