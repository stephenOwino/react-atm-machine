import React, { useState, useEffect } from "react";
import axios from "axios";
import Money from "./images/money.jpg";
import Mbao from "./images/mbao.jpg";

function ATM() {
  const [accountId, setAccountId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [footerText, setFooterText] = useState("");
  const words = ["ATM-MACHINE:", "Deposit", "Withdraw", "Check Balance"];
  const footerWords = ["DEVELOPED BY:", "Stephen", "Otieno", "Owino"];
  const intervalDuration = 2000; // 2 seconds

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setDisplayText(words[currentIndex]);
      currentIndex = (currentIndex + 1) % words.length;
    }, intervalDuration);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setFooterText(footerWords[currentIndex]);
      currentIndex = (currentIndex + 1) % footerWords.length;
    }, intervalDuration);

    return () => clearInterval(intervalId);
  }, []);

  const handleDeposit = async () => {
    try {
      console.log("Handling Deposit...");
      const response = await axios.post(
        "http://localhost:8080/api/atm/deposit",
        {
          amount: parseFloat(amount),
          accountId: parseInt(accountId),
        }
      );
      console.log("Deposit Response:", response.data);
      setResult(response.data);
    } catch (error) {
      console.error("Deposit Error:", error.response.data);
      setResult(error.response.data);
    }
  };

  const handleWithdraw = async () => {
    try {
      console.log("Handling Withdraw...");
      const response = await axios.post(
        "http://localhost:8080/api/atm/withdraw",
        {
          amount: parseFloat(amount),
          accountId: parseInt(accountId),
        }
      );
      console.log("Withdraw Response:", response.data);
      setResult(response.data);
    } catch (error) {
      console.error("Withdraw Error:", error.response.data);
      setResult(error.response.data);
    }
  };

  const handleCheckBalance = async () => {
    try {
      console.log("Handling Check Balance...");
      const response = await axios.get(
        `http://localhost:8080/api/atm/balance?accountId=${accountId}`
      );
      console.log("Check Balance Response:", response.data);
      setResult(response.data);
    } catch (error) {
      console.error("Check Balance Error:", error.response.data);
      setResult(error.response.data);
    }
  };

  return (
    <div className="app-container">
      <h1>{displayText}</h1>
      <div className="input-container">
        <label>
          Account ID:
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
        </label>
        <label className="container2">
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <div className="button-container">
        <button className="deposit" onClick={handleDeposit}>
          Deposit
        </button>
        <button className="withdraw" onClick={handleWithdraw}>
          Withdraw
        </button>
        <button className="checkBalance" onClick={handleCheckBalance}>
          Check Balance
        </button>

        <div>
          <img className="image" src={Money} alt="Money" />
        </div>

        <div className="result-container">
          <strong>Result:</strong> {result}
        </div>

        <p className="footer-text">{footerText}</p>

        <img className="mbao" src={Mbao} alt="Mbao" />
      </div>
    </div>
  );
}

export default ATM;
