import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaBath, FaBed, FaLocationDot } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import { FaParking } from "react-icons/fa";

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
};

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostProps>();

  useEffect(() => {
    axios.get(`/api/listing/post/${id}`).then((res) => {
      setPost(res.data);
    });
  }, []);

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
                  className="w-full h-96 object-cover"
                  loading="lazy"
                />
              ))}
          </Carousel>

          <div className="container mx-auto max-w-screen-xl grid grid-cols-3 gap-8">
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
            </div>
            <div className="flex flex-col p-8 rounded-lg bg-gray-50">
              <p>
                {post?.price}
                {post?.category === "rent" && (
                  <span className="text-sm font-meduim text-gray-400 italic capitalize">
                    {" "}
                    /month
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
