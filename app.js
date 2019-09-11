const canvas = document.querySelector('#jsCanvas');
const colors = document.querySelectorAll('.jsColor');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector("#jsSave");
const ctx = canvas.getContext("2d");


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;
 
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;    

ctx.fillStyle="white";
ctx.fillRect(0 ,0 ,CANVAS_WIDTH, CANVAS_HEIGHT);

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    if(!filling){
        painting = true;
    }
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}


function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const lineSize = event.target.value;
    ctx.lineWidth = lineSize;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "FILL";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT );
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "Paint😊";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(colors){
    colors.forEach(color =>{
        color.addEventListener("click", handleColorClick);
    });
}

if(range){
    range.addEventListener("input",handleRangeChange);   
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}