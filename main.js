import { editUser, getUsersById } from './snakeApi.js'
$(function () {

  var dialog, form,

    // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
    emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    name = $("#name"),
    fullname = $("#fullname"),
    email = $("#email"),
    password = $("#password"),
    allFields = $([]).add(fullname).add(email).add(password),
    tips = $(".validateTips");
  let user_p_mostrar = JSON.parse(localStorage.getItem('usuario_logueado'));;
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  function setUsuarioEdit(p_name, p_fullname, p_email, p_pass) {
    localStorage.removeItem('usuario_logueado');
    let user_edit = {
      username: p_name,
      fullname: p_fullname,
      email: p_email,
      password: p_pass
    };

    localStorage.setItem('usuario_logueado', JSON.stringify(user_edit));
    return user_edit;
  }
  function updateTips(t) {
    tips
      .text(t)
      .addClass("ui-state-highlight");
    setTimeout(function () {
      tips.removeClass("ui-state-highlight", 1500);
    }, 500);
  }

  function checkLength(o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
      o.addClass("ui-state-error");
      updateTips("El tamaño de " + n + " debe estar comprendido entre " +
        min + " y " + max + " digitos");
      return false;
    } else {
      return true;
    }
  }

  function checkRegexp(o, regexp, n) {
    if (!(regexp.test(o.val()))) {
      o.addClass("ui-state-error");
      updateTips(n);
      return false;
    } else {
      return true;
    }
  }

  function addUser() {
    var valid = true;
    allFields.removeClass("ui-state-error");
    valid = valid && checkLength(fullname, "fullname", 3, 16);
    valid = valid && checkLength(email, "email", 6, 80);
    valid = valid && checkLength(password, "password", 5, 16);

    valid = valid && checkRegexp(email, emailRegex, "Email Incorrecto. Ejemplo: player1@snakeApi.com");
    valid = valid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "El campo password Solo permite: a-z 0-9");

    if (valid) {
      let user = setUsuarioEdit(name.val(), fullname.val(), email.val(), password.val());
      (async () => {
        try {
          const result = await editUser({
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            password: user.password
          });
          Toast.fire({
            icon: 'success',
            title: 'Se modificó correctamente tu usuario ' + user.username + '!',

          });

        }
        catch (error) {
          console.log(error);
          Toast.fire({
            icon: 'error',
            title: 'Ocurrio un error al intentar modificar tu usuario'

          });
        }

      })();
      //  $( "#users tbody" ).append( "<tr>" +

      //    "<td>" + email.val() + "</td>" +
      //    "<td>" + password.val() + "</td>" +
      //  "</tr>" );
      dialog.dialog("close");
    }
    return valid;
  }

  dialog = $("#dialog-form").dialog({

    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
      "Guardar Cambios": addUser,
      Cancel: function () {
        dialog.dialog("close");
      }
    },
    close: function () {
      form[0].reset();
      allFields.removeClass("ui-state-error");
    }
  });

  form = dialog.find("form").on("submit", function (event) {
    event.preventDefault();
    addUser();
  });

  function traerUserlogueado() {
    const traer_resu = (async () => {
      try {
        const result = await getUsersById(user_p_mostrar.username);
        console.log(result);
        name.val(result.username);
        fullname.val(result.fullname);
        email.val(result.email);
        password.val(result.password);

      }
      catch (error) {
        console.log(error);
      }
    })();

  }
  $("#editarCuenta").on("click", function () {
    traerUserlogueado();
    dialog.dialog("open");
  });

  $("#cerrarSesion").on("click", function () {

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

  });
});




let container = document.getElementById('container');
let body = document.getElementsByTagName('body')[0];
let header = document.getElementById('score');
let user_p_mostrar = JSON.parse(localStorage.getItem('usuario_logueado'));
document.getElementById('user').innerHTML = user_p_mostrar.username;

//header.addEventListener('transitionend', onTransitionEnd, false);

// console.log(container.children[0].style);
//header.classList.toggle('score');
container.children[132].classList.add('food');
container.children[122].classList.add('headSnake');
container.children[121].classList.add('bodySnake');

var snake = [122, 121];
var bordes = [0, 17];


const define_bordes = () => {

  let up = 0;
  let down = 238;
  let left = 0;
  let right = 16;

  while (left <= 238 & right <= 254) {
    container.children[left].classList.add('bordesLeft');
    container.children[right].classList.add('bordesRight');

    left += 17;
    right += 17;
  }
  while (up <= 16 & down <= 254) {
    container.children[up].classList.add('bordesUp');
    container.children[down].classList.add('bordesDown');
    up += 1;
    down += 1;
  }
}

define_bordes();

let comi;
let score = 0;
let choco;
let chocobl;
let chocobr;


let timeInterval = 500;
let interv;


const mov = (inc) => {

  let remove;
  // for (let b = 0; b < 52; b+17) {
  //   console.log("borde" +b);
  // }

  for (let index = 0; index < snake.length; index++) {

    //index=0; //esto si saco el for y el if
    if (index === 0) {
      console.log("index: " + index)
      console.log("index snake " + snake[index]);
      //cabeza
      container.children[snake[index]].classList.toggle('headSnake');
      //agrego al principio del array la nueva cabeza
      snake.unshift(parseInt(container.children[snake[index]].textContent) + inc);

      //console.log(snake[index]);
      //avanzo en los casilleros
      /* if (!container.children[snake[index]]) {
        console.log("entro");
        its_border();
        break;
      } */

      container.children[snake[index]].classList.toggle('headSnake');

      choco = its_border_lat(snake[index]);
      console.log("choco left funcion: " + chocobl);
      console.log("choco right funcion: " + chocobr);

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

const delete_no_comi = () => {

  if (!comi) {
    remove = snake.pop();
    console.log("pop" + remove)
    container.children[remove].classList.toggle('bodySnake');
    header.classList.toggle('score');

  }

}

async function its_border() {
  choco = false; //la vuelvo a incializar para que si choque no quede en true
  Swal.fire({
    icon: 'error',
    title: 'Game Over...',
    text: 'Chocaste con la pared!',
    showConfirmButton: false,
    timer: 1700,
    imageUrl: './images/headSnakeChoque.png',
    imageWidth: 100,
    imageHeight: 100,
    imageAlt: 'Custom image',
    customClass: {
      title: 'swaltext'
    }
  });
  clearInterval(interv);
  reset_game();
  //await re_load();
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
    clearInterval(interv);
    reset_game();
    return true;
  }

}

const its_border_lat = (head) => {
  chocobl = false;
  chocobr = false;

  if (container.children[head].classList.contains('bordesLeft') || container.children[head].classList.contains('bordesRight')) {
    console.log("choco con bordes");
    if (container.children[head].classList.contains('bordesLeft')) {
      console.log("choco con borde izquierdo");
      chocobl = true;
      return true;
    }
    else {
      console.log("choco con borde derecho");
      chocobr = true;
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

  container.children[122].classList.add('headSnake');
  container.children[121].classList.add('bodySnake');

  snake = [122, 121];
  event_before = 'ArrowRight';

  score = 0;
  console.log("snake: " + snake);
  document.getElementById('score').innerHTML = score;
}

const girarCabeza = (event) => {
  let cabeza = document.querySelector('.headSnake')
  console.log(cabeza);
  switch (event.key) {
    case 'ArrowLeft':
      cabeza.style.transform = 'scaleX(-1)';
      break;
    case 'ArrowUp':
      cabeza.style.transform = 'rotate(-90deg)';
      break;
    case 'ArrowRight':
      cabeza.style.transform = 'scaleX(1)';
      break;
    case 'ArrowDown':
      cabeza.style.transform = 'rotate(90deg)';
      break;
  }

}

const dualColor = () => {
  let body = document.querySelector('.bodySnake')
  for (const i in snake) {
    if (i % 2 === 0) {

    }
    else {

    }
  }
}

const chocare = (event) => {

  switch (event.key) {
    case 'ArrowLeft':
      if (container.children[snake[0]].classList.contains('bordesLeft')) {
        its_border()
        return true
      }
      break;
    case 'ArrowUp':
      if (container.children[snake[0]].classList.contains('bordesUp')) {
        its_border()
        return true
      }
      break;
    case 'ArrowRight':
      if (container.children[snake[0]].classList.contains('bordesRight')) {
        its_border()
        return true
      }
      break;
    case 'ArrowDown':
      if (container.children[snake[0]].classList.contains('bordesDown')) {
        its_border()
        return true
      }
      break;
  }

}

let event_before = 'ArrowRight';

const eventController = (event) => {

  if (event.key === 'ArrowLeft') {
    if (choco) {    //está en alguno de los dos bordes
      if (chocobl) {
        its_border();
      }
    }

    if (event_before !== 'ArrowRight' /* && !chocare(event) */) {
      mov(-1);
      girarCabeza(event)
      event_before = event.key;
    }

  }
  if (event.key === 'ArrowUp') {
    //console.log('Nos movemos a arriba');
    if (event_before !== 'ArrowDown' && !chocare(event)) {
      mov(-17);
      girarCabeza(event)
      event_before = event.key;
    }


  }
  if (event.key === 'ArrowRight') {
    //console.log('Nos movemos a la derecha');
    if (choco) {  //está en alguno de los dos bordes
      if (chocobr) {
        its_border();
      }
    }
    if (event_before !== 'ArrowLeft' /*&& !chocare(event)*/) {
      mov(1);
      girarCabeza(event)
      event_before = event.key;

    }


  }
  if (event.key === 'ArrowDown') {
    //console.log('Nos movemos a abajo');
    //console.log(event_before);

    if (event_before !== 'ArrowUp' && !chocare(event)) {
      mov(17);
      girarCabeza(event)
      event_before = event.key;
    }

  }


}

body.addEventListener('keyup', (event) => {
  //console.log('keyup');
  //console.log(event.key);
  //random_food();
  clearInterval(interv);
  interv = setInterval(eventController, timeInterval, event);


  //console.log(container);

})




