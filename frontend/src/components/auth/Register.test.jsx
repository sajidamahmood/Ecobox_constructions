import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Axios from 'axios';
import Register from './Register';

jest.mock('axios');

describe('Register Component', () => {
  beforeEach(() => {
    render(<Register />);
  });

  it('renders the Register form correctly', () => {
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('shows an error if the username is less than 3 characters', async () => {
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jo' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Username must be at least 3 characters long.')).toBeInTheDocument();
    });
  });

  it('shows an error if the password is less than 8 characters', async () => {
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Short1!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters long.')).toBeInTheDocument();
    });
  });

  it('shows an error if the password does not contain an uppercase letter', async () => {
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password1!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Password must contain at least one uppercase letter.')).toBeInTheDocument();
    });
  });

  it('shows an error if the password does not contain a number', async () => {
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Password must contain at least one number.')).toBeInTheDocument();
    });
  });

  it('shows an error if the password does not contain a special character', async () => {
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password1' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Password must contain at least one special character.')).toBeInTheDocument();
    });
  });

  it('shows an error if the email format is invalid', async () => {
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email format.')).toBeInTheDocument();
    }, { timeout: 5000 });
    
  });

  it('displays a success message upon successful registration', async () => {
    Axios.post.mockResolvedValueOnce({ data: { message: 'Registration successful!' } });

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText((content) => content.includes("Registration successful!"))).toBeInTheDocument();
    });
  });

  it('displays an error message upon failed registration', async () => {
    Axios.post.mockRejectedValueOnce(new Error('Registration failed. Please try again.'));

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Registration failed. Please try again.')).toBeInTheDocument();
    }, { timeout: 5000 });
    
  });
});
