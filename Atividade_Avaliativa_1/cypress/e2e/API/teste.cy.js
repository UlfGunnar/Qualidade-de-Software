/// <reference types="cypress" />  

describe('login', () => {
    let accessToken 
    let ID_cliente

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


    //CT01
    it('visualização 200', () => {
        cy.request({
            method: 'GET',
            url: 'https://cadastroprova.netlify.app/api/clientes',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((resposta) => {
            expect(resposta.status).to.eq(200)
            expect(resposta.body.data).to.be.an('array')
            expect(resposta.body.data).to.have.length.greaterThan(0)
        })
    })

    //CT02
    it('Cadastro 201', () => {
        const gerar11Digitos = () => Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join('');

        cy.request({
            method: 'POST',
            url: 'https://cadastroprova.netlify.app/api/clientes',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: {
                    "tipo": "pessoa_fisica",
                    "nome": "Ulf Gunnar",
                    "documento": gerar11Digitos,
                    "email": "ulf" + Date.now() +"@estudante.sesisenai.org",
                    "telefone": "(47) 9971-5484",
                    "celular": "(47) 99715-4849",
                    "cep": "",
                    "logradouro": "",
                    "numero_endereco": "",
                    "complemento": "",
                    "bairro": "",
                    "cidade": "",
                    "estado": "",
                    "status": "ativo"
            }
        }).then((resposta) => {
            expect(resposta.status).to.eq(201)
            expect(resposta.headers.location).to.not.be.empty
            expect(resposta.body.data.id).to.not.be.empty
            expect(resposta.body.data.codigo.startsWith('CLI')).to.be.true

            ID_cliente = resposta.body.data.id
        })
    })

    //CT03
    it ('Visualizar cliente 200', () => {
        cy.request({
            method: 'GET',
            url: `https://cadastroprova.netlify.app/api/clientes/${ID_cliente}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((resposta) => {
            expect(resposta.status).to.eq(200)
            expect(resposta.body.data.id).to.eq(ID_cliente)
            expect(resposta.body.data.nome).to.eq("Ulf Gunnar")
        })
    })

    //CT04
    it('Editar 200', () => {
        cy.request({    
            method: 'PUT',
            url: `https://cadastroprova.netlify.app/api/configuracoes`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: {
                "nome_unidade": "cd Escola",
                "codigo_unidade": "CD-ESCOLA",
                "fuso_horario": "America/Sao_Paulo",
                "alerta_estoque": false,
                "alerta_expedicao": true,
                "alerta_fornecedores": false
              }
        }).then((resposta) => {
            expect(resposta.status).to.eq(200)
            expect(resposta.body.data.nome_unidade).to.eq("cd Escola")
            expect(resposta.body.data.alerta_estoque).to.be.false
        })
    })

    //CT05
    it('Deletar 204', () => {
        cy.request({
            method: 'DELETE',
            url: `https://cadastroprova.netlify.app/api/clientes/${ID_cliente}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((resposta) => {
            expect(resposta.status).to.eq(204)
            expect(resposta.body).to.be.empty
        })
    })
    
    //CT06
    it('Visualizar 404', () => {
        cy.request({
            method: 'GET',
            url: `https://cadastroprova.netlify.app/api/clientes/${ID_cliente}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            failOnStatusCode: false
        }).then((resposta) => {
            expect(resposta.status).to.eq(404)
            expect(resposta.body.error.code).to.eq("not_found")
        })
    })

    //CT07
    it('Visualizar 401', () => {
        cy.request({
            method: 'GET',
            url: 'https://cadastroprova.netlify.app/api/clientes',
            failOnStatusCode: false
        }).then((resposta) => {
            expect(resposta.status).to.eq(401)
            expect(resposta.body.error.code).to.eq("unauthorized")
        })
    })

    //CT08
    it('Cadastrar 422', () => {
        cy.request({
            method: "POST",
            url: 'https://cadastroprova.netlify.app/api/clientes',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            failOnStatusCode: false,
            body: {
                "tipo": "pessoa_fisica",
                "nome": "Ulf Gunnar",
                "documento": "12345678900",
                "email": "ulf" + Date.now() + "sim",
                "telefone": "(47) 9971-5484",
                "celular": "(47) 99715-4849",
                "cep": "",
                "logradouro": "",
                "numero_endereco": "",
                "complemento": "",
                "bairro": "",
                "cidade": "",
                "estado": "",
                "status": "ativo"
            }
        }).then((resposta) => {
            expect(resposta.status).to.eq(422)
            expect(resposta.body.error.code).to.eq('validation_error')
        })
    })
})