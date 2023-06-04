
const btnSignin = document.querySelector("#signin") as HTMLInputElement;
const btnSignup = document.querySelector("#signup") as HTMLInputElement;

var body = document.querySelector("body") as HTMLBodyElement;
var element = document.getElementById("content")

btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})

function HideShow(id, inverse_id){
    document.getElementById(id).style.display = 'block';
    document.getElementById(inverse_id).style.display = 'none';
}

function login() {
    window.open('./index.html');
    window.close();
}
function create() {
    const form = document.getElementById("create") as HTMLFormElement;
    form?.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(form);
    })

    alert("usuario cadastrado")
    window.close();
    window.open('./index.html');
}