import React, { useState, useEffect } from "react";

const Dice = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "white" : "black",
    };
    const [diceNumber, setDiceNumber] = useState("");

    //NOTE - You can also use if statement as well.
    useEffect(() => {
        const diceNumberMapping = {
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six",
        };

        setDiceNumber(diceNumberMapping[props.value] || "");
    }, [props.value]);

    return (
        <div className="dice--face" style={styles} onClick={props.holdDice}>
            <h2 className="die-num">
                <i
                    className={`fas fa-dice-${diceNumber}`}
                    style={{
                        color: props.isHeld ? "#26a641" : "white",
                    }}
                ></i>
            </h2>
        </div>
    );
};

export default Dice;
