import { useEffect, useRef, useState } from "react";
import React from "react";
import Box from "./Box";

export default function Whitespace({ children , coors, setCoors, coorRatio, setRatio, updateCoors}) {
  useEffect(() => {
    // Khi component được load lên 
    const whitespace = document.querySelector(".whitespace");
    if (whitespace) {
      const rect = whitespace.getBoundingClientRect();
      // Tính toán tỉ lệ ratio / độ rộng và dài của whitespace để tính 
      // ra tỉ lệ , nhờ tỉ lệ này mới quy đổi giá trị x,y về cùng hệ quy chiếu
      // ví dụ: width là 500px mà cột y giá trị tối đa là 10 thì tỉ lệ ratioY = 10/500
      // sau đó tính giá trị tung độ của box quy đổi bằng cách nhân cho
      const x = parseFloat(coorRatio.x) / parseFloat(rect.width);
      const y = parseFloat(coorRatio.y) / parseFloat(rect.height);
      setRatio({ x, y });
    }
  },[])

    
  return (
    <div className="whitespace">
      {/* Design trục x,y cho whiitepspace */}
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
            updateCoors={updateCoors}
          />
        ))}
    </div>
  );
}

