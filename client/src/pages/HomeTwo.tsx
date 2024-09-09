import BestListing from "../components/BestListing";
import ClaimDiscount from "../components/ClaimDiscount";
import FAQ from "../components/FAQ";
import Hero from "../components/Hero";
import LookingFor from "../components/LookingFor";

const HomeTwo = () => {
  document.title = "Explore a wide range of Properties | Home";
  return (
    <div className="">
      <Hero />
      <div className="flex flex-col gap-4 md:grid md:grid-cols-4 md:justify-between p-8 py-20 text-2xl font-semibold bg-white">
        <span className="font-bold">(01)Our Story</span>
        <p className="md:col-span-3 text-2xl md:text-5xl leading-tight indent-16 bg-gradient-to-b from-black to-[#00000060] text-transparent bg-clip-text">
          We take a unique approach to real estate. We belive in showing
          properties through a lens authenticity, allowing the true essence of
          each home to shine. Our commitment to transparency and integrety is
          the core of what we do.
        </p>
      </div>
      <BestListing />
      <LookingFor />
      <FAQ />
      <ClaimDiscount />
    
    </div>
  );
};

export default HomeTwo;
