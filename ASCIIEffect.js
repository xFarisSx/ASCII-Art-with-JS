import { Cell } from "./cell.js";
export class Effect {
  constructor() {
    this.cellsArray = [];
    this.sep = 4;

    let res = document.getElementById("slider")
    res.value = this.sep
    res.addEventListener("change", (e)=>{
        this.sep = parseInt(e.target.value)
    })
  }

  scanImage(ctx, video, myCanvas) {
    // ctx.font = `${this.sep + 4}px Courier`;
    ctx.drawImage(video, 0, 0, myCanvas.width, myCanvas.height);
    let imgData = ctx.getImageData(0, 0, myCanvas.width, myCanvas.height);
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    for (let y = 0; y < myCanvas.height; y += this.sep) {
      for (let x = 0; x < myCanvas.width; x += this.sep) {
        let i = 4 * (myCanvas.width * y + x);
        if (imgData.data[i + 3] > 128) {
          let r = imgData.data[i];
          let g = imgData.data[i + 1];
          let b = imgData.data[i + 2];
          let a = imgData.data[i + 3];
          let total = r + g + b;
          let averageColorValue = total / 3;
          let color = `rgb(${r}, ${g}, ${b})`;
          let symbol = this.convertToSymbol(averageColorValue);
          if (total > 50) this.cellsArray.push(new Cell(x, y, color, symbol));
        }
      }
    }
  }
  draw(ctx, video, myCanvas) {
    this.cellsArray = [];
    this.scanImage(ctx, video, myCanvas);
    for(let cell of this.cellsArray){
        cell.draw(ctx)
    }
  }

  convertToSymbol(g) {
    if (g > 250) return "@";
    else if (g > 240) return "*";
    else if (g > 220) return "+";
    else if (g > 200) return "#";
    else if (g > 180) return "&";
    else if (g > 160) return "%";
    else if (g > 140) return "_";
    else if (g > 120) return ":";
    else if (g > 100) return "$";
    else if (g > 80) return "/";
    else if (g > 60) return "-";
    else if (g > 40) return "X";
    else if (g > 20) return "W";
    else return "";
  }
}
