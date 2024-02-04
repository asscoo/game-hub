import { Timestamp } from "rxjs";

export class SnakeGameInformation {
    currentXPosition: number = 0;
    currentYPosition: number = 0;
    snakePartSize: number = 15;
    score: number = 0;
    gameStartDate: Date = new Date();
    gamePauseDate: Date = new Date();
    isGameover: boolean = false;
}
