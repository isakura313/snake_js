var canvas; // создаем наш холст
var ctx; // получаем из него контекст

var head; // получаем башку
var apple; // получаем яблоко, которое мы будем кушать
var ball; // создание мяча

var dots; // точки
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

