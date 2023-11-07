import React from 'react'
import {motion} from "framer-motion"

export default function Box1() {
  return (
    <div className="container">
        <motion.div 
            className="box"
            animate={{
                x: "500px",
                opacity: 1,
                rotate: 360,

            }}
            initial={{
                opacity: .2 

            }}
            transition={{
                type:"spring",
                damping: 50
            }}
        >
        </motion.div>
    </div>
  )
}
