import React, { useEffect, useRef } from 'react'
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';

function Box(props) {
    const ref = useRef(null);
    useEffect(() => {
      // console.log('re-effect', props.coor.x)
      // Update the position when it's first loaded
      ref.current.style.setProperty("--left", `${props.coor.x}px`);
      ref.current.style.setProperty("--top", `${props.coor.y}px`);
      // ref.current.style.transform = `translate(${props.coor.baseX}px, ${props.coor.baseY}px)`;
    }, [props.coor]);

    const getRef= (s) => {
      if (['--left', '--top'].includes(s)){
        return parseFloat(ref.current.style.getPropertyValue(s).slice(0,-2));
      } 
      return 0;
    }
    const handleMouseDown = (e) => {
        // Select the box
        ref.current.classList.add("box-selected");
        const ratio = window.devicePixelRatio;
        const startMouseX = e.clientX;
        const startMouseY = e.clientY;
        const startX = getRef('--left');
        const startY = getRef('--top');
        
        const handleMouseMove = (e) => {
            let dx, dy;
            // New position of element
            dx = (e.clientX - startMouseX + startX) * ratio;
            dy = (e.clientY - startMouseY + startY) * ratio;

            // Update element position
            // ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
            ref.current.style.setProperty('--left', `${dx}px`);
            ref.current.style.setProperty("--top", `${dy}px`);
        };
        // Attach event listeners
        document.addEventListener("mousemove", handleMouseMove);

        // When user loosen the pointer 
        const handleMouseUp = () => {
          // Clean up event listeners
          ref.current.classList.remove("box-selected");
          document.removeEventListener("mousemove", handleMouseMove);
          // Update state
          props.setCoors(prev => prev.map(coor => {
            if (coor.id === props.coor.id)
              return {
                ...coor,
                x: parseFloat(
                  ref.current.style.getPropertyValue("--left").slice(0, -2)
                ),
                y: parseFloat(
                  ref.current.style.getPropertyValue("--top").slice(0, -2)
                ),
                isSelected: true
              };
            return {...coor, isSelected:false};
          }));
          document.removeEventListener('mouseup', handleMouseUp)
        }
        document.addEventListener("mouseup", handleMouseUp);
    };

    useEffect(() => {
      ref.current.addEventListener("mousedown", handleMouseDown);
      return () => {
        ref.current.removeEventListener('mousedown', handleMouseDown);
      };
    }, []);


  return (
    <div
      ref={ref}
      className={`bg-primary text-center box ${props.coor.isSelected && "box-selected"}`}
    >
      Drag Me {props.coor.id}
    </div>
  );
}

export default Box