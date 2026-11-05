/// <reference types="cypress" />  

describe('cadastro', () => {
    let accessToken 

    beforeEach('login', () => {
        cy.request({
            method: 'POST',
            url: 'https://cadastroprova.netlify.app/api/auth/login',
            body: {
                "email": "ulfgunnar6@gmail.com",
                "password": "subnet12"
            },
            log: false,
        }).then((respostalogin) => {
            accessToken = respostalogin.body.access_token
        })
    })

    it('cadastro 201', () => {
        cy.request({
            method: 'POST',
            url: 'https://cadastroprova.netlify.app/api/estoque',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: {
                "sku": "teste" + Date.now(),
                "nome": "oie",
                "unidade_medida": "UN",
                "valor_unitario": 1,
                "quantidade": 1,
                "quantidade_minima": 1,
                "localizacao": "",
                "ativo": true
              }
        }).then((resposta) => {
            expect(resposta.status).to.eq(201)
        })
    })

    it('cadastro 422', () => {
        cy.request({
            method: 'POST',
            url: 'https://cadastroprova.netlify.app/api/estoque',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: {
                "sku": "teste" + Date.now(),
                "nome": "oie",
                "unidade_medida": "UN",
                "valor_unitario": -5,
                "quantidade": 1,
                "quantidade_minima": 1,
                "localizacao": "",
                "ativo": true
              },
            failOnStatusCode: false
        }).then((resposta) => {
            expect(resposta.status).to.eq(422)
        })
    })
})