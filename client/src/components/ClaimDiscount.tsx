import { motion } from "framer-motion";

const ClaimDiscount = () => {
  return (
    <div className="flex flex-col gap-6 items-center p-8 py-20 font-semibold w-full overflow-hidden bg-white">
      <div className="inline w-full text-4xl md:text-[80px] font-medium capitalize text-right">
        <motion.h2
          className="whitespace-nowrap"
          animate={{
            x: [30, -100, 30],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
          }}
        >
          Claim exciting discounts for new listings
        </motion.h2>
      </div>
      <div className="flex flex-col gap-3 items-center md:w-1/2 mx-auto">
        <p className="text-center">
            Join us today and take advantage of exclusive new exciting discounts
            designed just for our new customers. Don't miss out on this special
            offer.
        </p>
        <button className="px-8 p-2 border-2 border-gray-700 rounded-full">
            Claim
        </button>
        
      </div>
    </div>
  );
};

export default ClaimDiscount;
