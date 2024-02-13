import { Component } from '@angular/core';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrl: './chess-game.component.css'
})
export class ChessGameComponent {

  ctx: CanvasRenderingContext2D | null = null;
  squareSize: number = 0;
  constructor() { }

  ngOnInit(){
    let boardWidth = document.getElementById('chessCanvas')?.clientWidth || 0;
    this.squareSize = boardWidth / 8;
    this.drawClearBoard();
    this.drawClickedSquare.bind(this);
    let canvas = document.getElementById('chessCanvas');
    canvas.addEventListener('click', (event) => this.drawClickedSquare(event));
  }
  getCanvasContext(): CanvasRenderingContext2D | null {
    return (
      document.getElementById('chessCanvas') as HTMLCanvasElement
    ).getContext('2d');
  }

  drawClickedSquare(event: any){
    let canvas = document.getElementById('chessCanvas');
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    x = Math.floor(x / this.squareSize);
    y = Math.floor(y / this.squareSize);

    this.ctx = this.getCanvasContext();
    if(!this.ctx) return;
    this.ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
    this.ctx.fillRect(x*this.squareSize, y*this.squareSize, this.squareSize, this.squareSize);
  }
  

  drawClearBoard() {
    this.ctx = this.getCanvasContext();
    if(!this.ctx) return;
    this.ctx.font = "1px sarpanch";
    for(let i=0; i<8; i++){
      for(let j=0; j<8; j++){
        if((i+j) % 2 === 0){
          this.ctx.fillStyle = '#2F3C7E';
        } else {
          this.ctx.fillStyle = '#FBEAEB';
        }
        this.ctx.fillRect(i*this.squareSize, j*this.squareSize, this.squareSize, this.squareSize);
      }
    }
   this.drawAllPieces();
  }

  drawAllPieces(){
    this.drawPiece('\u2654', 3, 1);
    this.drawPiece('\u2655', 4, 1);
    this.drawPiece('\u2656', 0, 1);
    this.drawPiece('\u2656', 7, 1);
    this.drawPiece('\u2658', 1, 1);
    this.drawPiece('\u2658', 6, 1);
    this.drawPiece('\u2657', 2, 1);
    this.drawPiece('\u2657', 5, 1);

    this.drawPiece('\u2659', 1, 2);
    this.drawPiece('\u2659', 2, 2);
    this.drawPiece('\u2659', 3, 2);
    this.drawPiece('\u2659', 4, 2);
    this.drawPiece('\u2659', 5, 2);
    this.drawPiece('\u2659', 6, 2);
    this.drawPiece('\u2659', 7, 2);
    this.drawPiece('\u2659', 0, 2);

    this.drawPiece('\u265A', 3, 8);
    this.drawPiece('\u265B', 4, 8);
    this.drawPiece('\u265C', 0, 8);
    this.drawPiece('\u265C', 7, 8);
    this.drawPiece('\u265E', 1, 8);
    this.drawPiece('\u265E', 6, 8);
    this.drawPiece('\u265D', 2, 8);
    this.drawPiece('\u265D', 5, 8);

    this.drawPiece('\u265F', 1, 7);
    this.drawPiece('\u265F', 2, 7);
    this.drawPiece('\u265F', 3, 7);
    this.drawPiece('\u265F', 4, 7);
    this.drawPiece('\u265F', 5, 7);
    this.drawPiece('\u265F', 6, 7);
    this.drawPiece('\u265F', 7, 7);
    this.drawPiece('\u265F', 0, 7);
  }
  
  drawPiece(piece: string, x: number, y: number){
    if(!this.ctx) return;
    this.ctx.font = "50px serif";
    this.ctx.fillStyle = "black";
    var textNode = document.createTextNode(piece);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(textNode);
    
    if(!fragment.textContent) return;
    this.ctx.fillText(fragment.textContent, (x*this.squareSize) + 3, (y*this.squareSize) - 10, this.squareSize);
  }
}
