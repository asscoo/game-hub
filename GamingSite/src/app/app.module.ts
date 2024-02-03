import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnakeBoardComponent } from './games/snake/snake-board/snake-board.component';
import { SnakeGameComponent } from './games/snake/snake-game/snake-game.component';


@NgModule({
  declarations: [
    SnakeBoardComponent,
    SnakeGameComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[
    SnakeBoardComponent,
    SnakeGameComponent,
    NgbModule
  ]
})
export class AppModule { }
