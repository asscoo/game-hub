import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnakeBoardComponent } from './games/snake/snake-board/snake-board.component';
import { SnakeGameComponent } from './games/snake/snake-game/snake-game.component';
import { ChessGameComponent } from './games/chess/chess-game/chess-game.component';
import { ChessBoardComponent } from './games/chess/chess-board/chess-board.component';


@NgModule({
  declarations: [
    SnakeBoardComponent,
    SnakeGameComponent,
    ChessGameComponent,
    ChessBoardComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[
    SnakeBoardComponent,
    SnakeGameComponent,
    ChessGameComponent,
    ChessBoardComponent,
    NgbModule
  ]
})
export class AppModule { }
