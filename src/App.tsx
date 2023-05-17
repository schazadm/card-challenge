import React, { useState } from "react";
import "./App.css";
import { ICardProps } from "./Card";
import { Game } from "./Game";
import { IPlayerProps } from "./Player";

export const App: React.FC = () => {
  const [amountOfPlayers, setAmountOfPlayers] = useState(4);
  const [amountOfCards, setAmountOfCards] = useState(5);
  const playerNames = [
    "Alice",
    "Bob",
    "Carol",
    "Mario",
    "Samson",
    "Hayley",
    "Wesley",
    "Jason",
    "Myah",
    "Kyla",
  ];
  const possibleColors = ["red", "blue", "green", "orange", "purple", "pink"];
  const players: IPlayerProps[] = [];

  const handleChangeAmountOfPlayer = (e) => {
    if (e.target.value < 2 || e.target.value > 10) return;
    setAmountOfPlayers(e.target.value);
  };

  const handleChangeAmountOfCards = (e) => {
    if (e.target.value < 2) return;
    setAmountOfCards(e.target.value);
  };

  const getRandomColor = () => {
    return possibleColors[Math.floor(Math.random() * possibleColors.length)];
  };

  for (let i = 0; i < amountOfPlayers; i++) {
    let tmpCards: ICardProps[] = [];
    for (let j = 0; j < amountOfCards; j++) {
      tmpCards.push({
        color: getRandomColor(),
        isFlipped: false,
      });
    }
    players.push({
      name: playerNames[i],
      isTurn: false,
      cards: tmpCards,
    });
  }

  return (
    <>
      <div className="config">
        <div>
          <label htmlFor="nPlayers">Amount of Players:</label>
          <input
            onChange={handleChangeAmountOfPlayer}
            value={amountOfPlayers}
            id="nPlayers"
            type="number"
            placeholder="Amount of players"
            min={2}
            max={10}
          />
        </div>
        <div>
          <label htmlFor="nCards">Amount of Cards:</label>
          <input
            onChange={handleChangeAmountOfCards}
            value={amountOfCards}
            id="nCards"
            type="number"
            placeholder="Amount of cards"
            min={2}
          />
        </div>
      </div>

      <Game players={players} getRandomColor={getRandomColor} />
    </>
  );
};
