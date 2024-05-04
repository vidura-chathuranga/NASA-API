const ContentCard = ({ image, description }) => {
  return (
    <div
      className=" p-[20px] w-[300px] h-[500px] bg-white overflow-hidden rounded-2xl cursor-pointer transition-all duration-[0.3s] hover:drop-shadow-search relative hover:-translate-y-2"
      data-testid="content-card"
    >
      {/* image */}
      <div
        className="h-[50%] rounded-2xl"
        style={{
          background: image
            ? `url(${image}) no-repeat center center`
            : `url(${"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="text-black text-sm mt-2 flex-grow overflow-hidden  h-full">
        <p className="text-ellipsis text-justify">{description}</p>
      </div>
    </div>
  );
};

export default ContentCard;
