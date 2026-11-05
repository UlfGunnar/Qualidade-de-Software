/// <reference types="cypress" />  

describe('login', () => {
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

    it('visualização 200', () => {
        cy.request({
            method: 'GET',
            url: 'https://cadastroprova.netlify.app/api/estoque',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((resposta) => {
            expect(resposta.status).to.eq(200)
            expect(resposta.body.data).to.be.an('array') // verifica se tem chega um array
            expect(resposta.body.data).to.have.length.greaterThan(0) //verifica se o array chega pelo menos vazio ou mais itens
        })
    })

    it('visualização 401', () => {
        cy.request({
            method: 'GET',
            url: 'https://cadastroprova.netlify.app/api/estoque',
            failOnStatusCode: false,
            headers: {
                Authorization: 'Bearer ${access*Token}'
            }
        }).then((resposta) => {
            expect(resposta.status).to.eq(401)
            expect(resposta.body.error.message).to.eq('O token informado é inválido ou expirou.')
        })
    })

    it('visualização 404', () => {
        cy.request({
            method: 'GET',
            url: 'https://cadastroprova.netlify.app/api/estoque/04e88745-4ecf-428d-bb67-45c3f5081ef0',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((resposta) => {
            expect(resposta.status).to.eq(404)
            expect(resposta.body.error.message).to.eq('Item de estoque não encontrado.')
        })
    })
})