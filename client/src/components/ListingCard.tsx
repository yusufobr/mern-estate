import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type ListingCardProps = {
  title: string;
  desc: string;
  adress: string;
  category?: "rent" | "sale";
  images: string[];
  postedBy?: { avatar: string; username: string };
  price?: number;
};

const ListingCard = ({
  title,
  desc,
  adress,
  images,
  postedBy,
  price,
  category,
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
        <div>
          <a href="#">
            <p className="font-bold text-lg text-gray-600">
              {price && price + " €"}
              {category === "rent" ? (
                <span className="text-sm font-normal text-gray-500">/month</span>
              ) : (
                ""
              )}
            </p>
            <h5
              className="text-xl font-bold tracking-tight text-gray-900 line-clamp-1"
              title={title}
            >
              {title}
            </h5>
          </a>
          <p
            className="mb-3 text-sm font-light text-gray-800 line-clamp-1"
            title={adress}
          >
            {adress}
          </p>
          <p className="mb-5 font-normal text-gray-600 line-clamp-2">{desc}</p>
        </div>
        <div className="flex justify-between items-center">
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          {postedBy && (
            <div title={postedBy.username} className="w-9 h-9 rounded-full">
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
