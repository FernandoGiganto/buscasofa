/// <reference types="cypress" />

describe('Página About', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/EstacionesTerrestres/**', {
      fixture: 'fuel_data.json',
    });
    cy.visit('/about');
  });

  it('muestra el número, los miembros y sus aportaciones', () => {
    cy.get('main.about-container').within(() => {
      cy.contains('Equipo 09').should('be.visible');
      cy.get('[data-cy="team-member"]').should('have.length', 2);
      cy.contains('h2', 'Fernando Giganto').should('be.visible');
      cy.contains(
        'Desarrollo de funcionalidades, integración de la aplicación y automatización de pruebas.'
      ).should('be.visible');
      cy.contains('h2', 'James Iglesias Fernandezpolo').should('be.visible');
      cy.contains(
        'Organización, creación y maquetación de la documentación de la actividad.'
      ).should('be.visible');
    });
  });
});
