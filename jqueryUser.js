$( function() {
    var dialog, form,
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#name" ),
      email = $( "#email" ),
      password = $( "#password" ),
      pass = $( "#pass" ),
      user_name = $( "#user_name" ),
      allFields = $( [] ).add( name ).add( email ).add( password ),
      tips = $( ".validateTips" );
      valLogin=$(".VentanaValidacion");
      let user;
      let user_nuevo;
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer:2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }

 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "El tamaño de " + n + " debe estar comprendido entre " +
          min + " y " + max + " digitos" );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 
    function addUser() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( name, "username", 3, 16 );
      valid = valid && checkLength( email, "email", 6, 80 );
      valid = valid && checkLength( password, "password", 5, 16 );
 
      valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "El nombre de usuario debe contener digitos a-z, 0-9, guiones bajos, espacios y debe comenzar con una letra." );
      valid = valid && checkRegexp( email, emailRegex, "Email Incorrecto. Ejemplo: player1@snakeApi.com" );
      valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "El campo password Solo permite: a-z 0-9" );
 
      if ( valid ) {
       // $( "#users tbody" ).append( "<tr>" +
       //   "<td>" + name.val() + "</td>" +
       //   "<td>" + email.val() + "</td>" +
       //   "<td>" + password.val() + "</td>" +
       // "</tr>" );

        user_nuevo = {
          username:  name.val(),
          email: email.val(),
          password: password.val()
        };

        Toast.fire({
          icon: 'success',
          title: 'Se creo tu cuenta ' + user_nuevo.username +'!' ,
          text: 'Logueate para Comenzar'
        })

        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 440,
      width: 350,
      modal: true,
      buttons: {
        "Crear Cuenta": addUser,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
      }
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      addUser();
    });
 
    $( "#btnCrearCuenta" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });

    $( "#btnIniciarJuego" ).button().on( "click", function() {
    
      if (user_name.val()!== "" && pass.val()!== "") {
         user = {
          username: user_name.val(),
          password: pass.val()
        }
        
        console.log(user);
        Toast.fire({
          icon: 'success',
          title: 'Que disfutes del juego ' + user.username +'!' 
        })
      }
      else {
        Toast.fire({
          icon: 'error',
          title: 'Username y Password son requeridos'
        })
      }
    });
  } );