import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import SearchPage from "../pages/SearchPage";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("SearchPage Component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders loader while data is loading", async () => {
    // Mocking useQuery hook to return loading state
    useQuery.mockReturnValue({ isLoading: true });

    render(<SearchPage />);

    const loader = screen.getByTestId("loader"); // Assuming your Loader component has a testId
    expect(loader).toBeInTheDocument();
  });

  test('renders "No Content" component if data is empty', async () => {
    // Mocking useQuery hook to return empty data
    useQuery.mockReturnValue({ data: [], isLoading: false });

    render(<SearchPage />);

    const noContent = screen.getByTestId("no-content"); // Assuming your NoContent component has a testId
    expect(noContent).toBeInTheDocument();
  });

  test("renders content cards when data is successfully loaded", async () => {
    // Mocking useQuery hook to return data
    const mockData = {
      collection: {
        items: [
          {
            links: [{ href: "test-image-1" }],
            data: [{ description: "Test Description 1" }],
          },
          {
            links: [{ href: "test-image-2" }],
            data: [{ description: "Test Description 2" }],
          },
        ],
      },
    };
    useQuery.mockReturnValue({ data: mockData, isLoading: false });

    render(<SearchPage />);

    // Wait for content cards to be rendered
    await waitFor(() => {
      const contentCards = screen.getAllByTestId("content-card"); // Assuming your ContentCard component has a testId
      expect(contentCards).toHaveLength(mockData.collection.items.length);
    });
  });

  test("fetches data when input value changes", async () => {
    // Mocking useQuery hook to return initial loading state and refetch function
    useQuery.mockReturnValue({ isLoading: true, refetch: jest.fn() });

    render(<SearchPage />);

    const input = screen.getByPlaceholderText("Search anything....");
    fireEvent.change(input, { target: { value: "test-query" } });

    // Wait for data to be fetched
    await waitFor(() => {
      expect(useQuery).toHaveBeenCalledWith({
        queryKey: ["search", "test-query"],
        queryFn: expect.any(Function),
        enabled: false,
      });
    });
  });
});
