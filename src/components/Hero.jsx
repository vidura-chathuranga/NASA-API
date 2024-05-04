import backgroundVideo from "../assets/video3.mp4";

const Hero = () => {
  return (
    <section className="background-video">
      {/* <div className="background-image"> */}
      <video autoPlay muted loop>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className={"flex justify-center items-center h-full translate-y-[-5%]"}
      >
        <h1
          className={
            "text-white text-center text-[100px] md:text-[200px]  font-bold backdrop-blur-[1px]"
          }
        >
          NASA AP<span className={"text-[#957ffd]"}>I</span>
        </h1>
      </div>
      {/* </div> */}
    </section>
  );
};

export default Hero;
