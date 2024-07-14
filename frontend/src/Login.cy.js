import React from 'react'
import Login from './Login'

describe('<Login />', () => {
  it('should show error when the credentials are invalid', () => {
    // 👇 Mount selected component
    cy.mount(<Login />)

    // 👇 Stub the backend response
    cy.intercept('POST', '/login', {
      statusCode: 401
    });
    // 👇 Click on the submit button
    cy.get('#submit').click();

    // 👇 Verify the message
    cy.contains('Unauthorized. Please check your credentials.');
  })

  it('should fill the form and show welcome message', () => {
    // Mount the Login component
    cy.mount(<Login />);
  
    cy.intercept('POST', '/login', {
      statusCode: 200
    });

    // Interact with the components
    cy.get('#email').type('student@example.com');
    cy.get('#password').type('password');
    cy.get('#submit').click();
  
    // Validate the DOM structure
    cy.contains('Welcome!').should('be.visible');
  });



    // cy.get('#email').type('submit@mail.test');
    // cy.get('#password').type('invalid');

    // export const FilledForm: Story = {
    //   play: async ({ canvasElement }) => {
    //     const canvas = within(canvasElement);
    
    //     // 👇 Interact with the components.
    //     await userEvent.type(canvas.getByTestId('email'), 'student@example.com');
    //     await userEvent.type(canvas.getByTestId('password'), 'password');
    //     await userEvent.click(canvas.getByRole('button'));
    
    //     // 👇 Validate the DOM structure.
    //     await expect(canvas.getByText('Welcome!')).toBeInTheDocument();
    //   },
    // };
})