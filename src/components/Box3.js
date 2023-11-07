import React from "react";
import { motion, useAnimation} from "framer-motion";

export default function Box1() {
  const control = useAnimation()
  return (
    <div className="container">
      <button 
        onClick={
          control.start({
             x: 100,
             transition: {duration: 2}
          })
        }
      >Move right</button>
      <button 
        onClick={
          control.start({
            x: 0,
            transition: {duration: 2}
          })
        }
      >Move left</button>
      <button 
        onClick={
          control.start({
            borderRadius: "50%"
          })
        }
      >Turn into circle</button>
      <button 
        onClick={control.stop()}
      >Stop</button>
      <motion.div className="box">
        animate={control}
      </motion.div>
    </div>
  );
}
