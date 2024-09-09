import { useEffect, useState } from "react";
import axios from "axios";
import { formatMoneyNumber } from "../utils/functions";
import { useNavigate } from "react-router-dom";

const LookingFor = () => {
  const [hoverdDiv, setHoverdDiv] = useState<number>(0);
  const [showedDiv, setShowedDiv] = useState<number>(0);
  const [listingList, setListingList] = useState<any>([]);

  const navigate = useNavigate();

  const handleMouseEnter = (x: number) => {
    setHoverdDiv(x);
  };

  const arratIds = (showedDiv: number) => {
    if (showedDiv === 0) {
      return {
        listingList: [
          "656151898e66709bed87553b",
          "65615cb62963b3a712bf1055",
          "65615eca2963b3a712bf1060",
        ],
      };
    } else if (showedDiv === 1) {
      return {
        listingList: [
          "6569e521c99b9e1cb02ccb0f",
          "65693a592a32b80749d6fadc",
          "660a4c31644845a900f77df3",
        ],
      };
    } else {
      return {
        listingList: [
          "65dcc6b1c409d5722a5bd788",
          "656161d42963b3a712bf10aa",
          "660a421e7afe3d6184ef25bc",
        ],
      };
    }
  };

  const handleCategoryClick = async () => {
    const res = await axios.post(
      "/api/listing/getSpecificListings",
      arratIds(showedDiv)
    );
    setListingList(res.data);
  };

  useEffect(() => {
    handleCategoryClick();
  }, [showedDiv]);

  return (
    <div className="flex flex-col gap-10 px-4 md:p-8 py-20 font-semibold w-full overflow-hidden bg-white">
      <span className="font-bold text-2xl">(03)What You Looking For</span>

      {/* Family house */}
      <div
        className="flex flex-col gap-4 cursor-pointer"
        onClick={() => setShowedDiv(0)}
      >
        <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between w-full justify-start md:items-center">
          <span className="uppercase font-semibold text-4xl md:text-[80px]">
            family house
          </span>
          <div className="flex md:flex-col gap-2 items-center md:items-end font-bold">
            <span>3 out of 50+ Unit</span>
            <button
              onClick={() => navigate("/home")}
              className="p-1 md:p-2 px-3 md:px-6 border-2 border-black rounded-full hover:bg-black hover:text-white"
            >
              Discover More
            </button>
          </div>
        </div>
        {showedDiv === 0 && (
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
            {listingList.map((listing: any, index: number) => (
              <div
                key={listing.id}
                className="relative flex flex-col gap-2"
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={() => navigate(`/post/${listing.id}`)}
              >
                <img
                  src={listing.images[0]}
                  alt=""
                  className="h-full max-h-80 w-full object-cover"
                />
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-semibold">{listing.title}</span>
                  <div className="flex flex-col">
                    <span>{listing.adress}</span>
                    <span>${formatMoneyNumber(listing.price)}</span>
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
      <div
        className="flex flex-col border-y border-gray-200 cursor-pointer"
        onClick={() => setShowedDiv(1)}
      >
        <div className="flex justify-between items-center py-4 md:py-0 ">
          <span className="uppercase font-semibold text-4xl md:text-[80px]">
            Townhouses
          </span>
          <span
            onClick={() => navigate("/home")}
            className="text-right md:text-left"
          >
            30+ Units Available
          </span>
        </div>
        {showedDiv === 1 && (
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
            {listingList.map((listing: any, index: number) => (
              <div
                key={listing.id}
                className="relative flex flex-col gap-2 md:my-8"
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={() => navigate(`/post/${listing.id}`)}
              >
                <img
                  src={listing.images[0]}
                  alt=""
                  className="h-full max-h-80 w-full object-cover"
                />
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-semibold line-clamp-1">
                    {listing.title}
                  </span>
                  <div className="flex flex-col">
                    <span>{listing.adress}</span>
                    <span>${formatMoneyNumber(listing.price)}</span>
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
      <div className="flex flex-col" onClick={() => setShowedDiv(2)}>
        <div className="flex justify-between items-center cursor-pointer py-4 md:py-0">
          <span className="uppercase font-semibold text-4xl md:text-[80px]">
            appartements
          </span>
          <span
            onClick={() => navigate("/home")}
            className="text-right md:text-left"
          >
            60+ Units Available
          </span>
        </div>
        {showedDiv === 2 && (
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
            {listingList.map((listing: any, index: number) => (
              <div
                key={listing.id}
                className="relative flex flex-col gap-2"
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={() => navigate(`/post/${listing.id}`)}
              >
                <img
                  src={listing.images[0]}
                  alt=""
                  className="h-full max-h-80 w-full object-cover"
                />
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-semibold">{listing.title}</span>
                  <div className="flex flex-col">
                    <span>{listing.adress}</span>
                    <span>${formatMoneyNumber(listing.price)}</span>
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
