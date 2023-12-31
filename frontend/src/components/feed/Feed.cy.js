import { MemoryRouter } from "react-router-dom";
import Feed from "./Feed";
import { getDate } from "./Feed";
const navigate = () => {};

beforeEach(() => {
  cy.clock(new Date(), ["Date"]);
});

describe("Feed", () => {
  it("Calls the / endpoint and lists all the events", () => {
    const date = getDate();
    const city = 'London'
    window.localStorage.setItem("token", "fakeToken");
    
    cy.intercept("/users",
    (req) => {
      req.reply({
        statusCode: 200,
        body: {
          userId: "fakeUserId",
          email: "fakeEmail@example.com",
          username: "Fake User",
          name: "Alice"
        },
      });
    }
    ).as("getUsers");

    cy.intercept(
                `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&countryCode=GB&city=${city}&size=50&sort=date,asc&startDateTime=${date}&apikey=${process.env.REACT_APP_TICKETMASTER_KEY}`,
      (req) => {
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

      cy.mount(<MemoryRouter><Feed navigate={navigate}/></MemoryRouter>)
      
      cy.wait("@getUsers").then(() => {
      });
      
      cy.wait("@getEvents").then(() => {
        cy.get('[data-cy="event-info-container"]').should(
          "contain.text",
          "Alice",
        "2023/07/07",
        "19:00:00"
      );
    })
  });
});