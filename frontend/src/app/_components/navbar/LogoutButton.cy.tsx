import React from "react";
import LogoutButton from "@/app/_components/navbar/LogoutButton";

describe("<LogoutButton />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LogoutButton />);
  });
});
