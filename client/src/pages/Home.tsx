import axios from "axios";
import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";

type ListingsProps = {
  id: string;
  title: string;
  description: string;
  images: string[];
};

const Home = () => {
  const [listings, setListings] = useState<ListingsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("api/listing/all");
      setListings(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-screen-xl mx-auto p-2 flex flex-col gap-4 mb-10">
      <h1 className="text-3xl font-bold">Home</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {listings.map((listing: any) => (
          <div key={listing.id}>
            <ListingCard
              id={listing.id}
              title={listing.title}
              desc={listing.description}
              adress={listing.adress}
              images={listing.images}
              postedBy={listing.postedBy}
              price={listing.price}
              category={listing.category}
              bathrooms={listing.bathroom}
              bedrooms={listing.bedroom}
              furnished={listing.furnished}
              parking={listing.parking}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
