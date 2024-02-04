import { Component } from '@angular/core';
import { SnakeGameInformation } from '../snake-game-information';
import { CommonModule } from '@angular/common';
import { SnakeGameComponent } from '../snake-game/snake-game.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from '../../../Utils';

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
    let a = Utils.getElapsedTime(gameStartDate);
    return a;

  }

  restartGame(){
    this.gameRestart = !this.gameRestart;
  }
}
