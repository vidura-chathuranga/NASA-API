import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import RoverPage from '../pages/RoverPage';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('RoverPage Component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders loader while data is loading', async () => {
    // Mocking useQuery hook to return loading state
    useQuery.mockReturnValue({ isLoading: true });

    render(<RoverPage />);

    const loader = screen.getByTestId('loader'); // Assuming your Loader component has a testId
    expect(loader).toBeInTheDocument();
  });

  test('renders "Data not Available" if data is not an array', async () => {
    // Mocking useQuery hook to return data which is not an array
    useQuery.mockReturnValue({ data: null });

    render(<RoverPage />);

    const notAvailableMessage = screen.getByText('Data not Available');
    expect(notAvailableMessage).toBeInTheDocument();
  });

  test('renders cards when data is successfully loaded', async () => {
    // Mocking useQuery hook to return data
    const mockData = [
      {
        img_src: 'test-image-1',
        camera: { full_name: 'Test Camera 1' },
        earth_date: '2024-05-05',
      },
      {
        img_src: 'test-image-2',
        camera: { full_name: 'Test Camera 2' },
        earth_date: '2024-05-06',
      },
    ];
    useQuery.mockReturnValue({ data: mockData });

    render(<RoverPage />);

    // Wait for cards to be rendered
    await waitFor(() => {
      const cards = screen.getAllByTestId('card'); // Assuming your Card component has a testId
      expect(cards).toHaveLength(mockData.length);
    });
  });
});
