import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {
  test('renders login form and shows error messages in red', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check that the email input, password input, and login button are present
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate entering an invalid email and a short password
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(loginButton);

    // Check if the error message is shown in red color
    const errorMessage = screen.getByText(/invalid email format/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveStyle('color: red');  // Assuming you use inline styles or CSS for red color

    // Check if another error (password length) appears
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });  // Fix email
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(loginButton);

    const passwordErrorMessage = screen.getByText(/password must be at least 8 characters long/i);
    expect(passwordErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toHaveStyle('color: red');
  });
});
