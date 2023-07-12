import Map from './Map.js';

describe('Map', () => {
  it('renders map', () => {
    cy.mount(<Map />);
    cy.get("[data-cy='map']").should("have.class", "map");
  });
});