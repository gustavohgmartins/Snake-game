let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
const image = document.getElementById('source');
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
document.getElementById("gamestatus").style.display = 'none';
document.getElementById("snake").style.display = 'none';

let direction = "right"


let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function create_bg(){
    context.fillStyle = "lightgreen"
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function create_snake(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function create_food(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update (event){
    if(event.keyCode == 37 & direction != "right"){direction = "left"}
    if(event.keyCode == 38 & direction != "up"){direction = "down"}
    if(event.keyCode == 39 & direction != "left"){direction = "right"}
    if(event.keyCode == 40 & direction != "down"){direction = "up"}

}



function start_game(){

    if(snake[0].x > 15*box) snake[0].x = 0;
    if(snake[0].x < 0 ) snake[0].x = 15 * box;
    if(snake[0].y > 15*box ) snake[0].y = 0;
    if(snake[0].y < 0 ) snake[0].y = 15 * box;
    document.getElementById("playbutton").style.display = 'none';
    document.getElementById("snake").style.display = 'block';
    

    for(i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            
            //alert("GAME OVER!\nRefresh the page to play again.");
            document.querySelector("#gameover").innerHTML = "GAME OVER!";
            document.getElementById("gamestatus").style.display = 'block';
            document.querySelector("#snake").remove();
            document.querySelector("#snake_logo").remove();
            document.body.style.height = "95vh";
            clearInterval(game);

        }
    }

    create_bg();
    create_snake();
    create_food();

    let snake_x = snake[0].x;
    let snake_y = snake[0].y;

    if (direction == "right"){snake_x +=box}
    if (direction == "left"){snake_x -=box}
    if (direction == "up"){snake_y +=box}
    if (direction == "down"){snake_y -=box}

    if(snake_x != food.x || snake_y != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 14 + 1) * box;
        food.y = Math.floor(Math.random() * 14 + 1) * box;
    }

    let new_head = {
        x: snake_x,
        y: snake_y
    }

    snake.unshift(new_head);
}

