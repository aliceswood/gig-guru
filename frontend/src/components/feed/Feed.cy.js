import Feed from "./Feed";
import { getDate } from "./Feed";

beforeEach(() => {
  cy.clock(new Date(), ["Date"]);
});

describe("Feed", () => {
  it("Calls the / endpoint and lists all the events", () => {
    const date = getDate();
    window.localStorage.setItem("token", "fakeToken");
    console.log("date is:", date);
    // cy.get("[data-cy='feed']").should('be.visible')

    //check previous acebook projects to see the syntax
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

    // cy.get("[data-cy='feed']").should("be.visible");
    cy.wait("@getEvents").then(() => {
      cy.get('[data-cy="event-info-container"]').should(
        "contain.text",
        "Alice",
        "2023/07/07",
        "19:00:00"
      );
      console.log("you have made it");
    });
  });
});

// cy.intercept('http://example.com/settings').as('getSettings')

// cy.visit('http://example.com/settings')

// // once a request to get settings responds, 'cy.wait' will resolve
// cy.wait('@getSettings')
