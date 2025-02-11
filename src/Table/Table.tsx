import React, { useRef, useState } from "react"
import { Dice, DiceHandle, Side } from "../Dice/Dice"
import "./Table.css"
import { Result } from "../Result/Result";
import { ResultsList } from "../ResultsList/ResultsList";
import { Link } from "react-router-dom";


export function Table() {
    const diceOne = useRef<DiceHandle>(null);
    const diceTwo = useRef<DiceHandle>(null);
    const diceThree = useRef<DiceHandle>(null);
    const diceFour = useRef<DiceHandle>(null);
    const [helpDice, setHelpDice] = useState(false)
    const [isRolling, setIsRolling] = useState(false)
    const [results, setResults] = useState<Side[]>([]); // Состояние для хранения результатов

    const [lastSide, setLastSide] = useState<Side | undefined>(undefined);

    // Функция обратного вызова для получения значения currentSide
    const handleSideChange = (side: Side) => {
        setLastSide(side);
        console.log("Текущая сторона:", side);
    };

    const rollAllDice = () => {
        const newResults: Side[] = []; // Массив для хранения результатов бросков
        setIsRolling(true)

        diceOne.current?.roll();
        diceTwo.current?.roll();
        diceThree.current?.roll();
        if (helpDice) {
            diceFour.current?.roll();
        }

        setTimeout(() => {
            if (diceOne.current) {
                newResults.push(diceOne.current.getCurrentSide());
            }
            if (diceTwo.current) {
                newResults.push(diceTwo.current.getCurrentSide());
            }
            if (diceThree.current) {
                newResults.push(diceThree.current.getCurrentSide());
            }
            if (helpDice && diceFour.current) {
                newResults.push(diceFour.current.getCurrentSide());
            }
            setResults(newResults);
            setIsRolling(false);
        }, 1000);

    };

    return (
        <div className="table">
            <div className="table-dices">
                <Dice ref={diceOne} onSideChange={handleSideChange}/>
                <Dice ref={diceTwo} onSideChange={handleSideChange}/>
                <Dice ref={diceThree} onSideChange={handleSideChange}/>
                {helpDice && <Dice ref={diceFour} onSideChange={handleSideChange}/>}
            </div>
            <button className="table-roll" onClick={rollAllDice} disabled={isRolling}>Бросить кубики</button>
            {!helpDice && (
                <button className="table-add" onClick={() => setHelpDice(true)} disabled={isRolling}>Добавить кубик</button> // Используем setHelpDice для обновления состояния
            )}
            {helpDice && 
                <button className="table-remove" onClick={() => setHelpDice(false)} disabled={isRolling}>Убрать кубик</button> // Используем setHelpDice для обновления состояния
            }
            <Result results={results} />
            <Link to={"/results"}> <button className="table-nav-button"></button> </Link>
        </div>
    )
}