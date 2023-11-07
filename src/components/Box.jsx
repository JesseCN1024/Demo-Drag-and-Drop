import React, { useEffect, useRef } from 'react'

function Box(props) {
    const ref = useRef(null);
    useEffect(() => {
        // Update the position when it's first loaded
        ref.current.style.transform = `translate(${props.coor.baseX}px, ${props.coor.baseY}px)`;
    }, [])
    const handleMouseDown = (e) => {
        props.setCoorsChanged(true);
        // Select the box
        props.setCoors(prev => prev.map(coor => ({...coor, isSelected: coor.id===props.coor.id})));
        // Store original mouse position
        const ratio = window.devicePixelRatio;
        const startX = e.clientX * ratio;
        const startY = e.clientY * ratio;
        let dx, dy;

        const handleMouseMove = (e) => {
            dx = e.clientX * ratio - startX + props.coor.x;
            dy = e.clientY * ratio - startY + props.coor.y;

            // Update element position
            ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
            props.setCoors((prev) =>
                prev.map(coor => {
                    if (coor.id === props.coor.id) return { ...coor, x: dx, y: dy };
                    return coor;
                })
            );
        };

        // Attach event listeners
        document.addEventListener("mousemove", handleMouseMove);

        // Clean up the 
        function handleMouseUp() {
            // Clean up event listeners
            document.removeEventListener("mousemove", handleMouseMove);
        }
        document.addEventListener("mouseup", handleMouseUp);
    };


  return (
    <div
      ref={ref}
      className={`bg-primary text-center box ${props.coor.isSelected && "box-selected"}`}
      onMouseDown={handleMouseDown}
    >
      Drag Me {props.coor.id}
    </div>
  );
}

export default Box