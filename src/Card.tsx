import React from "react";

export interface ICardProps {
  color: string;
  isFlipped: boolean;
}

export const Card: React.FC<ICardProps> = ({ color, isFlipped }) => {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      style={{ backgroundColor: isFlipped ? color : "gray" }}
    >
      {isFlipped ? color : ""}
    </div>
  );
};
