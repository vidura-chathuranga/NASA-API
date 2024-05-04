import { useQuery } from "@tanstack/react-query";
import Card from "../components/Card";
import Loader from "../components/Loader";
import axios from "axios";
import { API_KEY, DEFAULT_ROVER_URL } from "../utils/constants";
import { useState } from "react";

const RoverPage = () => {
  const [roverType, setRoverType] = useState("all");

  const { error, isLoading, data } = useQuery({
    queryKey: ["marsData", roverType],
    queryFn: () =>
      axios
        .get(
          roverType === "all"
            ? DEFAULT_ROVER_URL
            : `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${roverType}&page=1&api_key=${API_KEY}`
        )
        .then((res) => res.data.photos),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.log(`Mars Error: ${error.message}`);
  }

  if (!Array.isArray(data)) {
    return <p>Data not Available</p>;
  }
  const items = data?.map((item, index) => {
    return (
      <Card
        image={item.img_src}
        roverName={item.camera.full_name}
        earthDate={item.earth_date}
        key={index}
      />
    );
  });

  const handleChange = (e) => {
    setRoverType(e.target.value);
  };

  return (
    <>
      <div className="sm:w-[60%] md:w-[40%] drop-shadow-lg mx-auto sticky top-[96px] py-2 rounded-3xl overflow-hidden mb-6 flex flex-wrap justify-center items-center bg-[#e2e5ff] text-black">
        <span>
          <b>Filter by Camera: &nbsp;</b>
        </span>
        <select
          className=" border-[2px] rounded-2xl px-2 border-[#957ffd] w-auto"
          onChange={handleChange}
          value={roverType}
        >
          <option value={"all"}>All Rovers photos</option>
          <option value={"FHAZ"}>Front Hazard Avoidance Camera</option>
          <option value={"RHAZ"}>Rear Hazard Avoidance Camera</option>
          <option value={"MAST"}>Mast Camera</option>
          <option value={"MAHLI"}>Mars Hand Lens Imager</option>
          <option value={"MARDI"}>Mars Descent Imager</option>
        </select>
      </div>
      <div className="">
        {/* <div>
        <h1 className="text-white text-center text-[100px] md:text-[200px]  font-bold backdrop-blur-[1px]">
          Mars Rover Photos
        </h1>
      </div> */}
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
          {items}
        </div>
      </div>
    </>
  );
};

export default RoverPage;
