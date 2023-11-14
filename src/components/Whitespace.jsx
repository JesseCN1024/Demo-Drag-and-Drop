import { useEffect, useRef, useState } from "react";
import React from "react";
import Box from "./Box";

export default function Whitespace({ children , coors, setCoors, setCoorsChanged, coorRatio, setRatio, updateCoors}) {
  useEffect(() => {
    const whitespace = document.querySelector(".whitespace");
    if (whitespace) {
      const rect = whitespace.getBoundingClientRect();
      const x = parseFloat(coorRatio.x) / parseFloat(rect.width);
      const y = parseFloat(coorRatio.y) / parseFloat(rect.height);
      setRatio({ x, y });
    }
  },[])

    
  return (
    <div className="whitespace">
      <div className="coordinate">
        {/* O number */}
        <span className="position-absolute start-0 top-100 translate-middle">
          O
        </span>
        {/* X line */}
        <div className="coordinate-x">
          <div className="arrow position-absolute top-50">
            <i className="fa-solid fa-arrow-right position-absolute top-50 start-100 translate-middle"></i>
          </div>
          <span className="position-absolute start-100 top-100 translate-middle">
            {coorRatio.x}
          </span>
        </div>
        {/* Y line */}
        <div className="coordinate-y coordinate-vertical">
          <div className="arrow position-absolute top-50">
            <i className="fa-solid fa-arrow-right position-absolute top-50 start-100 translate-middle"></i>
          </div>
          <span className="position-absolute start-100 top-0 translate-middle">
            {coorRatio.y}
          </span>
        </div>
      </div>

      {coors &&
        coors.map((coor) => (
          <Box
            key={coor.id}
            coor={coor}
            setCoors={setCoors}
            setCoorsChanged={setCoorsChanged}
            updateCoors={updateCoors}
          />
        ))}
    </div>
  );
}

