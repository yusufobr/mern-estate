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
import { useNavigate } from "react-router-dom";
import ImageViewer from "../components/ImageViewer";
import { firePreview, formatMoneyNumber } from "../utils/functions";
import Comments from "../components/Comments";

type PostProps = {
  id: string;
  title: string;
  description: string;
  adress: string;
  price: number;
  images: string[];
  category: string;
  bathroom: number;
  bedroom: number;
  furnished: boolean;
  parking: boolean;
  likes: number;
  postedBy: {
    username: string;
    avatar: string;
  };
};

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostProps>();
  const [like, setLike] = useState<boolean>(false);
  const { currentUser } = useSelector((state: any) => state.user);

  const navigate = useNavigate();

  if (post) {
    document.title = post.title;
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/listing/post/${id}`);
        setPost(res.data);

        if (currentUser) {
          axios
            .post("/api/like/check", { user: currentUser.id, listing: id })
            .then((res) => {
              setLike(res.data);
            });
        }
      } catch (error) {
        navigate("/404");
      }
    };

    fetchPost();
  }, [like]);

  const addLike = async () => {
    if (currentUser) {
      const res = await axios.post("/api/like/add", {
        user: currentUser.id,
        listing: id,
      });
      if (res.status === 201) {
        setLike(true);
      }
    } else {
      navigate("/signin");
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
          <div className="container mx-auto max-w-screen-xl grid grid-cols-3 gap-8">
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
                <div className="relative" onClick={firePreview}>
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="h-64 md:h-96 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-black z-20 opacity-75"></div>
                </div>
              ))}
          </Carousel>

          <div className="container mx-auto max-w-screen-xl flex flex-col mb-8 md:grid md:grid-cols-3 gap-8">
            <div className="col-span-2 p-8 rounded-lg bg-white flex flex-col gap-4">
              <div className="flex gap-3 justify-between">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold">{post?.title}</h1>
                  <div className="flex text-lg gap-2 items-center">
                    <FaLocationDot size={14} className="text-gray-600" />
                    <p
                      className="text-gray-800 line-clamp-1"
                      title={post?.adress}
                    >
                      {post?.adress}
                    </p>
                  </div>
                </div>
                <div>
                  <div
                    title={post.postedBy.username}
                    className="rounded-full hidden sm:block overflow-hidden border border-gray-200"
                  >
                    <img
                      className="w-8 h-8 object-cover rounded-full"
                      src={
                        post.postedBy.avatar ||
                        "https://via.placeholder.com/150"
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm font-semibold">
                <div
                  className="flex gap-2 items-center px-2 py-1 border"
                  title="bedrooms"
                >
                  <span>{post?.bedroom}</span>
                  <FaBed size={16} className="text-gray-600" />
                </div>
                <div
                  className="flex gap-2 items-center px-2 py-1 border"
                  title="bathrooms"
                >
                  <span>{post?.bathroom}</span>
                  <FaBath size={16} className="text-gray-600" />
                </div>
                {post?.furnished && (
                  <div
                    className="flex gap-2 items-center px-2 py-1 border"
                    title="Furnished"
                  >
                    <MdChair size={18} className="text-gray-600" />
                  </div>
                )}
                {post?.parking && (
                  <div
                    className="flex gap-2 items-center px-2 py-1 border"
                    title="Parking"
                  >
                    <FaParking size={16} className="text-gray-600" />
                  </div>
                )}
              </div>

              <div>
                <span>About</span>
                <p className="text-lg">{post?.description}</p>
              </div>
              <p className="text-lg">{post?.category}</p>
              <div>
                <span>{post.likes}</span>
                <span>{post.likes > 1 ? " Likes" : " Like"}</span>
              </div>

              <ImageViewer images={post?.images || []} />
            </div>
            <div className="flex flex-col gap-3 overflow-hidden bg-white pb-8">
              <div className="bg-black text-white font-semibold text-3xl p-7">
                <p>
                  {formatMoneyNumber(post?.price)}
                  <span className="text-sm font-meduim  italic capitalize">
                    {post?.category === "rent" ? " $/month" : " $"}
                  </span>
                </p>
              </div>

              <Comments />

              <div className="flex flex-col gap-3 items-center px-4">
                {like ? (
                  <button
                    className="flex gap-2 items-center justify-center border-2 border-gray-200 text-gray-400 font-semibold py-2 rounded w-full"
                    onClick={() => removeLike()}
                  >
                    <FcLike />
                    Remove
                  </button>
                ) : (
                  <button
                    className="flex gap-2 items-center justify-center border-2 border-gray-200 text-gray-700 font-semibold py-2 rounded w-full"
                    onClick={() => addLike()}
                  >
                    <CiHeart />
                    Add to favorites
                  </button>
                )}
                <Link
                  to="/favorites"
                  className="text-sm font-bold text-gray-600"
                >
                  Show My Favorites
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
