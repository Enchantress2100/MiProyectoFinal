const { idleTimeoutMillis } = require("pg/lib/defaults");

describe("MiProyectoFinal", () => {
  it("frontpage can be opened", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Asistencia Estudiantes");
  });
  it("Click test Inicio de sesión Profesor", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Acceso Profesores").click();
  });
  it("Click test Input", () => {
    cy.visit("http://localhost:3000/loginP");
    cy.get('input[name="email"]').type("mconsuelo.gomezt@gmail.com");
  });
  it("Click test Input Email", () => {
    cy.visit("http://localhost:3000/loginP");
      cy.get('input[name="password"]').type("profesoraconsuelo2100");
      cy.get("button").click({ force: true });
  });  
});
