import { useEffect } from "react";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";

const Search = () => {

  const { listings, error, loading } = useSelector((state: any) => state.listings);

  useEffect(() => {
    document.title = "Search | Real State";
  
  }, []);

  

  return (
    <div className="container my-20 p-3 mx-auto max-w-screen-xl min-h-screen">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <div className="bg-white p-5 flex flex-col gap-4 rounded-lg shadow-md">
            <div className="flex flex-col gap-1 w-full">
              <span>Search Term :</span>
              <input
                className="p-1 rounded-md bg-gray-100 focus:outline-none"
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <span>Type :</span>
              <div className="flex flex-wrap gap-3">
                <div className="flex gap-1 py-1 px-3 bg-gray-100 rounded-md">
                  <input name="type" type="radio" defaultChecked />
                  <span>Rent</span>
                </div>
                <div className="flex gap-1 py-1 px-3 bg-gray-100 rounded-md">
                  <input name="type" type="radio" />
                  <span>Sell</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <span>Amenities :</span>
              <div className="flex flex-wrap gap-3">
                <div className="flex gap-1 py-1 px-3 bg-gray-100 rounded-md">
                  <input type="checkbox" />
                  <span>Furnished</span>
                </div>
                <div className="flex gap-1 py-1 px-3 bg-gray-100 rounded-md">
                  <input type="checkbox" />
                  <span>Parking</span>
                </div>
              </div>
            </div>
            <button type="button" className="bg-black text-white p-2 rounded-md">Search</button>
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-4">
          {loading && <h1>Loading...</h1>}
          {error && <h1 className="text-red-500 text-xl">{error}</h1>}
          {listings.map((listing: any) => (
            <div className="rounded-md overflow-hidden">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
