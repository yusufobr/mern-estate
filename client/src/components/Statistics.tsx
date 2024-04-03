import axios from "axios";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaComment, FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Statistics = () => {
  const { currentUser } = useSelector((state: any) => state.user);

  const [nbmLikes, setNbmLikes] = useState<number>(0)
  const [nbmComments, setNbmComments] = useState<number>(0)
  const [nbmListings, setNbmListings] = useState<number>(0)

  useEffect(() => {
    favorites();
    commentsCount();
    fetchListing(currentUser.id);
  }, []);

  const fetchListing = async (id: string) => {
    const res = await axios.post(`/api/listing/mylistings/${id}`);
    setNbmListings(res.data.length);
  };

  const favorites = async () => {
    const listOfIds = await axios.post("/api/like/favorites", {
      user: currentUser.id,
    });
    if (listOfIds.data === "You have no favorites") {
      setNbmLikes(0);
    }else{
      setNbmLikes(listOfIds.data.length);
    }
  };

  const commentsCount = async () => {
    const numberOfComments = await axios.get("/api/comment/userCommentsCount?userId=" + currentUser.id);
    setNbmComments(numberOfComments.data);
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-3 gap-3">
      {/* listing */}
      <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
        <div className="uppercase">
          <div className="text-black">total listings</div>
          <div className="text-xl font-semibold">{nbmListings}</div>
        </div>
        <div className="bg-white h-10 w-10 p-1 rounded-full flex flex-col justify-center items-center text-gray-300">
          <FaHome size={24} />
        </div>
      </div>

      {/* likes */}
      <div className="flex justify-between p-3 bg-gray-100 rounded-md">
        <div className="uppercase">
          <div className="text-black">total likes</div>
          <div className="text-xl font-semibold">{nbmLikes}</div>
        </div>
        <div className="bg-white h-10 w-10 p-1 rounded-full flex flex-col justify-center items-center text-gray-300">
          <FaHeart size={20} />
        </div>
      </div>

      {/* comments */}
      <div className="flex justify-between p-3 bg-gray-100 rounded-md">
        <div className="uppercase">
          <div className="text-black">total comments</div>
          <div className="text-xl font-semibold">{nbmComments}</div>
        </div>
        <div className="bg-white h-10 w-10 p-1 rounded-full flex flex-col justify-center items-center text-gray-300">
          <FaComment size={20} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
