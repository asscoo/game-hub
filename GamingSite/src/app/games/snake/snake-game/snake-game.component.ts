import { SnakeGameInformation } from './../snake-game-information';
import { Component, EventEmitter, Output } from '@angular/core';
import { clear } from 'console';
import { DOCUMENT } from '@angular/common'; 
import { Inject } from '@angular/core';
@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrl: './snake-game.component.css',
})
export class SnakeGameComponent {
  snake: Array<Array<number>> = [
    [2, 0],
    [1, 0],
    [0, 0],
  ];
  ctx: CanvasRenderingContext2D | null = null;
  snakePartSize: number = 15;
  currentDirection: string = '';
  berry: Array<number> = [];
  gameInterval: any;
  lastTickForKeypress: number = 0;
  currentTicks: number = 0;

  gameInformation: SnakeGameInformation = new SnakeGameInformation();
  @Output() snakeGameInformation = new EventEmitter<SnakeGameInformation>();

  MaxRightPosition: number = 0;
  MaxDownPosition: number = 0;
  IntervalMS: number = 100;

  RIGHT_DIRECTION: string = 'right';
  LEFT_DIRECTION: string = 'left';
  UP_DIRECTION: string = 'up';
  DOWN_DIRECTION: string = 'down';
  constructor(@Inject(DOCUMENT) private document: Document) {
   
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.userKeyPress.bind(this));
    this.MaxDownPosition = (document.getElementById('snakeCanvas') as HTMLCanvasElement).height / this.snakePartSize;
    this.MaxRightPosition = (document.getElementById('snakeCanvas') as HTMLCanvasElement).width / this.snakePartSize;
    this.ctx = this.getCanvasContext();
    this.currentDirection = this.RIGHT_DIRECTION;
    this.drawSnake();
    this.gameInterval = setInterval(() => {this.gameTick()}, this.IntervalMS);  
  }

  ngAfterViewInit(): void {

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
    if (this.lastTickForKeypress === this.currentTicks) return;
    this.lastTickForKeypress = this.currentTicks;
    if ((event.key === 'ArrowRight' || event.key === 'd') && this.currentDirection !== this.LEFT_DIRECTION) {
      this.currentDirection = this.RIGHT_DIRECTION;
    } else if ((event.key === 'ArrowLeft' || event.key === 'a') && this.currentDirection !== this.RIGHT_DIRECTION) {
      this.currentDirection = this.LEFT_DIRECTION;
    } else if ((event.key === 'ArrowUp' || event.key === 'w') && this.currentDirection !== this.DOWN_DIRECTION) {
      this.currentDirection = this.UP_DIRECTION;
    } else if ((event.key === 'ArrowDown' || event.key === 's') && this.currentDirection !== this.UP_DIRECTION) {
      this.currentDirection = this.DOWN_DIRECTION;
    }
  }

  drawSquare(x: number, y: number, size: number) {
    if (!this.ctx) return;
    this.ctx.fillRect(x, y, size, size);
  }

  checkIfGameOver(){
    return this.isSnakeCollidingWithWall() || this.isSnakeCollidingWithItself();
  }

  isSnakeCollidingWithItself(){
    for(let i = 1; i < this.snake.length; i++){
      if(this.snake[0][0] === this.snake[i][0] && this.snake[0][1] === this.snake[i][1]) return true;
    }
    return false;
  }

  isSnakeCollidingWithWall(){
    return (this.snake[0][0] < 0 || 
      this.snake[0][0] > this.MaxRightPosition - 1 || 
      this.snake[0][1] < 0 || 
      this.snake[0][1] > this.MaxDownPosition - 1);
  }

  createBerry(){
    if(this.berry.length !== 0) return;
    let spawnBerry = Math.floor(Math.random() * 10) == 4;
    if(!spawnBerry) return;
    this.berry = [Math.floor(Math.random() * this.MaxRightPosition), Math.floor(Math.random() * this.MaxDownPosition)];
    while(this.isBerryOnSnake()){
      this.berry = [Math.floor(Math.random() * this.MaxRightPosition), Math.floor(Math.random() * this.MaxDownPosition)];
    }
  }

  isBerryOnSnake(){
    for(let i = 0; i < this.snake.length; i++){
      if(this.snake[i][0] === this.berry[0] && this.snake[i][1] === this.berry[1]) return true;
    }
    return false;
  }

  doesSnakeEatBerry(){
    return this.snake[0][0] === this.berry[0] && this.snake[0][1] === this.berry[1];
  }

  onSnakeEatBerry(){
    this.snake.push([this.snake[this.snake.length - 1][0], this.snake[this.snake.length - 1][1]]);
    this.berry = [];
    if(this.gameInformation.score < 40)
        this.IntervalMS -= 1;
    else if(this.gameInformation.score < 100 && this.gameInformation.score >= 40){
      if(this.gameInformation.score % 2 === 0)
        this.IntervalMS -= 1;
    }else if(this.gameInformation.score < 200 && this.gameInformation.score >= 100){
      if(this.gameInformation.score % 4 === 0)
        this.IntervalMS -= 1;
    }else{
      if(this.gameInformation.score % 8 === 0)
        this.IntervalMS -= 1;
    }
    clearInterval(this.gameInterval);
    this.gameInterval = setInterval(() => {this.gameTick()}, this.IntervalMS);
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

  updateGameInformation(){
    this.gameInformation.currentXPosition = this.snake[0][0];
    this.gameInformation.currentYPosition = this.snake[0][1];
    this.gameInformation.snakePartSize = this.snakePartSize;
    this.gameInformation.score = this.snake.length - 3;
    this.snakeGameInformation.emit(this.gameInformation);
  }

  gameTick() {
    this.resetCanvas();
    this.drawSnake();
    if(this.checkIfGameOver()){
      this.gameInformation.isGameover = true;
      this.updateGameInformation();
      clearInterval(this.gameInterval);
      return;
    }
    this.snakeTickMove();
    this.updateGameInformation();
    this.currentTicks++;
  }
}
