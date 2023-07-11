import { MemoryRouter } from "react-router-dom";
import Event from "./Event";

const props = {
  images: [{ url: "https://example.com" }],
  _embedded: { venues: [{ name: "fake venue" }] },
  name: "Alice",
  dates: {start: {localDate: "2023/07/07", localTime: "19:00:00"}},
};

describe("Event", () => {
  it("renders an event with event details", () => {
    cy.mount(
      <MemoryRouter>
        <Event {...props} />
      </MemoryRouter>
    );
    cy.get('[data-cy="event-info-container"]').should("have.class", "event-info-container");
    cy.get('[data-cy="event-info-container"]').should("contain.text", "Alice", "2023/07/07", "19:00:00");
  });
});
