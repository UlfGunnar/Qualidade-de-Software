/// <reference types="cypress" />   

describe("login", () => {
    it("Login deve retornar 200", () => {
        cy.request({
            method: 'POST',
            url: 'https://cadastroprova.netlify.app/api/auth/login',
            body: {
                "email": "ulfgunnar6@gmail.com",
                "password": "subnet12"
            }
        }).then((resposta) => {
            expect(resposta.status).to.eq(200)
        })
    })
})