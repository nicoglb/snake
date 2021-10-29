import { createUser, getUsers, getUsersById } from './snakeApi.js'
$(function () {

  localStorage.removeItem('usuario_nuevo');
  localStorage.removeItem('usuario_logueado');
  var dialog, form,
    // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
    emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    name = $("#name"),
    fullname = $("#fullname"),
    email = $("#email"),
    password = $("#password"),
    pass = $("#pass"),
    user_name = $("#user_name"),
    allFields = $([]).add(name).add(fullname).add(email).add(password),
    tips = $(".validateTips");
  let user;
  let user_nuevo;
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

  function setUsuario(p_name, p_fullname, p_email, p_pass) {
    localStorage.removeItem('usuario_nuevo');
    user_nuevo = {
      username: p_name,
      fullname: p_fullname,
      email: p_email,
      password: p_pass
    };

    localStorage.setItem('usuario_nuevo', JSON.stringify(user_nuevo));
    return user_nuevo;
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

    valid = valid && checkLength(name, "username", 3, 16);
    valid = valid && checkLength(fullname, "fullname", 3, 16);
    valid = valid && checkLength(email, "email", 6, 80);
    valid = valid && checkLength(password, "password", 5, 16);

    valid = valid && checkRegexp(name, /^[a-z]([0-9a-z_\s])+$/i, "El nombre de usuario debe contener digitos a-z, 0-9, guiones bajos, espacios y debe comenzar con una letra.");
    valid = valid && checkRegexp(email, emailRegex, "Email Incorrecto. Ejemplo: player1@snakeApi.com");
    valid = valid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "El campo password Solo permite: a-z 0-9");

    if (valid) {

      const newUser = setUsuario(name.val(), fullname.val(), email.val(), password.val());

      console.log('iNGRESO AL CREATE');
      (async () => {
        try{
        const result = await createUser({
          username: newUser.username,
          fullname: newUser.fullname,
          email: newUser.email,
          password: newUser.password
        });
        Toast.fire({
          icon: 'success',
          title: 'Se creo tu cuenta ' + user_nuevo.username + '!',
          text: 'Logueate para Comenzar'
        });
  
      }
      catch (error){
        console.error(error);
        Toast.fire({
          icon: 'error',
          title: 'Ocurrio un error, posiblemente ya exista un jugador con el username'
          
        });
      }

      })();

      
      dialog.dialog("close");
    }
    return valid;
  }

  dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 440,
    width: 350,
    modal: true,
    buttons: {
      "Crear Cuenta": addUser,
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

  $("#btnCrearCuenta").button().on("click", function () {
    dialog.dialog("open");
  });

  $("#btnIniciarJuego").button().on("click", function () {

    if (user_name.val() !== "" && pass.val() !== "") {
      user = {
        username: user_name.val(),
        password: pass.val()
      }

      const traer_resu = (async () => {
        try {
          const result = await getUsersById(user.username);
          console.log(result);

          if (result.password === user.password) { 
            Toast.fire({
              icon: 'success',
              title: 'Que disfutes del juego ' + result.username + '!'
            });
            localStorage.setItem('usuario_logueado', JSON.stringify(result));
           // console.log(localStorage.getItem('usuario_logueado'));
            setTimeout(function(){window.location.href = "./index.html";},2000);
          }
          else {

            Toast.fire({
              icon: 'error',
              title: 'Tu contraseña es Invalida'
            });
            pass.val('');

          }
        }
        catch (error) { 
          console.log(error);
          Toast.fire({
            icon: 'error',
            title: 'No se ha encontrado un jugador con tu username'
          });
        }
      })();









      //  setTimeout(function(){window.location.href = "./index.html";},2000);
    }
    else {
      Toast.fire({
        icon: 'error',
        title: 'Username y Password son requeridos'
      })
    }
  });
}
);



