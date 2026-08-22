/// <reference types="cypress" />


describe('example to-do app', () => {
    beforeEach(() => {
    })
  
    it('Teste sucesso', () => { 

        cy.request({
            method: 'POST',
            url: 'https://regressaosenai.netlify.app/api/auth/forgot-password',
            body: 
                {
                    "email": "ulfgunnar6@gmail.com"
                }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Teste de falha', () => {

        cy.request({
            method: 'POST',
            url: 'https://regressaosenai.netlify.app/api/auth/forgot-password',
            body: 
                {
                    "email": "ulfgun3123123131231231@gmail.com"
                }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})