import axios from "axios";
import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";

type Listing = {
  id: string;
  title: string;
  description: string;
  images: string[];
};

const Home = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("api/listing/all");
      setListings(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-2 flex flex-col gap-4 mb-10">
      <h1 className="text-3xl font-bold">Home</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {listings.map((listing: any) => (
          <div key={listing.id}>
            <ListingCard
              title={listing.title}
              desc={listing.description}
              adress={listing.adress}
              images={listing.images}
              postedBy={listing.postedBy}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
