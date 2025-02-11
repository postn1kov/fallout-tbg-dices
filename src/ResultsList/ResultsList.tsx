import React, { useEffect, useState } from "react";
import "./ResultsList.css";
import { Link } from "react-router-dom";

interface Result {
    totals: {
        bullet: number;
        head: number;
        body: number;
        arms: number;
        legs: number;
    };
    time: string;
}

export function ResultsList() {
    const [results, setResults] = useState<Result[]>([]);

    useEffect(() => {
        const storedResults = JSON.parse(localStorage.getItem("results") || "[]");

         // Переворачиваем массив результатов
        const reversedResults = storedResults.reverse();

        setResults(reversedResults);
    }, []);

    // Функция для очистки localStorage и обновления состояния с подтверждением
    const clearResults = () => {
        const confirmClear = window.confirm("Вы уверены, что хотите очистить все результаты?");
        if (confirmClear) {
            localStorage.removeItem("results"); // Очищаем localStorage
            setResults([]); // Обновляем состояние, чтобы отобразить пустой список
        }
    };

    return (
        <div className="results-list">
            <Link to={"/"}>
                <button className="results-nav-button"></button>
            </Link>
            <h2>Список результатов бросков:</h2>
            {results.length === 0 ? (
                <p>Нет результатов для отображения.</p>
            ) : (
                <>
                <ul>
                    {results.map((result, index) => (
                        <li key={index} className="results-list-item">
                            <p>Время: {result.time}</p>
                            <div className="results-list-limbs">
                                <p>Попадания: {result.totals.bullet}</p>
                                <p>Голова: {result.totals.head}</p>
                                <p>Тело: {result.totals.body}</p>
                                <p>Руки: {result.totals.arms}</p>
                                <p>Ноги: {result.totals.legs}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={clearResults} className="results-clear-button"></button>
                </>
            )}
        </div>
    );
}