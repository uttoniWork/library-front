describe('Search Test', () => {
    it('seachr successful', () => {
        cy.visit('../../index.html');
        cy.viewport(1280,1080);
        cy.get('#search').click();
        cy.get('#text-search').type('jurassick park')
        cy.get('#Search').click();
        cy.get('#berserkerDivList').should('be.visible');
        cy.get('#berserkerDivList').click();
        cy.get('#popupListId').should('be.visible');
        cy.get('#popupListId').click();
        cy.get('#popupListId').should('not.visible');
      });


      it('empty filed seachr', () => {
        cy.visit('../../index.html');
        cy.viewport(1280,1080);
        cy.get('#search').click();
        cy.get('#text-search').type('jurassick park')
        cy.get('#text-search').clear();
        cy.on('windows:alert', (message)=>{
          expect(message).to.equal('Preencha o campo de pesquisa.')
        })
      });


})