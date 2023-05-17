import React, { useState } from "react";
import { ICardProps } from "./Card";
import { IPlayerProps, Player } from "./Player";
import { WinnerCard } from "./WinnerCard";

export interface IGameProps {
  players: IPlayerProps[];
  getRandomColor;
}

export const Game: React.FC<IGameProps> = ({ players, getRandomColor }) => {
  const [currPlayer, setCurrPlayer] = useState<IPlayerProps>(players[0]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [randomColor, setRandomColor] = useState("");
  const [turnNumber, setTurnNumber] = useState(1);
  const [winner, setWinner] = useState(false);

  const rollDice = () => {
    let randomColor = getRandomColor();
    let turnCard: ICardProps = {
      color: randomColor,
      isFlipped: false,
    };
    setRandomColor(randomColor);
    let index = indexOfCard(turnCard);
    if (index !== -1) {
      currPlayer.cards[index].isFlipped = true;
      if (currPlayer.cards.every((card) => card.isFlipped)) {
        setWinner(true);
      }
    }
  };

  const indexOfCard = (cardToSearch: ICardProps): number => {
    for (let i = 0; i < currPlayer.cards.length; i++) {
      if (
        currPlayer.cards[i].color === cardToSearch.color &&
        currPlayer.cards[i].isFlipped === cardToSearch.isFlipped
      )
        return i;
    }
    return -1;
  };

  const nextPerson = () => {
    let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    setCurrPlayer(players[nextPlayerIndex]);
    setTurnNumber((prev) => prev + 1);
  };

  if (winner) {
    let others = [...players];
    delete others[currentPlayerIndex];
    return (
      <>
        <WinnerCard round={turnNumber} winner={currPlayer} others={others} />
        <button onClick={() => window.location.reload()}>
          Click to reload!
        </button>
      </>
    );
  }

  return (
    <div>
      <h2>
        Runde {turnNumber} - {currPlayer && currPlayer.name} ist an der Reihe
      </h2>
      <button onClick={rollDice}>Würfeln</button>
      <button onClick={nextPerson}>Nächster</button>
      <h2>Farbe gewürfelt: {randomColor}</h2>
      <div className="game">
        {players.map((player: IPlayerProps, index: number) => (
          <Player
            key={index}
            name={player.name}
            cards={player.cards}
            isTurn={currentPlayerIndex == index}
          />
        ))}
      </div>
    </div>
  );
};
