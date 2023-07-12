import Feed from "./Feed";
import { getDate } from "./Feed";
const navigate = () => {};

beforeEach(() => {
  cy.clock(new Date(), ["Date"]);
});

describe("Feed", () => {
  it("Calls the / endpoint and lists all the events", () => {
    const date = getDate();
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&city=london&size=2&sort=date,asc&startDateTime=${date}&apikey=JtjU0ATGKIgSLhSEz5UQnr1LFy9hYZ0s`,
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
    cy.mount(<Feed />);

    cy.wait("@getEvents").then(() => {
      cy.get('[data-cy="event-info-container"]').should(
        "contain.text",
        "Alice",
        "2023/07/07",
        "19:00:00"
      );
    });
  });
});
