import "cypress-real-events/support";

describe("Job Posts Page", () => {
  it("Search for laval", () => {
    //Search for location (laval)
    cy.visit("/JobPosts");
    cy.findByRole("textbox", { name: /location/i }).type("laval");
    cy.findByRole("button", { name: /find the job/i }).click();
    //laval case insensitive
    cy.get(".location-test").should("contain", "Laval", { matchCase: false });
  });
});

describe("Signup and Login", () => {
  let randomEmail = Math.random().toString(36).substring(2, 15) + "@gmail.com";
  describe("Signup Page", () => {
    it("Signup different pass", () => {
      //Signup
      cy.visit("/signup");

      cy.get('[type="email"]').type(randomEmail, { force: true });
      cy.get('[placeholder="Password"]').type("wrongpass", { force: true });
      cy.get('[placeholder="Confirm Password"]').type("wrongpass1", {
        force: true,
      });
      cy.get("#remember-checkbox").check({ force: true });
      cy.get(".login-btn").click({ force: true });
      cy.get(".fade").should("be.visible");
      cy.get(".fade").should("contain", "Passwords do not match");
    });

    it("Signup wrong pass", () => {
      //Signup
      cy.visit("/signup");

      cy.get('[type="email"]').type(randomEmail, { force: true });
      cy.get('[placeholder="Password"]').type("wrongpass", { force: true });
      cy.get('[placeholder="Confirm Password"]').type("wrongpass", {
        force: true,
      });
      cy.get("#remember-checkbox").check({ force: true });
      cy.get(".login-btn").click({ force: true });
      cy.get(".fade").should("be.visible");
      cy.get(".fade").should(
        "contain",
        "Password must be at least 8 characters and contain a number."
      );
    });

    it("Proper Signup", () => {
      //Signup
      cy.visit("/signup");

      cy.get('[type="email"]').type(randomEmail, { force: true });
      cy.get('[placeholder="Password"]').type("correctpass1234", {
        force: true,
      });
      cy.get('[placeholder="Confirm Password"]').type("correctpass1234", {
        force: true,
      });
      cy.get("#remember-checkbox").check({ force: true });
      cy.get(".login-btn").click({ force: true });

      //Check if redirected to login page
      cy.url().should("include", "/login");
      cy.get(".fade").should("be.visible");
      cy.get(".fade").should(
        "contain",
        "Account created successfully. Please login."
      );
    });
  });
  describe("Login Page", () => {
    it("Login wrong pass", () => {
      //Login
      cy.visit("/login");

      cy.get('[type="email"]').type(randomEmail, { force: true });
      cy.get('[placeholder="Password"]').type("wrongpass1234", { force: true });
      cy.get(".login-btn").click({ force: true });
      cy.get(".fade").should("be.visible");
      cy.get(".fade").should("contain", "Wrong Password. Please try again.");
    });

    it("Correct Login and redirect", () => {
      //Login
      cy.LoginWithPageSession(randomEmail);
    });
  });

  describe("Web Page Functions", () => {
    it("Update Profile", () => {
      //Login
      cy.LoginWithPageSession(randomEmail);
      cy.visit("/updateprofile");

      //upload image
      cy.get(".file-upload").selectFile("./src/Images/test.png", {
        force: true,
      });

      //check if cropper is visible
      cy.get("#popover-positioned-right").should("be.visible");
      cy.get(".close-btn").should("be.visible");
      cy.get(".close-btn").click({ force: true });

      //Fill in form
      cy.get("#firstName").type("name", { force: true });
      cy.get("#lastName").type("lastname", { force: true });
      cy.get("#city").type("Montreal", { force: true });
      cy.get("#resume").selectFile("./src/Images/Andy_Chhuon_CV.pdf", {
        force: true,
      });
      cy.get("#state").type("Quebec", { force: true });
      cy.get("#jobPosition").type("Software Engineer", { force: true });
      cy.get("#workexp").type("5 years of experience as a software engineer", {
        force: true,
      });
      cy.get("#education").type("Second year student at Concordia", {
        force: true,
      });
      cy.get("#aboutme").type("Software Engineer", { force: true });
      cy.findByRole("button", { name: /update profile/i }).click({
        force: true,
      });

      //check if updates were correctly made
      cy.get(".fade").should("be.visible");
      cy.get(".fade").should("contain", "Profile updated successfully.");

      //Reload page
      cy.reload();

      //check if resume was uploaded
      cy.get(".resume-link")
        .should("have.attr", "href")
        .then((href) => {
          cy.request(href);
        });

      //check if profile image was uploaded
      cy.get(".profile-img").should("have.attr", "src");
    });
  });
});
