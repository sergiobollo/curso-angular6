describe('ventana principal', () => {
    it('Puede llenar el formulario', () => {
        cy.visit('http://localhost:4200/login');
        cy.get('form');
        cy.get('input[name="username"]').type("user").should("have.value", "user");
        cy.get('input[name="password"]').type("admin123").should("have.value", "password");

        cy.get("form").submit();
    });
});