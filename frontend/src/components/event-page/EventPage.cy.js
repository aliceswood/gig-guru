import EventPage from "./EventPage";
const navigate = () => {};

const fakeData = {
  body: {
    events: [
      {
        images: [{ url: "https://example.com" }],
        _embedded: { venues: [{ name: "fake venue" }] },
        name: "Alice",
        dates: { start: { localDate: "2023/07/07", localTime: "19:00:00" } },
      },
    ],
  },
};


describe("ViewEvent", () => {
  it("Displays the event held in local storage", () => {
    window.localStorage.setItem("token", "fakeToken");
    window.localStorage.setItem("apiData", fakeData)

    cy.mount(<EventPage navigate={navigate} />);

    cy.get('[data-cy="event-info-div"]').should(
      "contain.text",
      "Alice",
      "2023/07/07",
      "19:00:00"
    );
  });
});