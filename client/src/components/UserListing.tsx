import axios from "axios";
import { useEffect, useState } from "react";
import ListingCard from "./ListingCard";

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

  useEffect(() => {
    fetchListing(id);
  }, []);

  const fetchListing = async (id: string) => {
    const res = await axios.post(`/api/listing/mylistings/${id}`);
    setListing(res.data);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {listing.map((listing: any, index: number) => (
        <div key={index} className="relative">
          <ListingCard
            title={listing.title}
            desc={listing.description}
            adress={listing.adress}
            images={listing.images}
          />
          <div className="absolute top-2 right-2 flex gap-2 text-sm">
            <button className="bg-red-500 text-white px-2 py-1 rounded-md">
              Delete
            </button>
            <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserListing;
