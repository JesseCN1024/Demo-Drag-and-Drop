import React, {componentDidMount} from 'react';
import './App.css';
import DraggableWhitespace from './components/Whitespace';
import { useEffect, useRef, useState } from 'react';

function App() {
  // STATES AND VARIABLES
  const coorRatio = { x: 100, y: 80 };
  const [ratio, setRatio] = React.useState({x: 0, y:0});
  const [coors, setCoors] = useState([
    {
      id: 1,
      x: 0,
      y: 0,
      dw: 60,
      dh: 60,
      w: 60,
      h: 50,
      isSelected: false,
      z: 0
    },
    {
      id: 2,
      x: 20,
      y: 20,
      dw: 60,
      dh: 60,
      w: 60,
      h: 50,
      isSelected: false,
      z: 0
    },
    {
      id: 3,
      x: 80,
      y: 90,
      dw: 120,
      dh: 100,
      w: 120,
      h: 100,
      isSelected: false,
      z: 0
    }
  ]);
  

  const currentSelected = coors.find(coor => coor.isSelected) || undefined;
  
  const inputX = useRef(null);
  const inputY = useRef(null);
  const inputZ = useRef(null);
  const inputW = useRef(null);
  const inputH = useRef(null);

  // FUNCTIONS
  const updateCoors = (id, values, syncValues) => {
    setCoors(prev => prev.map(coor => {
      if (coor.id === id) return {...coor, ...values};
      if (syncValues) return {...coor, ...syncValues};
      return coor;
    }))
  }


  // EVENT FUNCTIONS
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputX && inputY){
      const x = parseFloat(inputX.current.value)/ratio.x;
      const y = parseFloat(inputY.current.value)/ratio.y;
      const z = parseFloat(inputZ.current.value);
      const dw = parseFloat(inputW.current.value);
      const dh = parseFloat(inputH.current.value);
      if (x && y){
        setCoors(prev => prev.map(coor => (coor.id===currentSelected.id ? {
          ...coor,
          x, y, z, dw, dh
        } : coor)))
      }
    }
  }
  const changeZValue = (event, isUp) => {
    event.preventDefault();
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

  // USE EFFECTS
  useEffect(() => {
    if (currentSelected){
      inputX.current.value = ((currentSelected?.x || 0)*ratio.x).toFixed(4);
      inputY.current.value = ((currentSelected?.y || 0)*ratio.y).toFixed(4);
      inputZ.current.value = currentSelected?.z || 0;
      inputW.current.value = currentSelected?.dw;
      inputH.current.value = currentSelected?.dh;
    } 
  }, [coors])
 
  return (
    <div className="App m-5">
      <div className="d-flex">
        <DraggableWhitespace
          coors={coors}
          setCoors={setCoors}
          coorRatio={coorRatio}
          setRatio={setRatio}
          updateCoors = {updateCoors}
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
                  <div className="btn btn-primary me-2" onClick={(event) => changeZValue(event,true)}>Up</div>
                  <div className="btn btn-primary" onClick={(event) => changeZValue(event,false)}>Down</div>
                </div>
                {/* Width and Height %*/}
                <label className='mt-2'>Default Width</label>
                <div className="d-flex align-items-center">
                  <input type="text" ref={inputW} className="form-control w-50"/>
                  <span className='ms-2'> ~ 100% </span>
                </div>
                <input type="text" className="form-control input3" readOnly value={`${currentSelected.w * 100 / currentSelected.dw}%`}/>
                <label className='mt-2'>Default Height</label>
                <div className="d-flex align-items-center">
                  <input type="text" ref={inputH} className="form-control w-50"/>
                  <span className='ms-2'> ~ 100% </span>
                </div>
                <input type="text" className="form-control input3" readOnly value={`${currentSelected.h * 100 / currentSelected.dh}%`}/>

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
        className="btn btn-primary mt-5 d-block"
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
