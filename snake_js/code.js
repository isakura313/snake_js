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
var music = new Audio('music.mp3')
var game_over_music = new Audio('game_over.mp3')


const DOT_SIZE = 10; //размер одной нашей точки
const ALL_DOTS = 900; // количество всех точек по формуле (500*500)/(10*10)
const MAX_RAND = 29; // максимальное рандомное число
const DELAY = 50; //отвечает за скорость нашей игры
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

function getRandom(arr){
    let rand = Math.random()
}

function loadImages(){
    head = new Image();
    head.src = "head_1.png"; // менять изображение головы здесь

    ball = new Image();
    ball.src = "dot_1.png"; // загрузка секции тела

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
function gameOver(){
    ctx.fillStyle = "white"; //будет белого цвета
    ctx.textBaseline='middle'; // будет по центру
    ctx.textAlign='center'; // текст располагается по центру
    ctx.font = 'normal bold 20px serif' // шрифт с засечками толстый нормальный

    ctx.fillText("Игра окончена", C_WIDTH/2, C_HEIGHT/2); // располагается по центру экрана
    music.currentTime = 0;
    music.pause()
    game_over_music.play()
}

function move(){
    for(var z = dots; z > 0; z--){
        x[z] = x[z - 1]
        y[z] = y[z - 1]
    } 

    if(leftDirection){
        x[0] -= DOT_SIZE;
    }

    if(rightDirection){
        x[0] += DOT_SIZE;
    }

    if(upDirection){
        y[0] -= DOT_SIZE;
    }

    if(downDirection){
        y[0] += DOT_SIZE;
    }
}

function checkCollision(){
    for(var z = dots; z >0; z--){
        if(z > 3 && x[0] == x[z] && y[0] == y[z]){
            inGame = false;
        }
    }
    if(y[0] >= C_HEIGHT){
        inGame = false;
    }
    if(y[0] < 0){
        inGame = false;
    }
    if(x[0] >= C_WIDTH){
        inGame = false;
    }
    if(x[0] < 0){
        inGame = false;
    }
}
function locateApple(){
    let x = Math.floor(Math.random() * MAX_RAND); // Math floor округление вниз 0.5232
    apple_x = x * DOT_SIZE

    let y = Math.floor(Math.random() * MAX_RAND); // Math floor округление вниз 0.5232
    apple_y = y * DOT_SIZE 
}

function gameCycle(){
    if(inGame){
        music.play()
        checkApple(); // столкновение с яблоком
        checkCollision(); // столкновение с собой и стеной
        move(); // передвижение
        doDrawing(); // отрисовка холста
        setTimeout("gameCycle()", DELAY); //основные кадры игры
    }
}
onkeydown = function(e){
    var key = e.keyCode;

    if(key == LEFT_KEY && !rightDirection){
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if(key == RIGHT_KEY && !leftDirection){
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }
    if(key == UP_KEY && !downDirection){
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if(key == DOWN_KEY && !upDirection){
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

}