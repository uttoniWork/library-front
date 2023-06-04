describe('Create test', () => {
  it('Sucess', () => {
    cy.visit('../../login_cadastro.html');
    cy.get('#userName').type('vini');
    cy.get('#email').type('vini@gmail.com');
    cy.get('#password').type('1234');
    cy.get('#buttonCreate').click();

    cy.on('windows:alert', (message)=>{
      expect(message).to.equal('Usuario cadastrado!')
    })
  });


  it('empty field', () => {
    cy.visit('../../login_cadastro.html');
    cy.get('#userName').type('vini');
    cy.get('#userName').clear();
    cy.get('#email').type('vini@gmail.com');
    cy.get('#password').type('1234');
    cy.get('#buttonCreate').click();

    cy.on('windows:alert', (message)=>{
      expect(message).to.equal('Preencha esse campo.')
    })
  });

  it('invalid email 1', () => {
    cy.visit('../../login_cadastro.html');
    cy.get('#userName').type('vini');
    cy.get('#email').type('vini');
    cy.get('#password').type('1234');
    cy.get('#buttonCreate').click();

    cy.on('windows:alert', (message)=>{
      expect(message).to.equal('Endereço de Email invalido')
    })
  });
})