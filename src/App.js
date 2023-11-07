import logo from './logo.svg';
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
      baseX: 0,
      baseY: 0,
      x: 0,
      y: 0,
      isSelected: false
    },
    {
      id: 2,
      baseX: 20,
      baseY: 20,
      x: 20,
      y: 20,
      isSelected: false
    },
    {
      id: 3,
      baseX: 100,
      baseY: 60,
      x: 100,
      y: 60,
      isSelected: false
    }
  ]);
  const [coorsChanged, setCoorsChanged] = useState(false);
  const currentSelected = coors.find(coor => coor.isSelected) || undefined;
  // const handleChange = (event) => {
  //   setCoors (prevCoors => prevCoors.map(coor => (!coor.isSelected ? coor : {
  //     ...coor,
  //     [event.target.name]: parseFloat(event.target.value)
  //   })))
  // }
  const inputX = useRef(null);
  const inputY = useRef(null);
  // useEffect(() => {
  //   const x = currentSelected?.x || 0;
  //   const y = currentSelected ? (currentSelected?.y + (currentSelected.id - 1) * 50) : 0;
  //   console.log(x,y);

  // },[coorsChanged])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputX && inputY){
      const x = parseFloat(inputX.current.value);
      const y = parseFloat(inputY.current.value);
      if (x && y){
        setCoors(prev => prev.map(coor => (coor.id===currentSelected.id ? {
          ...coor,
          x: x,
          y: y - (currentSelected.id-1)*50
        } : coor)))
      }
    }
  }
  return (
    <div className="App m-5">
      <div className="d-flex">
        <DraggableWhitespace
          coors={coors}
          setCoors={setCoors}
          setCoorsChanged={setCoorsChanged}
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
