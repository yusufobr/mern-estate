import { motion } from "framer-motion";

type AnimationTextProps = {
  text?: string;
  animation?: string;
  reptition?: string;
};

const AnimationText = ({ text, animation, reptition }: AnimationTextProps) => {
  return (
    <>
      <motion.h2
      className="whitespace-nowrap"
        animate={{
          opacity: [1, 0.5, 1],
          x: [0, -500, 0],
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
        }}
      >
        {text}
      </motion.h2>
    </>
  );
};

export default AnimationText;
