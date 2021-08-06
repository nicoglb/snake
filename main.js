let container = document.getElementById('container');
let body = document.getElementsByTagName('body')[0];
let header = document.getElementById('score');

//header.addEventListener('transitionend', onTransitionEnd, false);

// console.log(container.children[0].style);
//header.classList.toggle('score');
container.children[30].classList.add('food');
container.children[5].classList.add('headSnake');
container.children[4].classList.add('bodySnake');

var snake = [5, 4];
var bordes = [0, 17];


const define_bordes = () => {

   // for (let b = 0; b < 51; b +17) {
         // container.children[bordes[b]].classList.add('bordes');
    let b=0;
    let c=16;
    while (b < 239 & c <255){
        container.children[b].classList.add('bordesleft');
        container.children[c].classList.add('bordesrigth');
        b= b+17;
        c=c+17;
    }
}

define_bordes();

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


// undefined
// NaN
// null
// Infinity
let comi;
let score = 0;
let choco;
let chocobl;
let chocobr;

// Conseguir elemento
//localStorage.getItem("usuario_logueado");



const mov = (inc) => {

    let remove;
    // for (let b = 0; b < 52; b+17) {
    //   console.log("borde" +b);
    // }
  
    for (let index = 0; index < snake.length; index++) {

        //index=0; //esto si saco el for y el if
        if (index === 0) {
            console.log("index: "+index)
            console.log("index snake "+snake[index]);
            //cabeza
            container.children[snake[index]].classList.toggle('headSnake');
            //agrego al principio del array la nueva cabeza
            snake.unshift(parseInt(container.children[snake[index]].textContent) + inc);

            //console.log(snake[index]);
            //avanzo en los casilleros
            if (!container.children[snake[index]]) {
                console.log("entro");
                 its_border();
                break;
            }
            
            container.children[snake[index]].classList.toggle('headSnake');
              
            choco= its_border_lat(snake[index]);
            console.log("choco left funcion: "+chocobl);
            console.log("choco rigth funcion: "+chocobr);
            
            if (its_me(snake[index]))
                break;

            comi = eat(snake[0], inc);

            //si como antes de moverme
            // header.classList.toggle('score'); 
            //index++; //esto si saco el for y el if
            //console.log("cabeza: "+snake[index])
        }
        else {
            //cuerpo               
            container.children[snake[index]].classList.toggle('bodySnake');
            header.classList.toggle('score');

            if (!comi) {
                remove = snake.pop();
                container.children[remove].classList.toggle('bodySnake');
                header.classList.toggle('score');

            }
         
            break;
        }
    }

}

const delete_no_comi=()=>{

    if (!comi) {
        remove = snake.pop();
        console.log("pop"+remove)
        container.children[remove].classList.toggle('bodySnake');
        header.classList.toggle('score');

    }

}

async function its_border() {
    Swal.fire({
        icon: 'error',
        title: 'Game Over...',
        text: 'Chocaste con la pared!',
        showConfirmButton: false,
        timer: 1700,
        imageUrl: './images/headSnake.png',
  imageWidth: 80,
  imageHeight: 80,
  imageAlt: 'Custom image',
        customClass: {
            title: 'swaltext'
          }
    });
    // reset_game();
    await re_load();
}

function re_load() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(location.reload());
        }, 2000)
    });
}

const its_me = (head) => {
    //funcion que se fija si choco conmigo mismo

    if (container.children[head].classList.contains('bodySnake')) {
        //alert("Game Over!");
        console.log("entro its_me");
        Swal.fire({
            icon: 'error',
            title: 'Game Over...',
            text: 'Tendrás suerte en la próxima!',
            footer: '<a href="">Ver mis puntajes</a>',
            customClass: {
                title: 'swaltext'
              }
          })

        reset_game();
        return true;
    }
    //  }
}

const its_border_lat = (head) => {
    chocobl= false;
    chocobr= false;

    if (container.children[head].classList.contains('bordesleft') ||container.children[head].classList.contains('bordesrigth')) {
        console.log("choco con bordes");
      if (container.children[head].classList.contains('bordesleft')){
        console.log("choco con borde izquierdo"); 
         chocobl =true;
         return true;
      }
      else{
        console.log("choco con borde derecho"); 
         chocobr =true;
         return true;
      }
        
    }
     
}

const eat = (head, inc) => {
    //funcion que come y agrega la cola nueva
    if (container.children[head].classList.contains('food')) {
        container.children[head].classList.toggle('food');    
        //snake.push(parseInt(container.children[snake[snake.length - 1]].textContent) - inc);
        //container.children[snake[snake.length - 1]].classList.toggle('bodySnake');
        container.children[head].classList.toggle('bodysnake');
        header.classList.toggle('score');
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
        //console.log('location: ' + location);
        //console.log(snake.includes(location));
    } while (snake.includes(location));

    container.children[location].classList.toggle('food');
}

const add_score = () => {
    //funcion que acumula el puntaje en 10 cada vez que come
    score = score + 10;
    document.getElementById('score').innerHTML = score;
    header.classList.toggle('score');
    setTimeout(() => {
        header.classList.toggle('score');
    }, 1000);

}

const reset_game = () => {

    // for (i of snake) {
    for (let i = 0; i < snake.length; i++) {

        console.log("snake a borrar: " + snake);
        //   console.log("snake children: "+ i);
        if (container.children[snake[i]].classList.contains('headSnake')) {
            container.children[snake[i]].classList.toggle('headSnake');
        }
        else {
            if (container.children[snake[i]].classList.contains('bodySnake')) {
                container.children[snake[i]].classList.toggle('bodySnake');
            }
            else {
                if (container.children[snake[i]].classList.contains('bordes')) {
                    container.children[snake[i]].classList.toggle('bordes');
                }
            }
        }
    }

    console.log("antes de setearlo :" + snake)
    
    container.children[5].classList.add('headSnake');
    container.children[4].classList.add('bodySnake');
    snake = [5, 4];

    score = 0;
    console.log("snake: " + snake);
    document.getElementById('score').innerHTML = score;
}

const cerrarSesion = () => {

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cerrando sesión...',
        showConfirmButton: false,
        timer: 2000
    })
    setTimeout(() => {
        window.location.href = "./login.html";
    }, 2000);
 
}

let event_before = 'ArrowRight';

body.addEventListener('keyup', (event) => {
    //console.log('keyup');
    //console.log(event.key);
    //random_food();

    if (event.key === 'ArrowLeft') {
         if (choco) {    //está en alguno de los dos bordes
            if (chocobl){
                its_border();
            }
         }

        if (event_before !== 'ArrowRight') {
            mov(-1);
            event_before = event.key;
        }

    }
    if (event.key === 'ArrowUp') {
        //console.log('Nos movemos a arriba');
      
        if (event_before !== 'ArrowDown') {
            mov(-17);
            event_before = event.key;
        }


    }
    if (event.key === 'ArrowRight') {
        //console.log('Nos movemos a la derecha');
        if (choco) {  //está en alguno de los dos bordes
            if (chocobr){
                its_border();
            }
       }   
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



