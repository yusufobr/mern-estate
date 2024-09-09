import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaBath, FaBed, FaLocationDot } from "react-icons/fa6";
import { MdChair, MdImageNotSupported } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatMoneyNumber } from "../utils/functions";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";


type ListingCardProps = {
  id: string;
  title: string;
  desc: string;
  adress: string;
  images: string[];
  postedBy?: { avatar: string; username: string };
  price?: number;
  category?: "rent" | "sale";
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  parking?: boolean;
};

const ListingCard = ({
  id,
  title,
  desc,
  adress,
  images,
  postedBy,
  price,
  category,
  bedrooms,
  bathrooms,
  furnished,
  parking,
}: ListingCardProps) => {

  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <div className="max-w-sm flex flex-col h-full bg-white border border-gray-200 hover:border-transparent hover:shadow-md transition delay-150 duration-150">
      <div>
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-48 bg-slate-100 text-slate-300">
            <MdImageNotSupported size={50} />
          </div>
        ) : (
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
            className="object-cover w-full h-48"
          >
            {images.map((image, index) => (
              <div key={index}>
                <img
                  className="object-cover w-full h-48"
                  src={image}
                  alt={title}
                  loading="lazy"
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <div className="p-5 flex flex-col justify-between h-full">
        <div>
          <Link to={`/post/${id}`}>
            <p className="font-semibold text-gray-600">
              {price && formatMoneyNumber(price) + " €"}
              {category === "rent" ? (
                <span className="text-sm font-meduim text-gray-400 italic capitalize">
                  {" "}
                  /month
                </span>
              ) : (
                ""
              )}
            </p>
            <h5
              className="font-semibold text-lg tracking-tight text-gray-700 line-clamp-1"
              title={title}
            >
              {title}
            </h5>
          </Link>
          <div className="flex gap-1 mb-3 items-center">
            <FaLocationDot size={10} className="text-gray-600" />
            <p
              className="text-sm font-light text-gray-800 line-clamp-1"
              title={adress}
            >
              {adress}
            </p>
          </div>
          <p className="mb-5 text-gray-600 line-clamp-2">{desc}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex  gap-2 text-sm font-semibold">
            {bedrooms && (
              <div
                className="flex gap-1 items-center px-1 border rounded"
                title="bedrooms"
              >
                <span>{bedrooms}</span>
                <FaBed size={16} className="text-gray-600" />
              </div>
            )}
            {bathrooms && (
              <div
                className="flex gap-1 items-center px-1 border rounded"
                title="bathrooms"
              >
                <span>{bathrooms}</span>
                <FaBath size={14} className="text-gray-600" />
              </div>
            )}
            {furnished && (
              <div
                className="flex gap-1 items-center px-1 border rounded"
                title="Furnished"
              >
                <MdChair size={16} className="text-gray-600" />
              </div>
            )}
            {parking && (
              <div
                className="flex gap-1 items-center px-1 border rounded"
                title="Parking"
              >
                <FaParking size={16} className="text-gray-600" />
              </div>
            )}
          </div>
          {postedBy?.username === currentUser?.username ? (
            <Link
              to={`/update/${id}`}
              className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition delay-150 duration-150"
            >
              <FaEdit size={16} />
            </Link>
          ) : (
            <div title={postedBy?.username} className="w-6 h-6 rounded-full">
              <img
                src={postedBy?.avatar || "https://via.placeholder.com/150"}
                alt={postedBy?.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
