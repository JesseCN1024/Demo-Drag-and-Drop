import './App.css';
import DraggableWhitespace from './components/Whitespace';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [coors, setCoors] = useState([
    {
      id: 1,
      x: 0,
      y: 0,
      isSelected: false,
      z: 0
    },
    {
      id: 2,
      x: 20,
      y: 20,
      isSelected: false,
      z: 0
    },
    {
      id: 3,
      x: 80,
      y: 90,
      isSelected: false,
      z: 0
    }
  ]);

  const currentSelected = coors.find(coor => coor.isSelected) || undefined;
  
  const inputX = useRef(null);
  const inputY = useRef(null);
  const inputZ = useRef(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputX && inputY){
      const x = parseFloat(inputX.current.value);
      const y = parseFloat(inputY.current.value);
      const z = parseFloat(inputZ.current.value);
      if (x && y){
        setCoors(prev => prev.map(coor => (coor.id===currentSelected.id ? {
          ...coor,
          x: x,
          y: y,
          z: z
        } : coor)))
      }
    }
  }
  const changeZValue = (isUp) => {
    let z = parseInt(inputZ.current.value);
    console.log(z);
    if (isUp){
      if (z<10) z = z+1;
    }
    else{
      if (z>0) z = z-1;
    }
    console.log(z);
    inputZ.current.value = z;
  }


  useEffect(() => {
    // SET VALUE FOR TWO INPUT BOX TO SHOW THE CURRENT POSTION OF AN ELEMENT

    if (currentSelected){
      inputX.current.value = currentSelected?.x || 0;
      inputY.current.value = currentSelected?.y || 0;
      inputZ.current.value = currentSelected?.z || 0;
    } 
    // if (inputY) 
    // document.querySelector(".input1").value = currentSelected?.x || 0;
    // document.querySelector('.input2').value = currentSelected?.y || 0;
    // document.querySelector('.input3').value = currentSelected?.z || -1;
  }, [coors])
 
  return (
    <div className="App m-5">
      <div className="d-flex">
        <DraggableWhitespace
          coors={coors}
          setCoors={setCoors}
        ></DraggableWhitespace>
        {/* Info Board */}
        <div>
          {/* X, Y Info */}
          <form
            action=""
            className="d-inline-block border border-secondary p-3 mx-1"
            onSubmit={(event) => handleSubmit(event)}
          >
            <strong className="d-block">
              Selected:{" "}
              {currentSelected ? "Drag me " + currentSelected?.id : "None"}{" "}
            </strong>
            {currentSelected && (
              <>
                <label htmlFor="x" className="form-label">
                  X
                </label>
                <input
                  type="text"
                  ref={inputX}
                  name="x"
                  className="form-control input1"
                />
                <label htmlFor="y" className="form-label">
                  Y
                </label>
                <input
                  type="text"
                  ref={inputY}
                  name="y"
                  className="form-control input2"
                />
                {/* Z-index and layering  */}
                <label htmlFor="" className="form-label">Z</label>
                <input ref={inputZ} type="text" className="form-control input3" name='z' readOnly/>
                <div className='d-flex justify-content-center mt-2'>
                  <button className="btn btn-primary me-2" onClick={() => changeZValue(true)}>Up</button>
                  <button className="btn btn-primary" onClick={() => changeZValue(false)}>Down</button>
                </div>
                {/* Submit button */}
                <button className="btn btn-primary mt-2" type="submit">
                  Confirm
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      <button
        className="btn btn-primary mt-2 d-block"
        onClick={() => {
          console.log(coors);
        }}
      >
        Show x/y
      </button>
    </div>
  );
}

export default App;
