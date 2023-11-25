
type ListingCardProps = {
    title: string;
    desc: string;
    adress: string;
    images: string[];
    postedBy?: {avatar: string, username: string};
    };

const ListingCard = ({title, desc, adress, images, postedBy}: ListingCardProps) => {
  return (
    <div className="max-w-sm flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow ">
      <a href="#">
        <img
          className="rounded-t-lg object-cover w-full h-48"
          src={images[0]}
          alt="test"
          loading="lazy"
        />
      </a>
      <div className="p-5 flex flex-col justify-between h-full">
        <div>
            <a href="#">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                {title}
            </h5>
            </a>
            <p className="mb-3 text-sm font-light text-gray-500">
                {adress}
            </p>
            <p className="mb-3 font-normal text-lg text-gray-700">
                {desc}
            </p>
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
            {postedBy && 
                <div title={postedBy.username} className="w-9 h-9 rounded-full">
                    <img src={postedBy.avatar} alt={postedBy.username} className="w-full h-full rounded-full object-cover" />
                </div>
            }
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
