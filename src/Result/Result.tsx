import React, { useEffect } from "react";
import { Side } from "../Dice/Dice";
import "./Result.css"

interface ResultProps {
    results: Side[];
}

export function Result({ results }: ResultProps) {
    // Инициализируем значения для каждой категории
    const totals = {
        bullet: 0,
        head: 0,
        body: 0,
        arms: 0,
        legs: 0,
    };

    // Подсчитываем результаты
    results.forEach(result => {
        totals.bullet += result.bullet || 0;
        totals.head += result.head || 0;
        totals.body += result.body || 0;
        totals.arms += result.arms || 0;
        totals.legs += result.legs || 0;
    });

    // Получаем текущее время
    const currentTime = new Date().toLocaleString();

    // Создаем новый результат
    const newResult = {
        totals,
        time: currentTime,
    };

    // Сохраняем все результаты в localStorage
    useEffect(() => {
        if(
            newResult.totals.bullet === 0 && 
            newResult.totals.head === 0 && 
            newResult.totals.body === 0 && 
            newResult.totals.arms === 0 && 
            newResult.totals.legs === 0
        ) {
            return
        } else {
            const storedResults = JSON.parse(localStorage.getItem("results") || "[]");
            storedResults.push(newResult);
            localStorage.setItem("results", JSON.stringify(storedResults));
        }


    }, [newResult]);

    return (
        <div className="result">
            <h2>Результаты броска:</h2>
            {totals.bullet > 0 && <p>Попадания: {totals.bullet}</p>}
            <div className="result-limbs">
                {totals.head > 0 && <p>Голова: {totals.head}</p>}
                {totals.body > 0 && <p>Тело: {totals.body}</p>}
                {totals.arms > 0 && <p>Руки: {totals.arms}</p>}
                {totals.legs > 0 && <p>Ноги: {totals.legs}</p>}
            </div>
        </div>
    );

}