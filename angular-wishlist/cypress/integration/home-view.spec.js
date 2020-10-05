describe('ventana principal', () => {
    it('Puede llenar el formulario', () => {
        cy.visit('http://localhost:4200/home');
        cy.get('form');
        cy.get('input[name="nombre"]').type("Paris").should("have.value", "Paris");
        cy.get('input[name="imagenUrl"]').type("UnaURLCualquiera").should("have.value", "UnaURLCualquiera");

        cy.get('input[type="submit"]').click();
        cy.get("form").submit();
    });
});