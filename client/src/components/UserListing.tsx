import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserListingCard from "./UserListingCard";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

type Listing = {
  id: string;
  title: string;
  description: string;
  adress: string;
  price: number;
  images: string[];
};

type User = {
  id: string;
};

const UserListing = ({ id }: User) => {
  const [listing, setListing] = useState<Listing[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListing(id);
  }, []);

  const fetchListing = async (id: string) => {
    const res = await axios.post(`/api/listing/mylistings/${id}`);
    setListing(res.data);
  };

  const deleteaListing = async (id: string) => {
    try {
      await axios.delete(`/api/listing/delete/${id}`);
      setListing(listing.filter((list) => list.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {listing.map((listing: any, index: number) => (
        <div
          key={index}
          className="relative bg-gray-100 p-3 rounded-md cursor-pointer hover:bg-slate-200"
          onClick={() => navigate(`/post/${listing.id}`)}
        >
          <UserListingCard
            id={listing.id}
            title={listing.title}
            desc={listing.description}
            adress={listing.adress}
            image={listing.images[0]}
          />
          <div className="absolute top-3 right-2 z-10 flex gap-1 text-sm">
            <button
              className="bg-black bg-opacity-10 p-1 text-white rounded-md backdrop-blur-sm hover:bg-red-500 hover:bg-opacity-90 transition delay-150 duration-150"
              onClick={() => deleteaListing(listing.id)}
              title="Delete Listing"
            >
              <FaDeleteLeft size={14} />
            </button>
            <button
              className="bg-black bg-opacity-10 p-1 text-white rounded-md backdrop-blur-sm hover:bg-blue-500 hover:bg-opacity-90 transition delay-150 duration-150"
              onClick={() => navigate(`/update/${listing.id}`)}
              title="Edit Listing"
            >
              <FaEdit size={14} />
            </button>
          </div>
        </div>
      ))}
      {listing.length === 0 && (
        <div className="col-span-2 text-center text-gray-500">
          <p>No listings found</p>
        </div>
      )}
    </div>
  );
};

export default UserListing;
