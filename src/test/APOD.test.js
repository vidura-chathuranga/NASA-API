// APOD.test.js
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import axios from 'axios'; // Import axios for mocking
import APOD from '../pages/APOD';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('APOD Component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders loader while data is loading', async () => {
    // Mocking useQuery hook to return loading state
    useQuery.mockReturnValue({ isLoading: true });

    render(<APOD />);

    const loader = screen.getByTestId('loader'); // Finding loader by testId
    expect(loader).toBeInTheDocument();
  });

  test('renders data when successfully loaded', async () => {
    // Mocking useQuery hook to return data
    useQuery.mockReturnValue({ data: { title: 'Test Title', url: 'test-url', explanation: 'Test Explanation' } });

    render(<APOD />);

    const title = screen.getByText('Test Title');
    const explanation = screen.getByText('Test Explanation');

    expect(title).toBeInTheDocument();
    expect(explanation).toBeInTheDocument();
  });
});
