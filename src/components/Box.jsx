import React, { useEffect, useRef } from 'react'

function Box(props) {
  // STATES AND STYLES AND VARIABLES
  const style = {
    zIndex: props.coor.z,
    width: `${props.coor.w}px`,
    height: `${props.coor.h}px`,
  };
  // Gọi ref các nút resize (4 góc và 4 cạnh)
  const ref = useRef(null);
  const leftResize = useRef(null);
  const rightResize = useRef(null);
  const topResize = useRef(null);
  const bottomResize = useRef(null);
  const topleftResize = useRef(null);
  const toprightResize = useRef(null);
  const bottomleftResize = useRef(null);
  const bottomrightResize = useRef(null);
  // FUNCTIONS
  const wsSize = () => { // hàm trả về kích thước của whitespăc
    const workspace = document.querySelector(".whitespace");
    let rect;
    if (workspace) {
      rect = workspace.getBoundingClientRect();
      return { w: rect.width, h: rect.height };
    }
    return { w: 0, h: 0 };
  };
  // Tính giá trị tuyệt đối từ x,y tương đốI trong data để set top, left position absolute cho obj
  const coorAbsolute = () => { // 
    if (wsSize().w && wsSize().h) {
      const xAbsolute = props.coor.x;
      const yAbsolute = wsSize().h - props.coor.h - props.coor.y;
      return { x: xAbsolute, y: yAbsolute };
    }
    return { x: 0, y: 0 };
  };
  // Tính giá trị tương đối từ tuyệt đối và lưu vào state
  const coorRelative = (x, y, h) => {
    // x, y is the absolute x,y passed in
    if (wsSize().w && wsSize().h) {
      const xRelative = x;
      const yRelative = wsSize().h - h - y;
      return { x: xRelative, y: yRelative };
    }
    return { x: 0, y: 0 };
  };
  // Láy dữ liệu các thuột ính left và top từ obj
  const getRef = (s) => {
    if (["--left", "--top"].includes(s)) {
      return parseFloat(ref.current.style.getPropertyValue(s).slice(0, -2));
    }
    return 0;
  };




  // USE EFFECTS
  // USE Effect xử lý sự kiện kéo thả
  useEffect(() => {
    // Select the box
    let startMouseX, startMouseY; // vị trí hiện tại của mouse
    let startX, startY; // giá trị left và top hiện tại
    // Thứ tự xem là Down -> Move -> Up (kéo xuống)
    const handleMouseMove = (e) => {
      let dx, dy;
      // New position of element
      dx = e.clientX - startMouseX + startX;
      dy = e.clientY - startMouseY + startY;
      // Update element position (cập nhật liên tục khi chuột dchuyển)
      ref.current.style.setProperty("--left", `${dx}px`);
      ref.current.style.setProperty("--top", `${dy}px`);
    };
    // When user loosen the pointer
    const handleMouseUp = () => {
      // KHi nhả chuọt ra thfi cập nhật vào state
      // Clean up event listeners
      ref.current.classList.remove("box-selected");
      document.removeEventListener("mousemove", handleMouseMove);
      // Update state
      const newXY = coorRelative(
        getRef("--left"),
        getRef("--top"),
        props.coor.h
      );
      props.updateCoors(
        props.coor.id,
        {
          x: newXY.x,
          y: newXY.y,
          isSelected: true,
        },
        { isSelected: false }
      );

      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e) => {
      if (e.target !== e.currentTarget) return;
      startX = getRef("--left");
      startY = getRef("--top");
      ref.current.classList.add("box-selected");
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      // Attach event listeners
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    ref.current.addEventListener("mousedown", handleMouseDown);
    return () => {
      if (ref.current)
        ref.current.removeEventListener("mousedown", handleMouseDown);
    };
  }, [props.coor]);

  useEffect(() => {
    ref.current.style.setProperty("--left", `${coorAbsolute().x}px`);
    ref.current.style.setProperty("--top", `${coorAbsolute().y}px`);
  }, [props.coor]);


  // USE EFFECT xử lý sự kiện resize
  useEffect(() => {
    // handling resizing boxes
    // Return is there isnt any box selected
    if (!props.coor.isSelected) return;
    const right = rightResize.current;
    const left = leftResize.current;
    const bottom = bottomResize.current;
    const top = topResize.current;
    const topleft = topleftResize.current;
    const topright = toprightResize.current;
    const bottomleft = bottomleftResize.current;
    const bottomright = bottomrightResize.current;
    const box = ref.current;
    // let styles;
    // if (box) styles = box.getComputedStyle(box);
    let x = 0;
    let y = 0;
    let width = props.coor.w;
    let height = props.coor.h;

    // Mỗi cái resize cạnh sẽ có listener down, move và up riêng biệt
    // còn các resize góc chỉ sử dụng lại cạnh (ví dụ góc trái trên cùng thì sử dụng
    // lại listener của các cạnh trên và trái)
    // Right resize
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width += dx; // thay đổi và cập nhật width
      box.style.width = `${width}px`;
    };
    const onMouseUpRightResize = (event) => {
      props.updateCoors(props.coor.id, {
        w: parseInt(box.style.width.slice(0, -2)),
      });
      document.removeEventListener("mousemove", onMouseMoveRightResize);
      document.removeEventListener("mouseup", onMouseUpRightResize);
    };
    const onMouseDownRightResize = (event) => {
      event.stopPropagation();
      x = event.clientX; // set the mouse position at the time clicked
      // box.style.left = props.coor.left;
      // box.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };
    // Bottom resize
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - y;
      y = event.clientY;
      height += dy;
      box.style.height = `${height}px`;
    };
    const onMouseUpBottomResize = (event) => {
      const newY = props.coor.y - (height - props.coor.h);
      props.updateCoors(props.coor.id, {
        h: parseInt(box.style.height.slice(0, -2)),
        y: newY,
      });
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
      document.removeEventListener("mouseup", onMouseUpBottomResize);
    };
    const onMouseDownBottomResize = (event) => {
      event.stopPropagation();
      y = event.clientY; // set the mouse position at the time clicked
      // box.style.left = props.coor.left;
      // box.style.right = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };
    // Left resize
    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width -= dx;
      box.style.width = `${width}px`;
      box.style.setProperty("--left", `${getRef('--left') + dx}px`);
    };
    const onMouseUpLeftResize = (event) => {
      let newXAbsolute = getRef('--left');
      props.updateCoors(props.coor.id, {
        w: parseInt(box.style.width.slice(0, -2)),
        x: coorRelative(newXAbsolute, props.coor.y).x
      });
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
      document.removeEventListener("mouseup", onMouseUpLeftResize);
    };
    const onMouseDownLeftResize = (event) => {
      event.stopPropagation();
      x = event.clientX; 
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };
    // Top resize
    const onMouseMoveTopResize = (event) => {
      const dy = event.clientY - y;
      y = event.clientY;
      height -= dy;
      box.style.height = `${height}px`;
      box.style.setProperty("--top", `${getRef("--top") + dy}px`);
    };
    const onMouseUpTopResize = (event) => {
      props.updateCoors(props.coor.id, {
        h: parseInt(box.style.height.slice(0, -2)),
      });
      document.removeEventListener("mousemove", onMouseMoveTopResize);
      document.removeEventListener("mouseup", onMouseUpTopResize);
    };
    const onMouseDownTopResize = (event) => {
      event.stopPropagation();
      y = event.clientY; 
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };


    right.addEventListener("mousedown", onMouseDownRightResize);
    bottom.addEventListener("mousedown", onMouseDownBottomResize);
    left.addEventListener("mousedown", onMouseDownLeftResize);
    top.addEventListener("mousedown", onMouseDownTopResize);
    // For rounded resizer
    topleft.addEventListener('mousedown', onMouseDownLeftResize);
    topleft.addEventListener('mousedown', onMouseDownTopResize);
    topright.addEventListener('mousedown', onMouseDownRightResize);
    topright.addEventListener('mousedown', onMouseDownTopResize);
    bottomleft.addEventListener('mousedown', onMouseDownLeftResize);
    bottomleft.addEventListener('mousedown', onMouseDownBottomResize);
    bottomright.addEventListener('mousedown', onMouseDownRightResize);
    bottomright.addEventListener('mousedown', onMouseDownBottomResize);

    return () => {
      right.removeEventListener("mousedown", onMouseDownRightResize);
      bottom.removeEventListener("mousedown", onMouseDownBottomResize);
      left.removeEventListener("mousedown", onMouseDownLeftResize);
      top.removeEventListener("mousedown", onMouseDownTopResize);
      topleft.removeEventListener("mousedown", onMouseDownLeftResize);
      topleft.removeEventListener("mousedown", onMouseDownTopResize);
      topright.removeEventListener("mousedown", onMouseDownRightResize);
      topright.removeEventListener("mousedown", onMouseDownTopResize);
      bottomleft.removeEventListener("mousedown", onMouseDownLeftResize);
      bottomleft.removeEventListener("mousedown", onMouseDownBottomResize);
      bottomright.removeEventListener("mousedown", onMouseDownRightResize);
      bottomright.removeEventListener("mousedown", onMouseDownBottomResize);

    };
  }, [props.coor]);

  return (
    <div
      ref={ref}
      className={`bg-primary text-center box ${
        props.coor.isSelected && "box-selected"
      }`}
      style={style}
    >
      Drag Me {props.coor.id}
      {/* Box nào được chọn thì mói hiện resizers, các resizer bên dưới cần css theo như trong index.css mẫu*/}
      {props.coor.isSelected && (
        <>
          {/* Bar resizer */}
          <div
            ref={leftResize}
            className="resizer resizer-left top-50 start-0 translate-middle"
          ></div>
          <div
            ref={rightResize}
            className="resizer resizer-right top-50 start-100 translate-middle"
          ></div>
          <div
            ref={topResize}
            className="resizer resizer-top top-0 start-50 translate-middle"
          ></div>
          <div
            ref={bottomResize}
            className="resizer resizer-bottom top-100 start-50 translate-middle"
          ></div>
          {/* Round resizer */}
          <div ref={topleftResize} className="resizer resizer-topleft round-resizer start-0 top-0 translate-middle"></div>
          <div ref={toprightResize} className="resizer resizer-topright round-resizer start-100 top-0 translate-middle"></div>
          <div ref={bottomleftResize} className="resizer resizer-bottomleft round-resizer start-0 top-100 translate-middle"></div>
          <div ref={bottomrightResize} className="resizer resizer-bottomright round-resizer start-100 top-100 translate-middle"></div>
        </>
      )}
    </div>
  );
}

export default Box
