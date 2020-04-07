import React from "react";
import Currency from "./components/Currency";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Convert</h1>
      <Currency />
      <div className="equals">=</div>
      <Currency />
    </div>
  );
}

export default App;
