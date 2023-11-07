import './App.css';
import Box1 from './components/Box1';
import Box2 from "./components/Box2"
import Box3 from "./components/Box3"
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


  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputX && inputY){
      const x = parseFloat(inputX.current.value);
      const y = parseFloat(inputY.current.value);
      if (x && y){
        setCoors(prev => prev.map(coor => (coor.id===currentSelected.id ? {
          ...coor,
          x: x,
          y: y
        } : coor)))
      }
    }
  }

  useEffect(() => {
    // if (inputX) inputX.current.value = currentSelected?.x || 0;
    // if (inputY) inputY.current.value = currentSelected?.y || 0;
  }, [coors])
 
  return (
    <div className="App m-5">
      <div className="d-flex">
        <DraggableWhitespace
          coors={coors}
          setCoors={setCoors}
        ></DraggableWhitespace>
        {/* Form Info */}
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
                className="form-control"
              />
              <label htmlFor="y" className="form-label">
                Y
              </label>
              <input
                type="text"
                ref={inputY}
                name="y"
                className="form-control"
              />
              <button className="btn btn-primary mt-2" type="submit">
                Confirm
              </button>
              {/* <div className='d-flex'>
                <button className="btn btn-primary up">Up</button>
                <button className="btn btn-primary down">Down</button>
              </div> */}
            </>
          )}
        </form>
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
