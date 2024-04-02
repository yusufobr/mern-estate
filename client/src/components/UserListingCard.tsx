interface UserListingCardProps {
  id: string;
  title: string;
  adress: string;
  desc: string;
  image: string;
}

const UserListingCard = ({
  id,
  title,
  adress,
  desc,
  image,
}: UserListingCardProps) => {
  return (
    <div className="grid grid-cols-4 gap-2" key={id}>
      <div className="col-span-1 max-h-20 rounded-md overflow-hidden">
        <img src={image} alt="listing" className="h-full w-full object-cover" />
      </div>
      <div className="col-span-3">
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-400 line-clamp-1">{adress}</p>
        <p className="text-sm line-clamp-1">{desc}</p>
      </div>
    </div>
  );
};

export default UserListingCard;
