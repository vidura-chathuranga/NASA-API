import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../components/Loader";
import { API_KEY } from "../utils/constants";

const APOD = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["apod"],
    queryFn: () => {
      return axios
        .get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
        .then((res) => res.data);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    <p data-testid="apod-error">{`Mars Error: ${error.message}`}</p>
  }

  return (
    <div className="mt-3 flex justify-center items-center flex-col ">
      <h1 className="mb-3 text-[32px] sticky top-[96px] bg-black w-full text-center p-4">
        <b>{data?.title}</b>
      </h1>
      <div
        className={`my-auto w-full h-[600px]`}
        style={{
          background: `url(${data?.url}) no-repeat center center`,
          borderRadius: "25px",
        }}
      ></div>
      <div className="mt-5 text-justify w-[80%] bg-gray-900 p-5 rounded-3xl shadow-xl mb-5 cursor-pointer hover:drop-shadow-navbar transition-all duration-[0.5s]">
        {data?.explanation}
      </div>
    </div>
  );
};

export default APOD;
