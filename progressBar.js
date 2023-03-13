import { createCanvas, loadImage } from "canvas";

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.lineWidth = 5;
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }
}

export default async function (current, total) {
  const barrinha = await loadImage("barranova.png");

  const canvasWidth = 1200;
  const canvasHeight = 675;
  const progressBarSize = 990;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const context = canvas.getContext("2d");
  // background
  context.fillStyle = "#1563B0";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  // barra de fora
  context.fillStyle = "#c2e1ff";
  roundRect(context, 100, 300, 1000, 100, 5, true, true);
  // barra interna
  context.fillStyle = context.createPattern(barrinha, "repeat");
  context.save();
  context.translate(105, 305);
  context.fillRect(
    0,
    0,
    progressBarSize - progressBarSize * Math.pow(current / total, 2),
    // alternativa: Math.log(1 + (49 * current) / total)) / Math.log(50)
    90
  );
  context.restore();
  return canvas.toBuffer("image/png");
}
