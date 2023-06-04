describe('Index Test', () => {
    it('check the popups', () => {
        cy.visit('../../index.html');
        cy.get('#img').click();
        cy.get('.popup').should('be.visible');
        cy.get('.popup').click();
        cy.get('.popup').should('not.visible');
        cy.get('#img2').click();
        cy.get('.popup').should('be.visible');
        cy.get('.popup').click();
      });

      it('check the change of divs', () => {
        cy.visit('../../index.html');
        cy.viewport(1280,1080);
        cy.get('#search').click();
        cy.get('#search').should('be.visible');
        
        cy.get('#list').click();
        cy.get('#list').should('be.visible');
      });

});