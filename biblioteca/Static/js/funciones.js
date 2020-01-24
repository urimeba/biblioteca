// Function para obtener el token
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {  
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

login = () =>{
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    let token = getCookie('csrftoken');

    if(user=="" || password==""){
        alert("Los campos no pueden estar vacios. Favor de verificarlos");
    }
    else{
         $.ajax({ 
            type: 'POST',
            url: 'login',
            data: {usuario:user, contraseña:password, csrfmiddlewaretoken: token},
            success: function(data){
                if(data=="True"){
                    console.log("Si")
                    location.href = "solicitudes"
                }
                else{
                    alert(data);
                }
            }
        });
    }
}

agregarListeners = () =>{
    let botones = document.getElementsByClassName("btn-success");
    let botonesRechazar = document.getElementsByClassName("btn-danger");

    for (let x=0; x<botones.length; x++){
        botones[x].addEventListener("click", function(){
            aprobarSolicitud(botones[x].id)
        })
    }

    for (let x=0; x<botonesRechazar.length; x++){
        botonesRechazar[x].addEventListener("click", function(){
            rechazarSolicitud(botones[x].id)
        })
    }
}

aprobarSolicitud = (id) =>{
    let token = getCookie('csrftoken')

    arreglo = id.split("-");
    id=arreglo[1];
    $.ajax({ 
        type: 'POST',
        url: 'aprobarSolicitud',
        data: {idSolicitud:id, csrfmiddlewaretoken: token},
        success: function(data){
            alert(data);

            let estado = document.getElementById("solicitud-"+id);
            estado.removeAttribute("class");
            estado.classList.add("bg-success");
            estado.innerHTML = "Aprobada";
        }
    });
}

rechazarSolicitud = (id) =>{
    let token = getCookie('csrftoken')

    arreglo = id.split("-");
    id=arreglo[1];

    $.ajax({ 
        type: 'POST',
        url: 'rechazarSolicitud',
        data: {idSolicitud:id, csrfmiddlewaretoken: token},
        success: function(data){
            alert(data);

            let estado = document.getElementById("solicitud-"+id);
            estado.removeAttribute("class");
            estado.classList.add("bg-danger");
            estado.innerHTML = "Rechazada";
        }
    });
}
