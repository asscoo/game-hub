import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SnakeGameComponent } from '../snake-game/snake-game.component';
import { SnakeGameInformation } from '../snake-game-information';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-snake-board',
  templateUrl: './snake-board.component.html',
  styleUrl: './snake-board.component.css'
})
export class SnakeBoardComponent {

  gameInformation: SnakeGameInformation = new SnakeGameInformation();
  gameRestart: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.gameInformation.isGameover = false;
  }

  onGameInfromationChanged(gameInformation: SnakeGameInformation) {
    this.gameInformation = gameInformation;
  }

  getElapsedTime(gameStartDate: Date): string {
    const now = new Date();
    const elapsedMS = now.getTime() - gameStartDate.getTime();
    const elapsedSeconds = Math.floor(elapsedMS / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  restartGame(){
    this.gameRestart = !this.gameRestart;
  }
}
