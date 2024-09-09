import bgImg from "../assets/home-bg.jpg";
import { CiSearch } from "react-icons/ci";
import AutoComplete from "./AutoComplete";
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate();
  
  return (
    <section
      className="relative h-screen bg-cover flex flex-col justify-between md:justify-center px-4 pt-32 pb-4 md:px-8 md:py-16 text-white"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <div className="capitalize z-10">
        <span className="text-xl font-semibold shadow-xl">
          Explore a wide range of properties
        </span>
        <h1 className="text-5xl md:text-9xl font-semibold mt-2">
          elivate your <br /> living experience
        </h1>
      </div>

      <form className="bg-black bg-opacity-20 rounded-md md:rounded-none md:bg-transparent backdrop-blur-sm p-2 md:p-0 md:absolute md:bottom-10 flex flex-col gap-2 md:flex-row md:justify-between md:h-10 z-10 md:w-2/3 md:items-center">
        <div className="flex flex-col md:gap-4">
          <span className="text-sm font-light md:text-base text-gray-400 md:text-white">Category :</span>
          <select
            name="category"
            id=""
            className="pr-4 font-bold text-lg md:text-2xl bg-transparent focus:bg-black rounded-md"
          >
            <option value="rent-sell">Rent /Sell</option>
            <option value="rent">Rent</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div className="flex flex-col md:gap-4">
          <span className="text-sm font-light md:text-base text-gray-400 md:text-white">Location :</span>
          <AutoComplete />
        </div>
        <div className="flex flex-col md:gap-4">
          <span className="text-sm font-light md:text-base text-gray-400 md:text-white">Type :</span>
          <select
            name="category"
            id=""
            className="pr-4 font-bold text-lg md:text-2xl bg-transparent focus:bg-black rounded-md"
          >
            <option value="rent">Appart</option>
            <option value="rent-sell">House</option>
            <option value="rent">Studio</option>
          </select>
        </div>
        <div className="flex flex-col md:gap-4">
          <span className="text-sm font-light md:text-base text-gray-400 md:text-white">Price :</span>
          <input
            className="bg-transparent pr-4 text-lg md:text-2xl font-bold placeholder-white focus:bg-black rounded-md"
            type="Number"
            placeholder="USD/Month"
            min="100"
          />
        </div>
        <div onClick={() => navigate("/search")} className="flex flex-col justify-center items-center rounded-full h-10 w-10 md:h-14 md:w-14 bg-white text-black hover:bg-[#ffffffe4] hover:cursor-pointer">
          <CiSearch size={32} />
        </div>
      </form>

      <div className="w-full h-full md:h-2/3 absolute bottom-0 left-0 bg-gradient-to-t from-black"></div>
    </section>
  );
};

export default Hero;
