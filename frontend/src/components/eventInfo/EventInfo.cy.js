import EventInfo from "./EventInfo";

const props = {
  images: [{ url: "https://example.com" }],
  _embedded: { venues: [{ name: "fake venue", postalCode: "12345"}] },
  name: "Alice",
  dates: {start: {localDate: "2023/07/07", localTime: "19:00:00"}},
};


describe("EventInfo", () => {
  it("renders an event with event details", () => {
    cy.mount(<EventInfo {...props}/>);
    cy.get('[data-cy="event-image"]').should('be.visible');
    cy.get('[data-cy="event-name"]').should('be.visible');
    cy.get('[data-cy="event-date"]').should('be.visible');
    cy.get('[data-cy="event-time"]').should('be.visible');
    cy.get('[data-cy="event-venue"]').should('be.visible');
    cy.get('[data-cy="event-postalcode"]').should('be.visible')
  });
});
