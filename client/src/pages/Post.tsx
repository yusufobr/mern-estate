import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaBath, FaBed, FaLocationDot } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { FcLike } from "react-icons/fc";

type PostProps = {
  id: string;
  title: string;
  description: string;
  adress: string;
  price: number;
  images: string[];
  postedBy: string;
  category: string;
  bathroom: number;
  bedroom: number;
  furnished: boolean;
  parking: boolean;
  likes: number;
};

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostProps>();
  const [like, setLike] = useState<boolean>(false);
  const { currentUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    axios.get(`/api/listing/post/${id}`).then((res) => {
      setPost(res.data);
    });
    axios
      .post("/api/like/check", { user: currentUser.id, listing: id })
      .then((res) => {
        setLike(res.data);
      });
  }, [like]);

  const addLike = async () => {
    const res = await axios.post("/api/like/add", {
      user: currentUser.id,
      listing: id,
    });
    if (res.status === 201) {
      setLike(true);
    }
  };

  const removeLike = async () => {
    const res = await axios.post("/api/like/remove", {
      user: currentUser.id,
      listing: id,
    });
    if (res.status === 200) {
      setLike(false);
    }
  };

  return (
    <>
      {!post ? (
        <div className="flex flex-col gap-8">
          <div className="bg-gray-100 h-96"></div>
          <div className="container mx-auto max-w-screen-xl  grid grid-cols-3 gap-8">
            <div className="col-span-2 bg-gray-100 h-[800px]"></div>
            <div className="bg-gray-100 h-[800px]"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <Carousel
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={10000}
            transitionTime={1000}
            stopOnHover={false}
            swipeable={true}
            emulateTouch={true}
            useKeyboardArrows={true}
            dynamicHeight={true}
            className="object-cover w-full"
          >
            {post &&
              post.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="h-64 md:h-96 object-cover"
                  loading="lazy"
                />
              ))}
          </Carousel>

          <div className="container mx-auto max-w-screen-xl flex flex-col mb-8 md:grid md:grid-cols-3 gap-8">
            <div className="col-span-2 p-8 rounded-lg bg-gray-50 flex flex-col gap-4">
              <h1 className="text-3xl font-bold">{post?.title}</h1>
              <div className="flex text-lg gap-2 items-center">
                <FaLocationDot size={18} className="text-gray-600" />
                <p className="text-gray-800 line-clamp-1" title={post?.adress}>
                  {post?.adress}
                </p>
              </div>

              <div className="flex items-center gap-3 text-lg font-semibold">
                <div
                  className="flex gap-3 items-center px-3 py-1 border rounded"
                  title="bedrooms"
                >
                  <span>{post?.bedroom}</span>
                  <FaBed size={25} className="text-gray-600" />
                </div>
                <div
                  className="flex gap-3 items-center px-3 py-1 border rounded"
                  title="bathrooms"
                >
                  <span>{post?.bathroom}</span>
                  <FaBath size={20} className="text-gray-600" />
                </div>
                {post?.furnished && (
                  <div
                    className="flex gap-3 items-center px-3 py-1 border rounded"
                    title="Furnished"
                  >
                    <MdChair size={25} className="text-gray-600" />
                  </div>
                )}
                {post?.parking && (
                  <div
                    className="flex gap-3 items-center px-3 py-1 border rounded"
                    title="Parking"
                  >
                    <FaParking size={25} className="text-gray-600" />
                  </div>
                )}
              </div>

              <p className="text-lg">{post?.description}</p>
              <p className="text-lg">{post?.category}</p>
              <span>{post.likes}</span>
            </div>
            <div className="flex flex-col gap-3 rounded-lg overflow-hidden bg-gray-50 pb-8">
              <div className="bg-gray-400 text-white font-semibold text-3xl p-7">
                <p>
                  {post?.price}
                  <span className="text-sm font-meduim  italic capitalize">
                    {post?.category === "rent" ? " $/month" : " $"}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2 p-4">
                <div className="capitalize text-lg text-center">comments :</div>
                {Array.from({ length: 3 }, (_, i) => {
                  return (
                    <div key={i} className="flex gap-3 items-start">
                      <img
                        src="https://via.placeholder.com/150"
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold">username</p>
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Perspiciatis, et?
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div className="flex flex-col gap-2 py-3 px-2">
                  <div className="capitalize text-center">add a comment :</div>
                  <div className="flex flex-col gap-2">
                    <textarea
                      name=""
                      id=""
                      cols={30}
                      rows={2}
                      className="border rounded p-2"
                    ></textarea>
                    <button className="bg-gray-600 text-white font-semibold py-2 rounded">
                      comment
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center px-4">
                {like ? (
                  <button
                    className="flex gap-2 items-center justify-center border-2 border-gray-200 text-gray-400 capitalize font-semibold py-2 rounded w-full"
                    onClick={() => removeLike()}
                  >
                    <FcLike />
                    Added to favorites
                  </button>
                ) : (
                  <button
                    className="flex gap-2 items-center justify-center border-2 border-gray-200 text-gray-700 capitalize font-semibold py-2 rounded w-full"
                    onClick={() => addLike()}
                  >
                    <CiHeart />
                    Add to favorites
                  </button>
                )}
                <Link to="/favorites" className="text-sm font-bold text-gray-600">Show My Favorites</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
