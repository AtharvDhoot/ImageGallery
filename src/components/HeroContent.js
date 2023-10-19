import React from "react";

const HeroContent = () => {
  return (
    <div className="flex justify-center w-full h-[300px] overflow-hidden relative">
      <img
        src="/hero_background.jpeg"
        alt="hero background"
        className="w-full h-full object-cover"
      />

      <div className="flex-col justify-center px-10 md:px-0 absolute top-1/4">
        <div className="flex flex-col">
          <h1 className="text-white text-xl font-bold md:hidden text-center">
            Download High Quality
          </h1>
          <h1 className="text-white text-xl font-bold md:hidden text-center">
            Images by creators
          </h1>
          <h1 className="text-white text-xl md:text-3xl font-bold md:block hidden">
            Download High Quality Images by creators
          </h1>
        </div>

        <p className="text-center text-white mt-2 text-sm md:text-base">
          Over 2.4 million+ stock Images by our talented community
        </p>
        <input
          type="text"
          placeholder="Search high resolution Images, categories, wallpapers"
          className="input input-bordered w-full mt-2 bg-white text-black input-sm md:input-md"
        />
      </div>
    </div>
  );
};

export default HeroContent;
