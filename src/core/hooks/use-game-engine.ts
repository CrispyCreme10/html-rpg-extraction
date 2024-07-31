import { useState, useEffect } from "react";
import gameEngine, { GameState } from "../engine/game-engine";

export const useGameEngine = () => {
  const [gameState, setGameState] = useState<GameState>(gameEngine.state);

  useEffect(() => {
    const handleStateChange = (newState: GameState) => {
      setGameState(newState);
    };

    gameEngine.onStateChange(handleStateChange);

    return () => {
      // Clean up listener if necessary
    };
  }, []);

  return gameState;
};
