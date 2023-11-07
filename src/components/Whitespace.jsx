import { useRef, useState } from "react";
import React from "react";
import Box from "./Box";

export default function Whitespace({ children , coors, setCoors, setCoorsChanged}) {
  


  return (
    <div className="whitespace">
        {coors && coors.map(coor => (
            <Box key={coor.id} coor={coor} setCoors={setCoors} setCoorsChanged={setCoorsChanged}/>
        ))}
    </div>
  );
}

