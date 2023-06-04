var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");
var element = document.getElementById("content");

btnSignin.addEventListener("click", function () {
    body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});

function setItem(client){
    localStorage.setItem(client);
}

function create() {
    let url = 'http://localhost:15000/client';

    var form = document.getElementById("create");
    form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (event) {
        event.preventDefault();

        const userName = document.getElementById("userName").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        var clientRequest = {
          "userName": userName,
          "email": email,
          "password": password,
        };

        fetch(url, {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientRequest)
        })
            .then(response => {
                response.json();
                window.alert("usuario cadastrado");
            })
    });

    verificaCamposCreate();
}

function login() {

    var form = document.getElementById("login");
    form === null || form === void 0 ? void 0 : form.addEventListener("submit",function (event) {
        event.preventDefault();

        const email = document.getElementById("emailLogin").value
        const password = document.getElementById("passwordLogin").value

        let url = 'http://localhost:15000/client/login?email=' + email + '&password=' + password;

        fetch(url, {
            method: 'GET',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response =>  response.json())
            .then((json) => {
                setItem(json);
                window.location.replace('./index.html');

            })
    });

    if(verificaCamposLogin() === true){
        window.location.replace('./index.html');
    }

}


/////////////////////////////////////////////////////////////////
var campo_nome = document.getElementById("userName");
var campo_email = document.getElementById("email");
var campo_senha = document.getElementById("password");

var campo_login_email = document.getElementById("emailLogin");
var campo_login_senha = document.getElementById("passwordLogin");
//////////////////////////////////////////////////////////////////////////
function verificaCamposLogin(){

    if (campo_login_email.value !== "" && campo_login_senha.value !== "") {
        return true
    } else{
        return false
    }

}

function verificaCamposCreate(){
    if (campo_senha.value !== "" && campo_nome.value !== "" && campo_email.value !== "") {
            window.alert("Usuario cadastrado!");
      } 
}
////////////////////////////////////////////////////////////////////////