import React from "react";
import Currency from "./components/Currency";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const URL = "https://api.exchangeratesapi.io/latest";

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  // console.log(currencies);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) =>
        setCurrencies([response.data.base, ...Object.keys(response.data.rates)])
      );
  }, []);

  return (
    <div className="App">
      <h1>Convert</h1>
      <Currency currencies={currencies} />
      <div className="equals">=</div>
      <Currency currencies={currencies} />
    </div>
  );
};

export default App;
