// To be updated when liking an event is tested and implemented

import Feed from "../../src/components/feed/Feed";
import { getDate } from "../../src/components/feed/Feed";

describe("Viewing Feed", () => {

  beforeEach(() => {
    cy.signup("user@email.com", "12345678", "username");
    cy.clock(new Date(), ["Date"]);
  });

  it("with valid credentials, redirects to '/'", () => {
    const date = getDate();
    cy.visit("/login");
    cy.get("#email").type("user@email.com");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();

    cy.intercept(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&city=london&size=2&sort=date,asc&startDateTime=${date}&apikey=JtjU0ATGKIgSLhSEz5UQnr1LFy9hYZ0s`,
      (req) => {
        console.log("this has been reached");
        req.reply({
          statusCode: 200,
          body: {
            _embedded: {
              events: [
                {
                  images: [{ url: "https://example.com" }],
                  _embedded: { venues: [{ name: "fake venue" }] },
                  name: "Alice",
                  dates: {start: {localDate: "2023/07/07", localTime: "19:00:00"}},
                },
              ],
            },
          },
        });
      }
    ).as("getEvents");
    cy.mount(<Feed />);

  
  cy.url().should("include", "/");
  cy.wait("@getEvents").then(() => {
    cy.get("[data-cy='feed']").should("be.visible");
  });
});
})
