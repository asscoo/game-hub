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
  gameover: boolean = false;
  gameRestart: boolean = false;
  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }

  onGameInfromationChanged(gameInformation: SnakeGameInformation) {
    this.gameInformation = gameInformation;
    this.gameover = gameInformation.isGameover;
  }

  getElapsedTime(gameStartDate: Date): string {
    let a = Utils.getElapsedTime(gameStartDate);
    return a;
  }

  restartGame(){
    this.gameRestart = !this.gameRestart;
  }
}
