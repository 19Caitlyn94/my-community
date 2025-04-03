# Cypress Documentation for MyCommunity Project

## Overview

Cypress is used for end-to-end and component testing of the MyCommunity application. It helps ensure that the ui and user-journeys function correctly.

## Testing folder

```
frontend/cypress/
├── e2e/                  # End-to-end test specs
│   ├── anon/             # Tests for anonymous users
│   ├── member/           # Tests for community members
│   └── admin/            # Tests for admin functionality
├── support/              # Support files
│   ├── commands.ts       # Custom commands
│   └── e2e.ts            # Configuration for tests
└── fixtures/             # Test data
```

## Key Features Used

1. **Data Attributes**: All tests use `data-testid` selectors for reliable element targeting:

   ```typescript
   cy.get('[data-testid="login-button"]').click();
   ```

2. **Viewport Testing**: Tests responsive layouts across devices:

   ```typescript
   cy.viewport("iphone-6");
   cy.viewport("ipad-2");
   cy.viewport("macbook-13");
   ```

3. **Navigation Testing**: Tests page transitions and URL assertions:
   ```typescript
   cy.url().should("include", "/register");
   ```

## When to Use Different Testing Approaches

### End-to-End Testing

**Best for:**

- Testing complete user flows (registration, authentication, posting)
- Validating integrations between multiple components or services
- Ensuring critical business processes work from user perspective
- Final verification before deployment

**Examples:**

- User registration and login flows
- Community creation and joining processes
- Posting and interaction across pages

### Component Testing

**Best for:**

- Testing UI components in isolation
- Faster development feedback cycles
- Verifying component behavior with different props/states
- Ensuring accessibility standards

**Examples:**

- Form validation behavior
- Modal dialogs and popups
- Interactive UI elements (dropdowns, toggles)
- States of dynamic components (loading, error, success)

Component tests provide speed and precision, while E2E tests ensure everything works together as expected.

## Running Tests

```bash
# Run all tests
npm run cypress:run

# Open Cypress GUI
npm run cypress:open
```

## Best Practices

1. Use `data-testid` attributes instead of CSS selectors or text content
2. Keep tests independent (no dependencies between tests)
3. Test UI components in isolation when possible
4. Use Cypress fixtures for test data

[Cypress Documentation Reference](https://docs.cypress.io/)

## Test Environment Configuration

The project uses a `cypress.env.ts` file to store consistent test data that is loaded into the database before tests run. This ensures tests can run in any environment.

Before running Cypress tests, the database needs to contain these test users and communities. And the structure of the data should be (_example_):

```json
{
  "host": "localhost:3000/",
  "api_url": "http://localhost:8000/api/",
  "user_member": {
    "id": "87",
    "email": "member@testcypress.io",
    "password": "SecurePass456!",
    "communities": [
      {
        "id": "12",
        "name": "Evergreen Community",
        "is_admin": false
      }
    ],
    "first_name": "Taylor",
    "last_name": "Rivera"
  },
  "user_admin": {
    "id": "93",
    "email": "admin@testcypress.io",
    "password": "AdminSecure789!",
    "communities": [
      {
        "id": "12",
        "name": "Evergreen Community",
        "is_admin": true
      }
    ],
    "first_name": "Jordan",
    "last_name": "Chen"
  }
}
```
