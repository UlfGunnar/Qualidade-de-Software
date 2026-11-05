/// <reference types="cypress" />  

describe('login', () => {
    it('login status 200', () => {
        cy.request({
            method: 'POST',
            url: 'https://cadastroprova.netlify.app/api/auth/login',
            body: {
                    email: "ulfgunnar6@gmail.com", 
                    password: "subnet12"
            }
        }).then((resposta) => {
            expect(resposta.status).to.eq(200)
            expect(resposta.body).to.have.property('access_token')
        })
    })

    it('login status 401', () => {
        cy.request({
            method: 'POST',
            url: 'https://cadastroprova.netlify.app/api/auth/login',
            body: {
                    email: "ulfgunnar6@gmail.com", 
                    password: "subnet1"
            },
            failOnStatusCode: false
        }).then((resposta) => {
            expect(resposta.status).to.eq(401)
            expect(resposta.body.error).to.have.property('message')
            expect(resposta.body.error.code).to.eq('invalid_credentials')
            expect(resposta.body.error.message).to.eq('E-mail não cadastrado ou senha incorreta. Confira os dados e tente novamente.')
        })
    })

    it('login status 422', () => {
        cy.request({
            method: 'POST',
            url: 'https://cadastroprova.netlify.app/api/auth/login',
            body: {
                    email: null, 
                    password: null
            },
            failOnStatusCode: false
        }).then((resposta) => {
            expect(resposta.status).to.eq(422)
        })
    })
})