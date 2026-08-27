/// <reference types="cypress"/>

describe("cadastro", () => {
    beforeEach(() => {
        cy.visit("https://seubarriga.wcaquino.me")
    })

    it(".login", () => {
        cy.get('[name="email"]').type("ulfgunnar6@gmail.com")
        cy.get('[name="senha"]').type('Subnet12?')
        cy.get('.btn').click()
        cy.get('.alert').should('have.text', 'Bem vindo, Ulf Gunnar!')
    })  

    it(".login sem email", () => {
        cy.get('[name="senha"]').type('Subnet12?')
        cy.get('.btn').click()
        cy.get('.alert').should('have.text', 'Email é um campo obrigatório')
    })  

    it(".login sem senha", () => {
        cy.get('[name="email"]').type("ulfgunnar6@gmail.com")
        cy.get('.btn').click()
        cy.get('.alert').should('have.text', 'Senha é um campo obrigatório')
    })  

    it(".login com email errado", () => {
        cy.get('[name="email"]').type("ulfgunnar" + Date.now() + "@gmail.com")
        cy.get('[name="senha"]').type('Subnet12?')
        cy.get('.btn').click()
        cy.get('.alert').should('have.text', 'Problemas com o login do usuário')
    })  

    it(".login com senha errado", () => {
        cy.get('[name="email"]').type("ulfgunnar6@gmail.com")
        cy.get('[name="senha"]').type('Subnet12?' + Date.now())
        cy.get('.btn').click()
        cy.get('.alert').should('have.text', 'Problemas com o login do usuário')
    })  
})  