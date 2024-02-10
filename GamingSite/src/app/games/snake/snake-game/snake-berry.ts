import { SnakeGameInformation } from "../snake-game-information";


function onSnakeEatBerry(snake: Array<Array<number>>, berry: Array<number>, gameInformation: SnakeGameInformation, IntervalMS: number) {
    snake.push([
      snake[snake.length - 1][0],
      snake[snake.length - 1][1],
    ]);
    berry.length = 0;
    if (gameInformation.score < 40) IntervalMS -= 1;
    else if (
      gameInformation.score < 100 &&
      gameInformation.score >= 40
    ) {
      if (gameInformation.score % 2 === 0) IntervalMS -= 1;
    } else if (
      gameInformation.score < 200 &&
      gameInformation.score >= 100
    ) {
      if (gameInformation.score % 4 === 0) IntervalMS -= 1;
    } else {
      if (gameInformation.score % 8 === 0) IntervalMS -= 1;
    }
     return IntervalMS;
  }

  function createBerry(berry: Array<number>, snake: Array<Array<number>>, MaxRightPosition: number, MaxDownPosition: number) {
    if (berry.length !== 0){
      checkDespawnBerry(berry);
      return;
    } 
    let spawnBerry = Math.floor(Math.random() * 10) == 4;
    if (!spawnBerry) return;
    berry[0] = Math.floor(Math.random() * MaxRightPosition);
    berry[1] = Math.floor(Math.random() * MaxDownPosition);
    while (isBerryOnSnake(snake, berry)) {
        berry[0] = Math.floor(Math.random() * MaxRightPosition);
        berry[1] = Math.floor(Math.random() * MaxDownPosition);
    }
  }

  function checkDespawnBerry(berry: Array<number>) {
    if (berry.length === 0) return;
    if (Math.floor(Math.random() * 95) == 4) {
      berry.length = 0;
    }
  }

  function isBerryOnSnake(snake: Array<Array<number>>, berry: Array<number>) {
    for (let i = 0; i < snake.length; i++) {
      if (
        snake[i][0] === berry[0] &&
        snake[i][1] === berry[1]
      )
        return true;
    }
    return false;
  }

  function doesSnakeEatBerry(snake: Array<Array<number>>, berry: Array<number>) {
    return (
      snake[0][0] === berry[0] && snake[0][1] === berry[1]
    );
  }


  export default {onSnakeEatBerry, createBerry, isBerryOnSnake, doesSnakeEatBerry}