import { useEffect, useState } from "react";
import "./App.css";
// import '@fortawesome/fontawesome-free/css/all.css';
import Dice from "./components/Dice";
import { nanoid } from "nanoid";
import ConfettiExplosion from "react-confetti-explosion";

function App() {
    const [dice, setDice] = useState(allNewArray());
    const [tenzies, setTenzies] = useState(false);
    const [rollCount, setRollCount] = useState(0);
    const [timer, setTimer] = useState({
        sec: 0,
        min: 0,
    });
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstValue);

        if (allSameValue && allHeld) {
            setTenzies(true);
        }
    }, [dice]);

    useEffect(() => {
        // let interval = null;
        if (isRunning) {
            const interval = setInterval(() => {
                // Update the timer state
                setTimer((prevTimer) => {
                    const newSec = prevTimer.sec + 1;
                    const newMin = prevTimer.min + Math.floor(newSec / 60);
                    return {
                        sec: newSec % 60,
                        min: newMin,
                    };
                });
            }, 1000); // Run the interval every second (1000 milliseconds)

            // Clean up the interval when the component unmounts
            return () => {
                clearInterval(interval);
            };
        }
    }, [isRunning]);

    function generateNewDice() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
        };
    }

    function allNewArray() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDice());
        }
        return newDice;
    }

    const holdDice = (id) => {
        setDice((oldDice) =>
            oldDice.map((die) =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        );
    };

    const diceElements = dice.map((die) => {
        return (
            <Dice
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDice={() => holdDice(die.id)}
            />
        );
    });

    const rollDice = () => {
        if (isRunning) {
            setIsRunning(false);
        }
        if (!tenzies) {
            setDice((oldDice) =>
                oldDice.map((die) => (die.isHeld ? die : generateNewDice()))
            );
            // setRollCount((oldDice) => oldDice + 1);
        } else {
            setTenzies(false);
            setDice(allNewArray());
            setRollCount(0);
            setTimer({ sec: 0, min: 0 });
        }
        setRollCount((oldCount) => oldCount + 1);
    };

    return (
        <main>
            {tenzies && <ConfettiExplosion />}
            <div className="timer--container">
                <div className="timer">
                <span>{timer.min.toString().padStart(2, "0")}:</span>
                <span>{timer.sec.toString().padStart(2, "0")}</span>
                </div>
            </div>
            <h2>Tenzies</h2>
            {tenzies ? (
                <section>
                    <p className="message">You've Won!! 🎉</p>
                    <p className="message-stats">Total Rolls: {rollCount}</p>
                </section>
            ) : (
                <p>
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
            )}
            <div className="die-container">{diceElements}</div>
            <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
            <p className="roll-count">{rollCount}</p>
        </main>
    );
}

export default App;
