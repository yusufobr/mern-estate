import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import faqData from "../assets/faq.ts";


const FAQ: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setSelectedQuestion((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-10 py-20 p-8 bg-gray-50">
      <span className="font-bold text-2xl">(04)We've already answerd</span>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
        <div className="mb-4">
          <h2 className="text-4xl md:text-[80px] font-bold">FAQ's</h2>
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          {faqData.map((item, index) => (
            <div key={index} className="flex flex-col col-span-1">
              <motion.div
                className={`p-2 px-4 rounded cursor-pointer flex items-center justify-between`}
                onClick={() => toggleQuestion(index)}
              >
                <h2 className="text-xl font-bold">{item.question}</h2>
                <span className="ml-2">
                  {selectedQuestion === index ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </motion.div>

              <AnimatePresence>
                {selectedQuestion === index && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-4" dangerouslySetInnerHTML={{__html: item.answer}}></p>
                  </motion.div>
                )}
              </AnimatePresence>
              {faqData.length > index + 1 && (
                <div className="w-3/4 h-[1px] mt-3 ml-4 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
