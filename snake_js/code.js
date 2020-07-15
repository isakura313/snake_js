var canvas; // создаем наш холст
var ctx; // получаем из него контекст

var head; // получаем башку
var apple; // получаем яблоко, которое мы будем кушать
var ball; // создание элемент тела

var dots; //  массив элементов тела
var apple_x; // положение яблока по X
var apple_y; // положение яблока по Y

var leftDirection = false;
var rightDirection = true; // по умолчанию наша змейка двигается направо
var upDirection = false;
var downDirection = false;
var inGame = true; 


const DOT_SIZE = 10; //размер одной нашей точки
const ALL_DOTS = 900; // количество всех точек по формуле (500*500)/(10*10)
const MAX_RAND = 29; // максимальное рандомное число
const DELAY = 100; //отвечает за скорость нашей игры
const C_HEIGHT = 500; // высота нашего холста
const C_WIDTH = 500;  //ширина нашего холста

const LEFT_KEY = 37; // просто номера клавиш
const UP_KEY = 38; 
const RIGHT_KEY = 39;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS); // положения всех частей нашей змейки
var y = new Array(ALL_DOTS);  // положения всех частей нашей змейки

canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");


loadImages()
createSnake()
locateApple()
setTimeout("gameCycle()", DELAY) //проигрывает цикл игры

function loadImages(){
    head = new Image();
    head.src = "head.png" // менять изображение головы здесь

    ball = new Image();
    ball.src = "dot.png" // загрузка секции тела

    apple = new Image();
    apple.src = "apple.png"; // загрузка яблока
}

function createSnake(){
    dots = 2; //изначально две секции
    
    for(let z = 0; z < dots; z++){
        x[z] = 50 - z * 10; // 50 40 позиция
        y[z] = 50  //змея смотрит вправо и начинает с одной и той же точки 
    }
}

function checkApple(){
    if (x[0] == apple_x && y[0] == apple_y){
        dots++; // прибавляет единицу
        locateApple()
    }
}

function doDrawing(){
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT) //очищаем холст

    if(inGame){
        ctx.drawImage(apple, apple_x, apple_y) //изображение, позиция x и y

        for(var z = 0; z < dots; z++){
            if(z ==0){
                ctx.drawImage(head, x[z], y[z])
            } else{
                ctx.drawImage(ball, x[z], y[z])
            }
        }
    } else{
        gameOver()
    }
}

