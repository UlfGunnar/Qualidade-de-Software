/// <reference types="cypress"/>

describe("barriga", () => {
    beforeEach(() => {
        cy.visit("https://seubarriga.wcaquino.me/cadastro")
    })

    it(".cadastro 200", () => {
        cy.get('[name="nome"]').type("Ulf Gunnar")
        cy.get('[name="email"]').type("ulfgunnar" + Date.now() + "@gmail.com")
        cy.get('[name="senha"]').type("Subnet12?")
        cy.get('.btn').click()
        cy.get('.alert').should('have.text', 'Usuário inserido com sucesso')
    }) 

    it(".cadastro sem email", () => {
        cy.get('[name="nome"]').type("Ulf Gunnar")
        cy.get('[name="senha"]').type("Subnet12?")
        cy.get('.btn').click()
        cy.get('.alert').should('have.text', 'Email é um campo obrigatório')
    }) 

    it(".cadastro sem nome", () => {
        cy.get('[name="email"]').type("ulfgunnar" + Date.now() + "@gmail.com")
        cy.get('[name="senha"]').type("Subnet12?")
        cy.get('.btn').click()
        cy.get('.alert').should('have.text', 'Nome é um campo obrigatório')
    }) 

    it(".cadastro sem senha", () => {
        cy.get('[name="nome"]').type("Ulf Gunnar")
        cy.get('[name="email"]').type("ulfgunnar" + Date.now() + "@gmail.com")
        cy.get('.btn').click()
        cy.get('.alert').should('have.text', 'Senha é um campo obrigatório')
    }) 

    it(".login", () => {
        cy.get('[name="nome"]').type("Ulf Gunnar")
        cy.get('[name="email"]').type("ulfgunnar" + Date.now() + "@gmail.com")
        cy.get('.btn').click()
        cy.get('.alert').should('have.text', 'Senha é um campo obrigatório')
    }) 
})