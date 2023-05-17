import React from "react";
import { Card, ICardProps } from "./Card";

export interface IPlayerProps {
  name: string;
  isTurn: boolean;
  cards: ICardProps[];
}

export const Player: React.FC<IPlayerProps> = ({ name, isTurn, cards }) => {
  return (
    <div className={`player ${isTurn ? "turn" : ""}`}>
      <h2>{name}</h2>
      <div className="cards">
        {cards.map((card: ICardProps, index) => (
          <Card key={index} color={card.color} isFlipped={card.isFlipped} />
        ))}
      </div>
    </div>
  );
};
