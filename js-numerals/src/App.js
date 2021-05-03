import React, { useState } from "react";
import Converter from "./components/Converter";

function App() {
  const [number, setNumber] = useState(0);

  const handleChange = (event) => setNumber(event.target.value);

  return (
    <div className="container">
      <form>
        <label for="Number">Insert number here:</label>
        <input
          type="number"
          id="Number"
          value={number}
          onChange={handleChange}
          required
        />
      </form>
      <Converter number={number} />
    </div>
  );
}

export default App;
