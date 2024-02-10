import { SnakeGameInformation } from "../snake-game-information";

function createScissors(snake: Array<Array<number>>, scissors: Array<number>, MaxRightPosition: number, MaxDownPosition: number): void {
    if (scissors.length !== 0){
      checkDespawnScissors(scissors);
      return;
    }
    let spawnScissors = Math.floor(Math.random() * 50) == 4;
    if (!spawnScissors) return;
    scissors[0] = Math.floor(Math.random() * MaxRightPosition);
    scissors[1] = Math.floor(Math.random() * MaxDownPosition);
    while (isScissorsOnSnake(snake, scissors)) {
      scissors[0] = Math.floor(Math.random() * MaxRightPosition);
      scissors[1] = Math.floor(Math.random() * MaxDownPosition);
    }
  }

  function checkDespawnScissors(scissors: Array<number>) {
    if (scissors.length === 0) return;
    if (Math.floor(Math.random() * 95) == 4) {
      scissors.length = 0;
    }
  }
  
  function isScissorsOnSnake(snake: Array<Array<number>>, scissors: Array<number>) {
    for (let i = 0; i < snake.length; i++) {
      if (
        snake[i][0] === scissors[0] &&
        snake[i][1] === scissors[1]
      )
        return true;
    }
    return false;
  }
  
  function doesSnakeEatScissors(snake: Array<Array<number>>, scissors: Array<number>) {
    return (
      snake[0][0] === scissors[0] && snake[0][1] === scissors[1]
    );
  }
  
  function onSnakeEatScissors(snake: Array<Array<number>>, scissors: Array<number>) {
    snake.pop();
    scissors.length = 0;
  }

  function drawScissors(ctx: CanvasRenderingContext2D, scissors: Array<number>, gameInformation: SnakeGameInformation, drawSquare: Function){
    if(!ctx) return;
    if (scissors.length !== 0) {
      ctx.fillStyle = 'black';
      drawSquare(
        scissors[0] * gameInformation.snakePartSize + 1,
        scissors[1] * gameInformation.snakePartSize + 1,
        gameInformation.snakePartSize -2
      );
      ctx.fillStyle = 'blue';
      drawSquare(
        scissors[0] * gameInformation.snakePartSize + 2,
        scissors[1] * gameInformation.snakePartSize + 2,
        gameInformation.snakePartSize - 4
      );
    }
  }

  export default {createScissors, isScissorsOnSnake, doesSnakeEatScissors, onSnakeEatScissors, drawScissors}