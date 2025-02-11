import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";
import "./Dice.css"

export interface Side {
    id: number,
    bullet: number,
    head: number,
    body: number,
    arms: number,
    legs: number
}

export interface DiceHandle {
    roll: () => void;
    getCurrentSide: () => Side;
}

export interface DiceProps {
    onSideChange: (side: Side) => void; // Пропс для функции обратного вызова
}

export const Dice = forwardRef<DiceHandle, DiceProps>(({ onSideChange }, ref) => {
    const sides: Side[] = [
        { id: 0, bullet: 0, head: 0, body: 0, arms: 0, legs: 1 },
        { id: 1, bullet: 1, head: 0, body: 1, arms: 0, legs: 0 },
        { id: 2, bullet: 0, head: 0, body: 1, arms: 0, legs: 0 },
        { id: 3, bullet: 1, head: 0, body: 0, arms: 1, legs: 0 },
        { id: 4, bullet: 1, head: 1, body: 0, arms: 0, legs: 0 },
        { id: 5, bullet: 2, head: 0, body: 1, arms: 1, legs: 1 }
    ];
    // Значение по умолчанию
    const defaultSide: Side = { id: 6, bullet: 0, head: 0, body: 0, arms: 0, legs: 0 };
    
    const [currentSide, setCurrentSide] = useState<Side>(defaultSide); // Состояние для отслеживания стороны
    const [isRolling, setIsRolling] = useState(false); // Состояние для отслеживания анимации
    
    // Позволяем родительскому компоненту вызывать roll
    useImperativeHandle(ref, () => ({
        roll,
        getCurrentSide: () => currentSide
    }));

    // Функция для броска кости
    const roll = () => {
        setIsRolling(true);
        const randomIndex = Math.floor(Math.random() * sides.length);
        const newSide = sides[randomIndex];
        setCurrentSide(newSide);
        onSideChange(newSide)
        setTimeout(() => {
            setIsRolling(false); // Заканчиваем анимацию
        }, 1000); // Задержка, чтобы анимация успела завершиться
    };

    return (
        <div className="dice">
            <button className={`dice-button diсe-button-${currentSide.id} ${isRolling ? 'rolling' : ''}`} onClick={roll} disabled={isRolling}>
            </button>
        </div>
    );
})