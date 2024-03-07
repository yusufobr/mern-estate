import { useState } from "react";
import Img1 from "../assets/12.jpg";

const LookingFor = () => {
  const [hoverdDiv, setHoverdDiv] = useState<number>(0);
  const [showedDiv, setShowedDiv] = useState<number>(0);

  const handleMouseEnter = (x: number) => {
    setHoverdDiv(x);
  };

  return (
    <div className="flex flex-col gap-10 px-4 md:p-8 py-20 font-semibold w-full overflow-hidden">
      <span className="font-bold text-2xl">(03)What You Looking For</span>

      {/* Family house */}
      <div className="flex flex-col gap-4 cursor-pointer" onClick={()=> setShowedDiv(0)}>
        <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between w-full justify-start md:items-center">
          <span className="uppercase font-semibold text-4xl md:text-[80px]">
            family house
          </span>
          <div className="flex md:flex-col gap-2 items-center md:items-end font-bold">
            <span>3 out of 50+ Unit</span>
            <button className="p-1 md:p-2 px-3 md:px-6 border-2 border-black rounded-full hover:bg-black hover:text-white">
              Discover More
            </button>
          </div>
        </div>
        {showedDiv === 0 && (
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="relative flex flex-col gap-2"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <img src={Img1} alt="" className="h-full w-full object-cover" />
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-semibold">estate title</span>
                  <div className="flex flex-col">
                    <span>For Sale / Peacefull Ville, United State</span>
                    <span>$400,000</span>
                  </div>
                </div>
                {hoverdDiv !== index && (
                  <div className="absolute inset-0 bg-white opacity-60 hover:opacity-0 transition-opacity"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Townhouses */}
      <div className="flex flex-col border-y border-gray-200 cursor-pointer" onClick={()=> setShowedDiv(1)}>
        <div className="flex justify-between items-center ">
          <span className="uppercase font-semibold text-[80px]">
            Townhouses
          </span>
          <span>30+ Units Available</span>
        </div>
        {showedDiv === 1 && (
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8 pb-8">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="relative flex flex-col gap-2"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <img src={Img1} alt="" className="h-full w-full object-cover" />
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-semibold">estate title</span>
                  <div className="flex flex-col">
                    <span>For Sale / Peacefull Ville, United State</span>
                    <span>$400,000</span>
                  </div>
                </div>
                {hoverdDiv !== index && (
                  <div className="absolute inset-0 bg-white opacity-60 hover:opacity-0 transition-opacity"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Appartements */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center cursor-pointer" onClick={()=> setShowedDiv(2)}>
          <span className="uppercase font-semibold text-[80px]">
            appartements
          </span>
          <span>60+ Units Available</span>
        </div>
        {showedDiv === 2 && (
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="relative flex flex-col gap-2"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <img src={Img1} alt="" className="h-full w-full object-cover" />
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-semibold">estate title</span>
                  <div className="flex flex-col">
                    <span>For Sale / Peacefull Ville, United State</span>
                    <span>$400,000</span>
                  </div>
                </div>
                {hoverdDiv !== index && (
                  <div className="absolute inset-0 bg-white opacity-60 hover:opacity-0 transition-opacity"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <div className="w-full h-[1px] bg-black opacity-20"></div> */}
    </div>
  );
};

export default LookingFor;
