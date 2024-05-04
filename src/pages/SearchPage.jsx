import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import NoContent from "../components/NoContent";
import ContentCard from "../components/ContentCard";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(0);

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => {
      return axios
        .get(`https://images-api.nasa.gov/search?q=${searchQuery}`)
        .then((res) => res.data);
    },
    enabled: false,
  });

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear previous timeout
    clearTimeout(typingTimeout);

    // Set a new timeout to fetch data after 500 milliseconds
    setTypingTimeout(
      setTimeout(() => {
        // Trigger data fetching
        refetch();
      }, 500)
    );
  };
  return (
    <div>
      <div className="flex justify-center flex-col mb-1 items-center mt-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search anything...."
          className="rounded-lg py-2 px-[10px] w-[20%] text-black relative outline-none border-[5px] border-purple-200 focus:drop-shadow-search transition-all duration-[0.5s]"
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : !data || data?.length === 0 ? (
        <NoContent />
      ) : (
        <div className="flex justify-center items-center ">
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.collection?.items?.map((item, index) => {
              if (item.links === undefined || item.data === undefined) {
                return;
              }
              
              return (
                <ContentCard
                  image={item?.links[0]?.href}
                  description={item?.data[0]?.description}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
