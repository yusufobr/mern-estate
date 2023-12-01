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

  const deleteaListing = async (id: string) => {
    try {
      await axios.delete(`/api/listing/delete/${id}`);
      setListing(listing.filter((list) => list.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {listing.map((listing: any, index: number) => (
        <div key={index} className="relative">
          <ListingCard
            id={listing.id}
            title={listing.title}
            desc={listing.description}
            adress={listing.adress}
            images={listing.images}
            price={listing.price}
            category={listing.category}
            bathrooms={listing.bathroom}
            bedrooms={listing.bedroom}
            furnished={listing.furnished}
            parking={listing.parking}
          />
          <div className="absolute top-2 right-2 z-10 flex gap-2 text-sm">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md"
              onClick={() => deleteaListing(listing.id)}
            >
              Delete
            </button>
            <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
              Edit
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
