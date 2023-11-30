import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaBath, FaBed, FaLocationDot } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import { FaParking } from "react-icons/fa";

type ListingCardProps = {
  title: string;
  desc: string;
  adress: string;
  images: string[];
  postedBy?: { avatar: string; username: string };
  price?: number;
  category?: "rent" | "sale";
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  parking: boolean;
};

const ListingCard = ({
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
  return (
    <div className="max-w-sm flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow ">
      <div>
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
          className="rounded-t-lg object-cover w-full h-48"
        >
          {images.map((image, index) => (
            <div key={index}>
              <img
                className="rounded-t-lg object-cover w-full h-48"
                src={image}
                alt="test"
                loading="lazy"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="p-5 flex flex-col justify-between h-full">
        {/* <div className="-mt-3 mb-2">
          <span className="text-gray-700 text-xs font-medium px-2 py-[2px] rounded-full bg-slate-300  capitalize tracking-widest italic">
            {category}
          </span>
        </div> */}
        <div>
          <a href="#">
            <p className="font-semibold text-gray-600">
              {price && price + " €"}
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
          </a>
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
          <div className="flex items-center gap-2 text-sm font-semibold">
            <div
              className="flex gap-1 items-center px-1 border rounded"
              title="bedrooms"
            >
              <span>{bedrooms}</span>
              <FaBed size={16} className="text-gray-600" />
            </div>
            {bathrooms > 0 && (
              <div
                className="flex gap-1 items-center px-1 border rounded"
                title="bathrooms"
              >
                <span>{bathrooms}</span>
                <FaBath size={14} className="text-gray-600" />
              </div>
            )}
            {furnished && (
              <div title="Furnished">
                <MdChair size={16} className="text-gray-600" />
              </div>
            )}
            {parking && (
              <div title="Parking">
                <FaParking size={16} className="text-gray-600" />
              </div>
            )}
          </div>
          {postedBy && (
            <div title={postedBy.username} className="w-6 h-6 rounded-full">
              <img
                src={postedBy.avatar}
                alt={postedBy.username}
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
