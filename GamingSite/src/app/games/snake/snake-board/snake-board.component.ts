import { Component } from '@angular/core';
import { SnakeGameComponent } from '../snake-game/snake-game.component';
import { SnakeGameInformation } from '../snake-game-information';

@Component({
  selector: 'app-snake-board',
  standalone: true,
  imports: [SnakeGameComponent],
  templateUrl: './snake-board.component.html',
  styleUrl: './snake-board.component.css'
})
export class SnakeBoardComponent {

  gameInformation: SnakeGameInformation = new SnakeGameInformation();
  constructor() { }

  ngOnInit(): void {
  }

  onGameInfromationChanged(gameInformation: SnakeGameInformation) {
    console.log(gameInformation);
    this.gameInformation = gameInformation;
  }

  getElapsedTime(gameStartDate: Date): string {
    const now = new Date();
    const elapsedMS = now.getTime() - gameStartDate.getTime(); // elapsed time in milliseconds
    const elapsedSeconds = Math.floor(elapsedMS / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
