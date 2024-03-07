import { useEffect, useState } from "react";
import AnimationText from "./AnimationText";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Listing = {
  id: string;
  title: string;
  adress: string;
  price: number;
  images: string[];
  bedroom: number;
  bathroom: number;
  furnished: boolean;
};

const intialListing: Listing = {
  id: "6569e521c99b9e1cb02ccb0f",
  title: "Chambre Double Deluxe avec Balcon : L’Art du Confort",
  adress: "76 Rue Oued Moulouya, Rabat, Morocco",
  price: 1200,
  images: [
    "https://firebasestorage.googleapis.com/v0/b/mern-estate-727fa.appspot.com/o/170143874329000.jpg_0003_stayhere_casa_3-19.jpg_0001_stayhere_agdal_4-6-scaled.jpg?alt=media&token=f280547b-9ee0-4d3b-b6a7-2c3f75465242",
    "https://firebasestorage.googleapis.com/v0/b/mern-estate-727fa.appspot.com/o/170143874329100.jpg_0003_stayhere_casa_3-19.jpg_0000_stayhere_agdal_4-scaled.jpg?alt=media&token=34f02aa4-8dce-4410-9f95-1fea23d0825b",
  ],
  bedroom: 1,
  bathroom: 1,
  furnished: true,
};

const BestListing = () => {
  const [listing, setListing] = useState<Listing | null>(intialListing);
  const [imgToRotate, setImgToRotate] = useState(99);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    try {
      const res = await axios.get("api/listing/post/6569e521c99b9e1cb02ccb0f");
      setListing(res.data);
      console.log(res.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col px-4 md:px-8 py-12 text-2xl font-semibold overflow-hidden bg-gray-50">
      <span className="font-bold">(02)Best Listing</span>

      <div className="flex flex-col my-10 md:my-20 gap-2 md:gap-4 w-full">
        <div
          title={listing?.title}
          className="inline w-full text-8xl md:text-[120px] font-semibold uppercase text-right"
        >
          <AnimationText text={listing?.title} />
        </div>

        <div
          onClick={() => navigate(`/post/${listing?.id}`)}
          className="flex flex-col md:grid md:grid-cols-2 gap-6 transition-transform"
        >
          <div
            className={`relative h-[380px] w-full cstm-cursor group ${
              imgToRotate === 0 ? "-rotate-1" : ""
            }`}
            onMouseEnter={() => setImgToRotate(0)}
          >
            <img
              src={listing?.images[0]}
              alt=""
              className="object-cover h-full w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-30 group-hover:opacity-0 transition-opacity"></div>
          </div>
          <div
            className={`relative h-[380px] w-full cstm-cursor group ${
              imgToRotate === 1 ? "rotate-1" : ""
            }`}
            onMouseEnter={() => setImgToRotate(1)}
          >
            <img
              src={listing?.images[1]}
              alt=""
              className="object-cover h-full w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-30 group-hover:opacity-0 transition-opacity"></div>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-4 gap-2 md:gap-6 capitalize text-base md:text-lg font-black">
          <div className="flex flex-col">
            <span className="text-gray-600">price</span>
            <span className=" text-xl md:text-2xl">
              From {listing?.price}$ -{" "}
              {listing?.price ? listing.price + 800 : ""}$
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">location</span>
            <span
              title={listing?.adress}
              className=" text-xl md:text-2xl line-clamp-1"
            >
              {listing?.adress}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">type</span>
            <span className=" text-xl md:text-2xl">apparetemt</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">available</span>
            <span className=" text-xl md:text-2xl">
              {listing?.bedroom}
              {" bed, "}
              {listing?.bathroom}
              {" bath"}
              {listing?.furnished ? ", furnished" : null}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestListing;
