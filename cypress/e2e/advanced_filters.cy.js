/// <reference types="cypress" />

const stations = [
  {
    IDEESS: '1',
    'Rótulo': 'REPSOL CENTRO',
    'Dirección': 'CALLE MAYOR, 1',
    Municipio: 'Madrid',
    Provincia: 'MADRID',
    'Precio Gasoleo A': '1,459',
    'Precio Gasolina 95 E5': '1,579',
  },
  {
    IDEESS: '2',
    'Rótulo': 'CEPSA NORTE',
    'Dirección': 'AVENIDA EUROPA, 20',
    Municipio: 'Madrid',
    Provincia: 'MADRID',
    'Precio Gasoleo A': '',
    'Precio Gasolina 95 E5': '1,549',
  },
  {
    IDEESS: '3',
    'Rótulo': 'REPSOL SUR',
    'Dirección': 'CALLE REAL, 8',
    Municipio: 'Getafe',
    Provincia: 'MADRID',
    'Precio Gasoleo A': '1,399',
    'Precio Gasolina 95 E5': '1,519',
  },
  {
    IDEESS: '4',
    'Rótulo': 'GALP CENTRO',
    'Dirección': 'CALLE MAYOR, 5',
    Municipio: 'Toledo',
    Provincia: 'TOLEDO',
    'Precio Gasoleo A': '1,429',
    'Precio Gasolina 95 E5': '',
  },
];

describe('Filtros avanzados del listado', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/EstacionesTerrestres/**', {
      body: { ListaEESSPrecio: stations },
    }).as('getFuelPrices');
    cy.visit('/lista');
    cy.wait('@getFuelPrices');
  });

  it('combina búsqueda y filtros, informa del resultado y permite limpiarlos', () => {
    cy.get('[data-cy="station-search"]').type('repsol');
    cy.get('[data-cy="province-filter"]').select('MADRID');
    cy.get('[data-cy="fuel-filter"]').select('Precio Gasoleo A');

    cy.get('[data-cy="results-count"]').should('have.text', '2 gasolineras encontradas');
    cy.get('.fuel-table tbody tr').should('have.length', 2);
    cy.contains('.fuel-table tbody tr', 'REPSOL CENTRO').should('be.visible');
    cy.contains('.fuel-table tbody tr', 'REPSOL SUR').should('be.visible');
    cy.contains('.fuel-table tbody tr', 'CEPSA NORTE').should('not.exist');
    cy.contains('.fuel-table tbody tr', 'GALP CENTRO').should('not.exist');

    cy.get('[data-cy="clear-filters"]').click();

    cy.get('[data-cy="station-search"]').should('have.value', '');
    cy.get('[data-cy="province-filter"]').should('have.value', '');
    cy.get('[data-cy="fuel-filter"]').should('have.value', '');
    cy.get('[data-cy="results-count"]').should('have.text', '4 gasolineras encontradas');
    cy.get('.fuel-table tbody tr').should('have.length', 4);
  });
});
