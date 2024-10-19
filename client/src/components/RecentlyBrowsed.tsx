import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListingCard from "./ListingCard";

const RecentlyBrowsed = () => {
  const [listings, setListings] = useState<any[]>([]); // Move this inside the component

  const { currentUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`/api/browsing/get/${currentUser.id}`);

        if (res.status === 404) {
          setListings([]);
        } else {
          setListings(res.data.listings);
        }
        // setListings(res.data.listings);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser && currentUser.id) {
      // Check if currentUser is defined and has an id
      fetchListings();
    }
  }, [currentUser]); // Add currentUser as a dependency to useEffect

  return (
    <div className="flex flex-col container max-w-screen-xl mx-auto mb-10 p-3 bg-gray-100 rounded-md">
      <h2 className="font-bold text-xl">Recently Browsed</h2>
      <div className="flex gap-2 overflow-x-auto w-full p-2">
        {listings.length > 1 && currentUser ? (
          listings.map((listing: any) => (
            <ListingCard
              id={listing._id}
              title={listing.name}
              desc={listing.description}
              adress={listing.adress}
              images={listing.images}
              price={listing.discountedPrice}
              bathrooms={listing.bathrooms}
              bedrooms={listing.bedrooms}
              furnished={listing.furnished}
              parking={listing.parking}
            />
          ))
        ) : (
          <div>no such history</div>
        )}
      </div>
    </div>
  );
};

export default RecentlyBrowsed;
