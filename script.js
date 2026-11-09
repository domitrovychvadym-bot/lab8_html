let canvas, ctx;
const KOEF = 50; // Масштаб сітки (пікселів на одиницю)[cite: 1]

window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("drawingCanvas");
    ctx = canvas.getContext("2d"); //[cite: 1, 5]

    drawGrid();
    drawInitialFigures();

    // Подія малювання при кліку на полотно[cite: 1, 3]
    canvas.addEventListener("mousedown", (e) => {
        const rect = canvas.getBoundingClientRect();
        drawDiamond(e.clientX - rect.left, e.clientY - rect.top); //[cite: 3]
    });
});

/**
 * 1. Малювання декартової системи координат та засічок[cite: 1, 2]
 */
function drawGrid() {
    const { width: w, height: h } = canvas;
    const xc = w / 2, yc = h / 2;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.beginPath();

    // Вісь X зі стрілкою[cite: 1]
    ctx.moveTo(10, yc); ctx.lineTo(w - 10, yc);
    ctx.lineTo(w - 15, yc - 5); ctx.moveTo(w - 10, yc); ctx.lineTo(w - 15, yc + 5);

    // Вісь Y зі стрілкою[cite: 1]
    ctx.moveTo(xc, h - 10); ctx.lineTo(xc, 10);
    ctx.lineTo(xc - 5, 15); ctx.moveTo(xc, 10); ctx.lineTo(xc + 5, 15);
    ctx.stroke();

    // Засічки на осях[cite: 2]
    ctx.beginPath();
    for (let x = xc + KOEF; x < w - 15; x += KOEF) { ctx.moveTo(x, yc - 5); ctx.lineTo(x, yc + 5); }
    for (let x = xc - KOEF; x > 15; x -= KOEF)     { ctx.moveTo(x, yc - 5); ctx.lineTo(x, yc + 5); }
    for (let y = yc + KOEF; y < h - 15; y += KOEF) { ctx.moveTo(xc - 5, y); ctx.lineTo(xc + 5, y); }
    for (let y = yc - KOEF; y > 15; y -= KOEF)     { ctx.moveTo(xc - 5, y); ctx.lineTo(xc + 5, y); }
    ctx.stroke();
}

/**
 * 2. Універсальна функція малювання ромба з градієнтом[cite: 3]
 */
function drawDiamond(x, y, size = KOEF) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x, y + 2 * size);
    ctx.lineTo(x - size, y + size);
    ctx.closePath();

    const grad = ctx.createLinearGradient(x - size, y, x + size, y); //[cite: 3, 8]
    grad.addColorStop(0, "yellow");  //[cite: 3, 8]
    grad.addColorStop(1, "blue");    //[cite: 3]

    ctx.fillStyle = grad;
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 2;
    ctx.fill();   //[cite: 3, 8]
    ctx.stroke(); //[cite: 3, 8]
}

/**
 * 3. Малювання трикутника за координатами[cite: 2]
 */
function drawTriangle(x, y, width, height, fillStyle, strokeStyle = "green") {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width / 2, y + height);
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.stroke();
}

/**
 * 4. Побудова початкових фігур за методичкою[cite: 2, 3]
 */
function drawInitialFigures() {
    const xc = canvas.width / 2, yc = canvas.height / 2;

    // Пурпуровий трикутник (I чверть)[cite: 2]
    drawTriangle(xc + 2 * KOEF, yc - KOEF, 2 * KOEF, -KOEF, "#ff00ff");

    // Повернутий трикутник (IV чверть)[cite: 2, 8]
    ctx.save(); //[cite: 2, 5]
    ctx.translate(xc + 2 * KOEF, yc + 2 * KOEF); //[cite: 2, 8]
    ctx.rotate(Math.PI / 3); //[cite: 2]
    drawTriangle(0, 0, 2 * KOEF, KOEF, "#ffff00");
    ctx.restore(); //[cite: 2, 5]

    // Заповнене коло (II чверть)[cite: 2, 7]
    ctx.beginPath();
    ctx.arc(xc - 3 * KOEF, yc - 2 * KOEF, KOEF, 0, Math.PI * 2); //[cite: 2, 7]
    ctx.fillStyle = "#ff00ff";
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.fill(); ctx.stroke();

    // Повернутий напівпрозорий прямокутник (II чверть)[cite: 3, 7]
    ctx.save();
    ctx.translate(xc - 3 * KOEF, yc - 3 * KOEF); //[cite: 3, 8]
    ctx.rotate(Math.PI / 5); //[cite: 3]
    ctx.fillStyle = "rgba(255, 255, 0, 0.5)"; //[cite: 3]
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.fillRect(0, 0, 3 * KOEF, KOEF); //[cite: 3, 8]
    ctx.strokeRect(0, 0, 3 * KOEF, KOEF); //[cite: 8]
    ctx.restore();

    // Ромб з градієнтом (III чверть)[cite: 3]
    drawDiamond(xc - 3 * KOEF, yc + 2 * KOEF);
}

/**
 * 5. Обробник кнопки "Додати фігуру"[cite: 3, 4]
 */
function Add_Figure_Draw() {
    const xc = canvas.width / 2, yc = canvas.height / 2;
    drawDiamond(xc + 3 * KOEF, yc - 2 * KOEF); //[cite: 3]
}