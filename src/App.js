import React from "react";
import Currency from "./components/Currency";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const URL = "https://api.exchangeratesapi.io/latest";

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [fromAmountCheck, setFromAmountCheck] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  let toAmount, fromAmount;

  if (fromAmountCheck) {
    fromAmount = amount;
    toAmount = exchangeRate * amount;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    axios.get(URL).then((response) => {
      const firstCurrency = Object.keys(response.data.rates)[0];
      setCurrencies([response.data.base, ...Object.keys(response.data.rates)]);
      setFrom(response.data.base);
      setTo(firstCurrency);
      setExchangeRate(response.data.rates[firstCurrency]);
      setLastUpdated(response.data.date);
    });
  }, []);

  useEffect(() => {
    if (from != null && to != null) {
      axios
        .get(`${URL}?base=${from}&symbols=${to}`)
        .then((response) => setExchangeRate(response.data.rates[to]));
    }
  }, [from, to]);

  const handleOnChangeAmountFrom = (e) => {
    setAmount(e.target.value);
    setFromAmountCheck(true);
  };

  const handleOnChangeAmountTo = (e) => {
    setAmount(e.target.value);
    setFromAmountCheck(false);
  };

  return (
    <div className="App">
      <h1>Convert</h1>
      <Currency
        currencies={currencies}
        selectedCurrency={from}
        onChangeCurrency={(e) => setFrom(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleOnChangeAmountFrom}
      />
      <div className="equals">=</div>
      <Currency
        currencies={currencies}
        selectedCurrency={to}
        onChangeCurrency={(e) => setTo(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleOnChangeAmountTo}
      />
      <div className="last-updated">Rates accurate as of {lastUpdated}</div>
    </div>
  );
};

export default App;
