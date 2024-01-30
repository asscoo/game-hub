import { Component } from '@angular/core';
import { clear } from 'console';

@Component({
  selector: 'app-snake-game',
  standalone: true,
  imports: [],
  templateUrl: './snake-game.component.html',
  styleUrl: './snake-game.component.css',
})
export class SnakeGameComponent {
  snake: Array<Array<number>> = [
    [0, 0],
    [1, 0],
    [2, 0],
  ];
  ctx: CanvasRenderingContext2D | null = null;
  snakePartSize: number = 15;
  currentDirection: string = '';
  berry: Array<number> = [];
  gameInterval: any;


  MaxRightPosition: number = 0;
  MaxDownPosition: number = 0;


  RIGHT_DIRECTION: string = 'right';
  LEFT_DIRECTION: string = 'left';
  UP_DIRECTION: string = 'up';
  DOWN_DIRECTION: string = 'down';
  constructor() {}

  ngOnInit(): void {
    this.MaxDownPosition = (document.getElementById('snakeCanvas') as HTMLCanvasElement).height / this.snakePartSize;
    this.MaxRightPosition = (document.getElementById('snakeCanvas') as HTMLCanvasElement).width / this.snakePartSize;
    window.addEventListener('keydown', this.userKeyPress.bind(this));
    this.currentDirection = this.RIGHT_DIRECTION;
    this.ctx = this.getCanvasContext();
    this.drawSnake();
    this.gameInterval = setInterval(() => {this.gameTick()}, 100);
  }

  drawSnake() {
    if (!this.ctx) return;
    for (let i = 0; i < this.snake.length; i++) {
      this.ctx.fillStyle = 'black';
      this.drawSquare(
        this.snake[i][0] * this.snakePartSize,
        this.snake[i][1] * this.snakePartSize,
        this.snakePartSize
      );
      this.ctx.fillStyle = 'green';
      this.drawSquare(
        this.snake[i][0] * this.snakePartSize + 2,
        this.snake[i][1] * this.snakePartSize + 2,
        this.snakePartSize - 4
      );
    }

    if(this.berry.length !== 0){
      this.ctx.fillStyle = 'red';
      this.drawSquare(this.berry[0] * this.snakePartSize, this.berry[1] * this.snakePartSize, this.snakePartSize);
    }

  }

  userKeyPress(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.currentDirection = this.RIGHT_DIRECTION;
    } else if (event.key === 'ArrowLeft') {
      this.currentDirection = this.LEFT_DIRECTION;
    } else if (event.key === 'ArrowUp') {
      this.currentDirection = this.UP_DIRECTION;
    } else if (event.key === 'ArrowDown') {
      this.currentDirection = this.DOWN_DIRECTION;
    }
  }

  drawSquare(x: number, y: number, size: number) {
    if (!this.ctx) return;
    this.ctx.fillRect(x, y, size, size);
  }

  checkIfGameOver(){
    return this.snake[0][0] < 0 || 
           this.snake[0][0] > this.MaxRightPosition - 1 || 
           this.snake[0][1] < 0 || 
           this.snake[0][1] > this.MaxDownPosition - 1;
  }

  createBerry(){
    if(this.berry.length !== 0) return;
    let spawnBerry = Math.floor(Math.random() * 10) == 4;
    if(!spawnBerry) return;
    this.berry = [Math.floor(Math.random() * this.MaxRightPosition), Math.floor(Math.random() * this.MaxDownPosition)];
  }

  doesSnakeEatBerry(){
    return this.snake[0][0] === this.berry[0] && this.snake[0][1] === this.berry[1];
  }

  onSnakeEatBerry(){
    this.snake.push([this.snake[this.snake.length - 1][0], this.snake[this.snake.length - 1][1]]);
    this.berry = [];
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
    if(this.doesSnakeEatBerry()) this.onSnakeEatBerry();

    this.snake.pop();
    this.createBerry();
  }

  gameTick() {
    this.resetCanvas();
    this.drawSnake();
    if(this.checkIfGameOver()){
      alert('Game Over');
      clearInterval(this.gameInterval);
      return;
    }
    this.snakeTickMove();
  }
}
