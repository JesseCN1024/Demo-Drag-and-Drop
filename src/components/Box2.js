import React from "react";
import { motion } from "framer-motion";

export default function Box1() {
    const boxVariants = { 
        type: "spring",
        bounce: 0,  
        hidden: {
            x: "-100vw"
        },
        visible: {
            x: 0,
            // transition can be written in this
            transition: {
                delay: .5,
                // for the parent box to animate to finish first
                // then for the children to animate
                when: "beforeChildren",
                // Each child has 0.2s to play animation in order
                staggerChildren: 0.2
            }
        }
    }
    const miniBoxVariants = {
        hidden: {
            x: -10,
            opacity: 0
        },
        visible:{
            x: 0,
            opacity: 1,
        }
    }
  return (
    <div className="container">
      <motion.div className="box"
        animate={{
            scale: [1,1.4,0,1,3,1],
            rotate: [0,0,180,-45,60,-360],
            borderRadius: ["20%","20%","50%","40%","20%"]
        }} 
        transition={{
            duration: 3
        }}
      >
      </motion.div>
    </div>
  );
}
