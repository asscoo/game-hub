import { SnakeGameInformation } from './../snake-game-information';
import Scissors from './snake-scissors';
import Berry from './snake-berry';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { clear } from 'console';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Utils } from '../../../Utils';
@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrl: './snake-game.component.css',
})
export class SnakeGameComponent {
  @Input() gameRestart: boolean = false;
  @Output() snakeGameInformation = new EventEmitter<SnakeGameInformation>();
  snake: Array<Array<number>> = [
    [2, 0],
    [1, 0],
    [0, 0],
  ];
  ctx: CanvasRenderingContext2D | null = null;
  currentDirection: string = '';
  berry: Array<number> = [];
  scissors: Array<number> = [];
  gameInterval: any;
  lastTickForKeypress: number = 0;
  currentTicks: number = 0;

  gradientColors: Array<string> = [
    '#1A9D15',
    '#199C13',
    '#1B9E16',
    '#1B9E16',
    '#129508',
    '#24A723',
    '#3ABD45',
    '#4CCF62',
    '#57DA72',
    '#63E684',
    '#6EF195'
  ]

  gameInformation: SnakeGameInformation = new SnakeGameInformation();

  MaxRightPosition: number = 0;
  MaxDownPosition: number = 0;
  IntervalMS: number = 100;
  isGamePaused: boolean = false;
  RIGHT_DIRECTION: string = 'right';
  LEFT_DIRECTION: string = 'left';
  UP_DIRECTION: string = 'up';
  DOWN_DIRECTION: string = 'down';
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.drawSquare = this.drawSquare.bind(this);
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.userKeyPress.bind(this));
    this.MaxDownPosition =
      (document.getElementById('snakeCanvas') as HTMLCanvasElement).height /
      this.gameInformation.snakePartSize;
    this.MaxRightPosition =
      (document.getElementById('snakeCanvas') as HTMLCanvasElement).width /
      this.gameInformation.snakePartSize;
    this.ctx = this.getCanvasContext();
    this.currentDirection = this.RIGHT_DIRECTION;
    this.drawSnake();
    this.gameInterval = setInterval(() => {
      this.gameTick();
    }, this.IntervalMS);
  }

  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    let changesObject = changes as any;
    if (changesObject.gameRestart.currentValue === true) {
      alert('Game Restarted');
      this.snake = [
        [2, 0],
        [1, 0],
        [0, 0],
      ];
      this.currentTicks = 0;
      this.IntervalMS = 100;
      this.lastTickForKeypress = 0;
      this.currentDirection = this.RIGHT_DIRECTION;
      this.drawSnake();
      this.gameInformation = new SnakeGameInformation();
      
      this.gameInterval = setInterval(() => {
        this.gameTick();
      }, this.IntervalMS);
    }
  }

  drawSnake() {
    if (!this.ctx) return;
    for (let i = 0; i < this.snake.length; i++) {
      let currentPercentage = (i / this.snake.length) * 100.0;
      this.ctx.fillStyle = 'black';
      this.drawSquare(
        this.snake[i][0] * this.gameInformation.snakePartSize + 1,
        this.snake[i][1] * this.gameInformation.snakePartSize + 1,
        this.gameInformation.snakePartSize -2
      );
      this.ctx.fillStyle = this.gradientColors[Math.floor(currentPercentage / 10)];
      this.drawSquare(
        this.snake[i][0] * this.gameInformation.snakePartSize + 2,
        this.snake[i][1] * this.gameInformation.snakePartSize + 2,
        this.gameInformation.snakePartSize - 4
      );
    }

    if (this.berry.length !== 0) {
      this.ctx.fillStyle = 'black';
      this.drawSquare(
        this.berry[0] * this.gameInformation.snakePartSize + 1,
        this.berry[1] * this.gameInformation.snakePartSize + 1,
        this.gameInformation.snakePartSize -2
      );
      this.ctx.fillStyle = 'red';
      this.drawSquare(
        this.berry[0] * this.gameInformation.snakePartSize + 2,
        this.berry[1] * this.gameInformation.snakePartSize + 2,
        this.gameInformation.snakePartSize- 4
      );
    }

    Scissors.drawScissors(this.ctx, this.scissors, this.gameInformation, this.drawSquare);
  }

  userKeyPress(event: KeyboardEvent) {
    if (this.lastTickForKeypress === this.currentTicks) return;
    this.lastTickForKeypress = this.currentTicks;
    if (
      (event.key === 'ArrowRight' || event.key === 'd') &&
      this.currentDirection !== this.LEFT_DIRECTION
    ) {
      this.currentDirection = this.RIGHT_DIRECTION;
    } else if (
      (event.key === 'ArrowLeft' || event.key === 'a') &&
      this.currentDirection !== this.RIGHT_DIRECTION
    ) {
      this.currentDirection = this.LEFT_DIRECTION;
    } else if (
      (event.key === 'ArrowUp' || event.key === 'w') &&
      this.currentDirection !== this.DOWN_DIRECTION
    ) {
      this.currentDirection = this.UP_DIRECTION;
    } else if (
      (event.key === 'ArrowDown' || event.key === 's') &&
      this.currentDirection !== this.UP_DIRECTION
    ) {
      this.currentDirection = this.DOWN_DIRECTION;
    } else if (event.key === 'p') {
      if (!this.isGamePaused) {
        this.lastTickForKeypress = -1;
        this.isGamePaused = true;
        this.gameInformation.gamePauseDate = new Date();
        clearInterval(this.gameInterval);
      } else if (this.isGamePaused){
        this.isGamePaused = false;
        let timeFromPause = Utils.getTimeFromDate(this.gameInformation.gamePauseDate);
        let currentGameTime = Utils.getTimeFromDate(this.gameInformation.gameStartDate);
        let timeBeforePause = currentGameTime - timeFromPause;
        this.gameInformation.gameStartDate.setTime((Date.now() - timeBeforePause));
        this.gameInterval = setInterval(() => {
          this.gameTick();
        }, this.IntervalMS);
      }
    }
  }

  drawSquare(x: number, y: number, size: number) {
    if (!this.ctx) return;
    this.ctx.fillRect(x, y, size, size);
  }

  checkIfGameOver() {
    return this.isSnakeCollidingWithWall() || this.isSnakeCollidingWithItself();
  }

  isSnakeCollidingWithItself() {
    for (let i = 1; i < this.snake.length; i++) {
      if (
        this.snake[0][0] === this.snake[i][0] &&
        this.snake[0][1] === this.snake[i][1]
      )
        return true;
    }
    return false;
  }

  isSnakeCollidingWithWall() {
    return (
      this.snake[0][0] < 0 ||
      this.snake[0][0] > this.MaxRightPosition - 1 ||
      this.snake[0][1] < 0 ||
      this.snake[0][1] > this.MaxDownPosition - 1
    );
  }

  onSnakeEatBerry() {
    this.IntervalMS = Berry.onSnakeEatBerry(this.snake, this.berry, this.gameInformation, this.IntervalMS);
    clearInterval(this.gameInterval);
    this.gameInterval = setInterval(() => {
      this.gameTick();
    }, this.IntervalMS);
  }

  getCanvasContext(): CanvasRenderingContext2D | null {
    return (
      document.getElementById('snakeCanvas') as HTMLCanvasElement
    ).getContext('2d');
  }

  resetCanvas() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  snakeTickMove() {
    if (this.currentDirection === this.RIGHT_DIRECTION) {
      this.snake.unshift([this.snake[0][0] + 1, this.snake[0][1]]);
    } else if (this.currentDirection === this.LEFT_DIRECTION) {
      this.snake.unshift([this.snake[0][0] - 1, this.snake[0][1]]);
    } else if (this.currentDirection === this.UP_DIRECTION) {
      this.snake.unshift([this.snake[0][0], this.snake[0][1] - 1]);
    } else if (this.currentDirection === this.DOWN_DIRECTION) {
      this.snake.unshift([this.snake[0][0], this.snake[0][1] + 1]);
    }
    if (Berry.doesSnakeEatBerry(this.snake, this.berry)) this.onSnakeEatBerry();
    if (Scissors.doesSnakeEatScissors(this.snake, this.scissors)) Scissors.onSnakeEatScissors(this.snake, this.scissors);
    this.snake.pop();
    Berry.createBerry(this.berry, this.snake, this.MaxRightPosition, this.MaxDownPosition);
    Scissors.createScissors(this.snake, this.scissors, this.MaxRightPosition, this.MaxDownPosition);
  }

  updateGameInformation() {
    this.gameInformation.currentXPosition = this.snake[0][0];
    this.gameInformation.currentYPosition = this.snake[0][1];
    this.gameInformation.snakePartSize = this.gameInformation.snakePartSize;
    this.gameInformation.score = this.snake.length - 3;
    this.snakeGameInformation.emit(this.gameInformation);
  }

  gameTick() {
    this.resetCanvas();
    this.drawSnake();
    if (this.checkIfGameOver()) {
      this.gameInformation.isGameover = true;
      this.updateGameInformation();
      clearInterval(this.gameInterval);
      return;
    }
    this.snakeTickMove();
    this.gameInformation.isGameover = false;
    this.updateGameInformation();
    this.currentTicks++;
  }
}
