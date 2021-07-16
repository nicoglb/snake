console.log('Start');

let container = document.getElementById('container');
//let searchBar = document.getElementsByClassName('searchBar');
//searchBar.boton
let body = document.getElementsByTagName('body')[0];

console.log(container);



// console.log(container.children[0].style);

container.children[30].classList.add('food');

container.children[5].classList.add('headSnake');
container.children[4].classList.add('bodySnake');

var snake = [5, 4];

//snake[0] headSnake
//let snake = [2,1, 0];//snake[0] headSnake

//logica para el movimeinto del snake

// body.addEventListener('click', function (event) {

// })

//JSON
// let var1={
//     id1:'valor',
//     id2:9,
//     id3:{
//         va:'kk'
//     }
// };

//console.log('valor: '+container.children[0].textContent);
//container.children[0].textContent = 'A';
//console.log('valor: '+container.children[0].textContent);


// console.log(var1);



// undefined
// NaN
// null
// Infinity
let comi;
let score =0;
const mov = (inc) => {
    let remove;
    for (let index = 0; index < snake.length; index++) {
        //index=0; //esto si saco el for y el if
        if (index === 0) {
            //cabeza
            console.log();

            container.children[snake[index]].classList.toggle('headSnake');
            
            //agrego al principio del array la nueva cabeza
            snake.unshift(parseInt(container.children[snake[index]].textContent) + inc);

            //avanzo en los casilleros
            container.children[snake[index]].classList.toggle('headSnake');
            
            if (its_me(snake[index]))
                break;
            comi = eat(snake[0], inc); //si como antes de moverme
            //index++; //esto si saco el for y el if
        }
        else {

            
            //cuerpo             
            container.children[snake[index]].classList.toggle('bodySnake');

            if (!comi){
                remove = snake.pop();
                container.children[remove].classList.toggle('bodySnake');
            }
            
            break;
        }
        //console.log(snake);


    }

}

const reset_game = () => {
    
    for (i of snake) {
        container.children[i].classList.remove('headSnake')
        container.children[i].classList.remove('bodySnake')
    }
    score= 0;
    document.getElementById('score').innerHTML="Score: "+score;
}

const its_me = (head) => {

    //funcion que se fija si choco conmigo mismo
    if (container.children[head].classList.contains('bodySnake')){
        alert("Game Over!");
        reset_game();
        container.children[5].classList.add('headSnake');
        container.children[4].classList.add('bodySnake');
        snake = [5, 4];
        return true;

    }

}

const its_border = () => {

    //funcion que se fija si choco un borde

    //alert("Game Over!");
}


const eat = (head, inc) => {
    //funcion que come y agrega la cola nueva
    if (container.children[head].classList.contains('food')) {
        container.children[head].classList.toggle('food');
        //snake.push(parseInt(container.children[snake[snake.length - 1]].textContent) - inc);
        //container.children[snake[snake.length - 1]].classList.toggle('bodySnake');
        

        random_food();
        add_score();
        return true

    }
}


const random_food = () => {

    //funcion que agrega la comida a un lugar random donde no este la snake
    let location;
    do {
        location = Math.round(Math.random() * 254);
        console.log('location: ' + location);
        console.log(snake.includes(location));
    } while (snake.includes(location));

    container.children[location].classList.toggle('food');


}

const add_score =()=>{

    score = score + 10;
    document.getElementById('score').innerHTML="Score: "+score;
    console.log('score: '+ score);

}



let event_before = 'ArrowRight';

body.addEventListener('keyup', (event) => {
    //console.log('keyup');
    //console.log(event.key);
    //random_food();

    if (event.key === 'ArrowLeft') {
        //inc = -1;
        //console.log(event_before);
        if (event_before !== 'ArrowRight') {
            mov(-1);
            event_before = event.key;
        }

    }
    if (event.key === 'ArrowUp') {
        //console.log('Nos movemos a arriba');
        //console.log(event_before);
        if (event_before !== 'ArrowDown') {
            mov(-17);
            event_before = event.key;
        }


    }
    if (event.key === 'ArrowRight') {
        //console.log('Nos movemos a la derecha');
        //inc = 1;
        //console.log(event_before);
        if (event_before !== 'ArrowLeft') {
            mov(1);

            event_before = event.key;
        }



    }
    if (event.key === 'ArrowDown') {
        //console.log('Nos movemos a abajo');
        //console.log(event_before);
        if (event_before !== 'ArrowUp') {
            mov(17);
            event_before = event.key;
        }


    }
    //console.log(container);

})


// console.log("serpiente");
// console.log(snake);
// snake.unshift(6);
// console.log(snake);
// snake.pop();
// console.log(snake);
// snake.push(5);
// console.log(snake);



