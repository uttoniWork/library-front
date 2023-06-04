describe('Book Create Test', () => {
    it('create successful', () => {
        cy.visit('../../index.html');
        cy.viewport(1280,1080);
        cy.get('#search').click();
        cy.get('#cadButton').click();
        cy.get('#content').should('be.visible');

        cy.get('#book_name');
        cy.get('#book_name').type('teste');

        cy.get('#autor');
        cy.get('#autor').type('teste');

        cy.get('#image');
        cy.get('#image').type('teste');

        cy.get('#genero');
        cy.get('#genero').type('teste');

        cy.get('#editora');
        cy.get('#editora').type('teste');

        cy.get('#mes');
        cy.get('#mes').type('teste');

        cy.get('#bookCreate').click();

        cy.on('windows:alert', (message)=>{
            expect(message).to.equal('Usuario cadastrado!')
        });

        cy.get('#content').should('not.visible');
      });


      it('missing field', () => {
        cy.visit('../../index.html');
        cy.viewport(1280,1080);
        cy.get('#search').click();
        cy.get('#cadButton').click();
        cy.get('#content').should('be.visible');

        cy.get('#book_name');
        cy.get('#book_name').type('teste');
        cy.get('#book_name').clear();

        cy.get('#autor');
        cy.get('#autor').type('teste');

        cy.get('#image');
        cy.get('#image').type('teste');

        cy.get('#genero');
        cy.get('#genero').type('teste');

        cy.get('#editora');
        cy.get('#editora').type('teste');

        cy.get('#mes');
        cy.get('#mes').type('teste');

        cy.get('#bookCreate').click();

        cy.on('windows:alert', (message)=>{
            expect(message).to.equal('Preencha todos os campos')
        });
      });



})