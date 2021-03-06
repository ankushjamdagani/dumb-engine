const CreateRectangle = ({
  ctx,
  x,
  y,
  width,
  height,
  fillColor,
  strokeColor,
  strokeSize = 0
}) => {
  ctx.beginPath();
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
  }
  if (strokeColor || strokeSize) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeSize || 1;
    ctx.strokeRect(x, y, width, height);
  }

  ctx.closePath();
};

const CreateCircle = ({
  ctx,
  x,
  y,
  r,
  sAngle = 0,
  eAngle = 2 * Math.PI,
  fillColor,
  strokeColor,
  strokeSize = 0
}) => {
  ctx.beginPath();
  if (fillColor) {
    ctx.fillStyle = fillColor;
  }
  if (strokeColor || strokeSize) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeSize || 1;
  }
  ctx.arc(x, y, r, sAngle, eAngle);
  if (fillColor) {
    ctx.fill();
  }
  if (strokeColor || strokeSize) {
    ctx.stroke();
  }
  ctx.closePath();
};

const CreateText = ({ ctx, text, x, y, fontColor, font }) => {
  ctx.fillStyle = fontColor;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

const CreateImage = ({ ctx, image, x, y, width, height }) => {
  ctx.drawImage(image, x, y, width, height);
};

export { CreateRectangle, CreateCircle, CreateText, CreateImage };
