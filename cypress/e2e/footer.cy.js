/// <reference types="cypress" />

describe('Footer del equipo', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/EstacionesTerrestres/**', {
      fixture: 'fuel_data.json',
    });
    cy.visit('/');
  });

  it('muestra los nombres de todos los miembros del equipo', () => {
    cy.get('footer').within(() => {
      cy.contains('h2', 'Equipo 09').should('be.visible');
      cy.contains('Fernando Giganto').should('be.visible');
      cy.contains('James Iglesias Fernandezpolo').should('be.visible');
    });
  });
});
