import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import PageHeader from "../components/PageHeader";

const Favorites = () => {

  document.title = "Favorites | Real Estate";

  const { currentUser } = useSelector((state: any) => state.user);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    favorites();
    // console.log(list);
  }, []);

  const favorites = async () => {
    setLoading(true);
    const listOfIds = await axios.post("/api/like/favorites", {
      user: currentUser.id,
    });
    // console.log("listOfIds.data", listOfIds.data);
    if(listOfIds.data === 'You have no favorites') {
      setList([]);
      setLoading(false);
    } else {
      const list = await axios.post("/api/listing/getSpecificListings", {
        listingList: listOfIds.data,
      });
      setList(list.data);
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col gap-4">
      <PageHeader pageTitle="Favorites" />
      {loading ? (
        <h1 className="container max-w-screen-xl mx-auto">Loading...</h1>
      ) : (
        <div className="container max-w-screen-xl mx-auto my-4 mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {list.length > 0 ? (
            list.map((item) => (
              <div key={item.id}>
                <ListingCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  desc={item.description}
                  adress={item.adress}
                  images={item.images}
                  postedBy={item.postedBy}
                  price={item.price}
                  category={item.category}
                  bathrooms={item.bathroom}
                  bedrooms={item.bedroom}
                  furnished={item.furnished}
                  parking={item.parking}
                />
              </div>
            ))
          ) : (
            <h1 className="p-2">Sorry, no saved properties yet</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
