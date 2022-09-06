const user = {
  first_name: "Shadman",
  last_name: "Kolahzari",
  email: "shadman@gmail.com",
  password: "123456789",
};
const invalidUser = {
  first_name: "John",
  last_name: "Anderson",
  email: "JohnAnderson@gmail.com",
  password: "John@1234",
};

describe("test to check the functionality of the project", () => {
  it("first try to login with invalid user and ensure the page shows an error message", () => {
    cy.visit("/");
    // fill login email field
    cy.get("#login-email")
      .type(invalidUser.email)
      .should("have.value", invalidUser.email);
    // fill login password field
    cy.get("#login-password")
      .type(invalidUser.password)
      .should("have.value", invalidUser.password);
    // click on login submit button
    cy.get("#login-submit").click();
    // find error toast
    cy.get("#toast").find(".Toastify__toast--error");
  });

  it("then click on signup link and ensure the page url is changed to /auth/signup", () => {
    // click on signup tab button
    cy.get("#signup-tab-btn").click();
    // check that page url is changed to signup path
    cy.url().should("eq", "http://localhost:3000/auth/signup");
  });

  it("then fill the signup form and click signup button", () => {
    // fill signup first_name input
    cy.get("#signup-first-name")
      .type(user.first_name)
      .should("have.value", user.first_name);
    // fill signup last_name input
    cy.get("#signup-last-name")
      .type(user.last_name)
      .should("have.value", user.last_name);
    // fill signup email input
    cy.get("#signup-email").type(user.email).should("have.value", user.email);
    // fill signup password input
    cy.get("#signup-password")
      .type(user.password)
      .should("have.value", user.password);
    // click on login submit button
    cy.get("#signup-submit").click();
    // find success toast
    cy.get("#toast").find(".Toastify__toast--success");
  });

  it("then click login and ensure page url is changed to /auth/login", () => {
    // click on signup tab button
    cy.get("#login-tab-btn").click();
    // check that page url is changed to signup path
    cy.url().should("eq", "http://localhost:3000/auth/login");
  });

  it("then click login button and ensure page is changed to /panel and user email is written in the page", () => {
    // fill login email field
    cy.get("#login-email").type(user.email).should("have.value", user.email);

    // fill login password field
    cy.get("#login-password")
      .type(user.password)
      .should("have.value", user.password);

    // click on login submit button
    cy.get("#login-submit").click();

    // check that page url is changed to panel path
    cy.url().should("eq", "http://localhost:3000/panel");

    // check that user email is written in the page
    cy.get("h6").should("have.text", `Hello ${user.email}`);
  });

  it("then click logout and ensure the url is changed to /auth/login", () => {
    // click on logout button
    cy.get("#panel-logout-button").click();

    // check that page url is changed to login path
    cy.url().should("eq", "http://localhost:3000/auth/login");
  });
});
