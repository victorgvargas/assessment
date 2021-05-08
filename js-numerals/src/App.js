import React, { useState } from "react";
import Converter from "./components/Converter";

function App() {
  const [number, setNumber] = useState(0);

  const handleChange = (event) => setNumber(event.target.value);

  return (
    <div className="container">
      <form>
        <label>Insert number here:</label>
        <input type="number" value={number} onChange={handleChange} required />
      </form>
      <Converter number={number} />
    </div>
  );
}

export default App;
