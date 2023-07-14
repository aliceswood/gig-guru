import SignupForm from './SignupForm'
const navigate = () => {}

describe("Signing up", () => {
  it("calls the /users endpoint", () => {
    cy.mount(<SignupForm navigate={navigate}/>)

    cy.intercept('POST', '/users', { message: "OK" }).as("signUpRequest")

    cy.get("#username").type("username1");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
})
