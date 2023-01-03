import Die from "./component/Die";
import "./index.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  // step 1 function that generates random numbers
  const randomNum = () => {
    const numbers = [];
    for (let i = 0; i < 10; i++) {
      numbers.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return numbers;
  };

  const [dice, setDice] = useState(randomNum());
  const [tenzies, setTenzies] = useState(false);

  // step 5 winning logic
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  // step 3 Button  to roll dice
  const rollDice = () => {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld
            ? die
            : {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
              };
        })
      );
    } else {
      setTenzies(false);
      setDice(randomNum());
    }
  };

  //step 4 fuction to holddice

  const holdDice = (id) => {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  // step 2 mapped random numbers
  const displayDie = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        hold={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  return (
    <div>
      <div className="container">
        {tenzies && <Confetti />}

        <h1>Tenzies</h1>
        <span style={{ textAlign: "center" }}>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </span>
        <div className="die-container">{displayDie}</div>

        <button className="btn-btn" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll Dice"}
        </button>
      </div>
    </div>
  );
}

export default App;
