import React from "react";
import LandingPage from "./LandingPage";

describe("<LandingPage />", () => {
  beforeEach(() => {
    cy.mount(<LandingPage />);
  });

  it("displays proper welcome content", () => {
    // Check welcome text using data-testid
    cy.get('[data-testid="welcome-text"]').should("be.visible");
    cy.get('[data-testid="app-title"]')
      .should("be.visible")
      .and("have.text", "MyCommunity");
    cy.get('[data-testid="app-description"]')
      .should("be.visible")
      .and("contain", "a platform where individuals");

    // Check main action buttons using data-testid
    cy.get('[data-testid="register-button"]').should("be.visible");
    cy.get('[data-testid="login-button"]').should("be.visible");
  });

  it("has proper visual layout on different devices", () => {
    // Test on mobile viewport
    cy.viewport("iphone-6");
    cy.get('[data-testid="app-title"]').should("be.visible");
    cy.get('[data-testid="register-button"]').should("be.visible");

    // Test on tablet viewport
    cy.viewport("ipad-2");
    cy.get('[data-testid="app-title"]').should("be.visible");
    cy.get('[data-testid="register-button"]').should("be.visible");

    // Test on desktop viewport
    cy.viewport("macbook-13");
    cy.get('[data-testid="app-title"]').should("be.visible");
    cy.get('[data-testid="register-button"]').should("be.visible");
  });
});
