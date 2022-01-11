import signup from '../pages/SignupPage'
import signUpFactory from '../factories/SignUpFactory'
import SignupPage from '../pages/SignupPage'

describe('Cadastro', function(){

    beforeEach(()=>{
        cy.fixture('deliver').then((d)=>{
            this.deliver = d
        })
    })


    it('Usuario deve se tornar um entregador', ()=>{
    
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        var deliver =  signUpFactory.deliver()

        signup.go()
        signup.fillform(deliver)
        signup.submit()
        signup.modalContentShouldBe(expectedMessage)
    })

    it('CPF Incorreto', ()=>{

        var deliver =  signUpFactory.deliver()

        deliver.cpf = "000000000AA"

        signup.go()
        signup.fillform(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
        


    })

    it('Email Incorreto', ()=>{
        var deliver =  signUpFactory.deliver()

        deliver.email = "douglas.douglas"

        signup.go()
        signup.fillform(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    
    })

    context('Required fields', function(){
        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function(){
            SignupPage.go()
            SignupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })
    })

    it('Required fields', ()=>{
        SignupPage.go()
        SignupPage.submit()

        SignupPage.alertMessageShouldBe('É necessário informar o nome')
        SignupPage.alertMessageShouldBe('É necessário informar o CPF')
        SignupPage.alertMessageShouldBe('É necessário informar o email')
        SignupPage.alertMessageShouldBe('É necessário informar o CEP')
        SignupPage.alertMessageShouldBe('É necessário informar o número do endereço')
        SignupPage.alertMessageShouldBe('Selecione o método de entrega')
        SignupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    
    })
})