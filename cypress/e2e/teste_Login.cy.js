describe('Login test', () => {
    it('Sucess', () => {
      cy.visit('../../login_cadastro.html');
      cy.get('#signin').click();
      cy.get('#emailLogin').type('vini@gmail.com')
      cy.get('#passwordLogin').type('1234')
      cy.get('#buttonLogin').click()
      cy.url().then((url) => {
        cy.url().should('include','index.html')
      })
    });

      it('missing filed', () => {
        cy.visit('../../login_cadastro.html');
        cy.get('#signin').click();
        cy.get('#emailLogin').type('vini@gmail.com');
        cy.get('#emailLogin').clear();
        cy.get('#passwordLogin').type('1234');
        cy.get('#buttonLogin').click();

        cy.on('windows:alert', (message)=>{
          expect(message).to.equal('Preencha este campo')
        });
      });
})