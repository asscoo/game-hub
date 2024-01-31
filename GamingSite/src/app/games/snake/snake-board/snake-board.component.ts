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
}
