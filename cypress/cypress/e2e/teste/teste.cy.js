/// <reference types="cypress"/>

describe("teste", () => {
    /*
    beforeEach(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")
    })
    */

    beforeEach(() => {
        cy.visit("https://www.youtube.com/")
    })

    /*
    it(".click()", () => {
        cy.get('#buttonLazy').click()  
        .should("be.visible")
        .should("have.value", "zZz ZzZ!:")
    })
    it(".should()", () => {
        cy.get('#buttonSimple')
        .click()  
        .should('have.value', 'Obrigado!')
    })
    it(".type()", () => {
        cy.get('[name="formNome"]').type("Ulf")
        cy.get('[data-cy="dataSobrenome"]').type("Gunnar")
        cy.wait(5000)
        cy.get('[name="formNome"]').clear()
        cy.wait(5000)
    })
    it(".check()", () => {
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(4) > input').check()
        cy.get(':nth-child(2) > :nth-child(4) > input').check()
        cy.get(':nth-child(3) > :nth-child(4) > input').check()
        cy.wait(5000)
        cy.get(':nth-child(2) > :nth-child(4) > input').uncheck()
        cy.wait(5000)
    })
    it(".select()", () => {
        cy.get('[data-testid="dataEsportes"]').select(0)
    })
    it(".reload()", () => {
        cy.get('[data-testid="dataEsportes"]').reload()
    })  
    */

    it(".youtube", () => {
        cy.get('[name="search_query"]').type('Caneta azul')
        cy.get('[aria-label="Search"]').click()
        cy.get(':nth-child(1) > #dismissible > ytd-thumbnail.style-scope > #thumbnail > yt-image.style-scope > .ytCoreImageHost').click()
    }) 
}) 