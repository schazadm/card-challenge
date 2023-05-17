import React from "react";
import { IPlayerProps } from "./Player";
import "./WinnerCard.css";
import crown from "./assets/crown.svg";

export interface IWinnerCardProps {
  round: number;
  winner: IPlayerProps;
  others: IPlayerProps[];
}

function sortByFlippedCards(a, b) {
  const flippedCardsA = a.cards.filter((card) => card.isFlipped).length;
  const flippedCardsB = b.cards.filter((card) => card.isFlipped).length;
  return flippedCardsB - flippedCardsA;
}

export const WinnerCard: React.FC<IWinnerCardProps> = ({
  round,
  winner,
  others,
}) => {
  others.sort(sortByFlippedCards);
  return (
    <div className="winnerCard">
      <span className="title">
        <img src={crown} className="logo" /> Nach {round} Spielrunden
      </span>
      <ul className="list">
        <li key={0}>1. {winner.name}</li>
        {others.map((player, index) => (
          <li key={index + 1}>
            {index + 2}. {player.name}
            <span
              style={{
                float: "right",
                marginRight: "10px",
              }}
            >
              {player.cards.filter((val) => !val.isFlipped).length}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
