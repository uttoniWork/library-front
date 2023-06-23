
var clientLogged = null;

document.addEventListener("DOMContentLoaded", function() {
    var clientData  = localStorage.getItem("client");
    clientLogged = null;

    if (clientData) {
        var client = JSON.parse(clientData);
        clientLogged = client
        console.log(client);
    }

    if(clientLogged==null){
        window.location.href = './cadastro';
    }
});

window.onload = function() {
    if(clientLogged == null){
        window.location.href = './cadastro';
    }
    document.getElementById("clientName").textContent = clientLogged.userName
    findBooksRecomended();
};

function HideShow(primeiroId, segundoId,terceiroId){
    document.getElementById(primeiroId).style.display = 'block';
    document.getElementById(segundoId).style.display = 'none';
    document.getElementById(terceiroId).style.display = 'none';
}

function showRegister(id, idButton){
    document.getElementById(id).style.display = 'block';
    document.getElementById(idButton).style.display = 'none';
    var list = document.getElementById("search-book-list");
    list.style.display = 'none';
}

/////////////////////////////////////////////////////////////////////////////////////////////////

function logOff(){
    localStorage.setItem("client", null);
    window.location.href = './cadastro';
}

function searchBooks(idDiv){
    var campo = document.getElementById("text-search");
    if (campo.value !== "") {
        document.getElementById(idDiv).style.display = 'block';
    }
    else{
        window.alert("Preencha o campo de pesquisa")
    }

    findBooksSearched()
}
const gender = document.querySelectorAll('.options');
gender.forEach(option => {
    option.addEventListener('click', () => {
        gender.forEach(option => {
            option.classList.remove('selected');
        });
        option.classList.add('selected');
    });
});

function getValues(){
    const clientId = clientLogged.clientId
    const title = document.getElementById("book_name").value
    const author = document.getElementById("autor").value
    const coverImage = document.getElementById("image").value
    const editor = document.getElementById("editora").value
    const releaseYear = document.getElementById("ano").value

    const options = document.querySelectorAll(".options");
    const selectedOptions = Array.from(options).filter(option => option.getAttribute("aria-selected") === "true");
    const selectedOptionsString = [];
    selectedOptions.forEach(elemento =>{
        const valor = elemento.textContent;
        selectedOptionsString.push(valor);
    })
    if(selectedOptionsString.length < 1){
        window.alert("Selecione 1 genero!")
        console.log("Generos vazios")
        return
    }

    console.log(selectedOptionsString);
    console.log(selectedOptions);

    var clientRequest = {
        "clientId": clientId,
        "title": title,
        "author": author,
        "coverImage": coverImage,
        "genres": selectedOptionsString,
        "editor": editor,
        "releaseYear": releaseYear
    };

    return clientRequest
}


function validaCampo(){

    var title = document.getElementById("book_name").value
    var author = document.getElementById("autor").value
    var coverImage = document.getElementById("image").value
    var editor = document.getElementById("editora").value
    var releaseYear = document.getElementById("ano").value

    if (title !== '' && author !== '' && coverImage !== '' && editor !== '' && releaseYear !== ''){
        console.log("campos validados");
        return true;
    }else{
        return false
    }

}

function createBook(){

    console.log("tentando")

    if(!validaCampo()){
        window.alert("Preencha todos os campos")
        return
    }
    var spin = document.getElementById("spinner");
    spin.style.display = 'flex ';
    let url = 'http://localhost:15000/book';
        
    console.log("finder spiner")

    console.log("creating")
    const clientRequest = getValues()
    

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientRequest)
    })
    .then(response => {
        showRegister('cadButton','content')
        response.json();
        spin.style.display = 'none';
    })
}

var clientBookList = []

//lista livros do cliente, deve ser carregado assim q a pagina carrega pra montar a lista de livros do cliente
function findBooksOfClient() {
    var clientId = clientLogged.clientId;

    let url = 'http://localhost:15000/book?clientId=' + clientId;

    console.log("buscando livros");

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(json => {
        console.log("Found");
        console.log(json);

        var list = document.getElementById("client-book-list");

        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        console.log("criando container");

        json.forEach(function(book) {
            var li = document.createElement("li");
            li.style.listStyleType = 'none';
            var container = document.createElement("div");
            container.classList.add("bookList");
            container.style.display = "inline-block";
            container.style.margin = "10px 0";

            var img = document.createElement("img");
            img.style.height = "250px";
            img.src = book.coverImage;

            var title = document.createElement("h4");
            title.textContent = book.title;

            var author = document.createElement("p");
            author.textContent = "Autor: " + book.author;

            var editor = document.createElement("p");
            editor.textContent = "Editora: " + book.editor;

            var releaseYear = document.createElement("p");
            releaseYear.textContent = "Lançamento: " + book.releaseYear;

            var genres = document.createElement("p");
            genres.textContent = "Gêneros: " + book.genres.map(obj => obj.genreName).join(", ");

            container.appendChild(img);
            container.appendChild(title);
            container.appendChild(author);
            container.appendChild(editor);
            container.appendChild(releaseYear);
            container.appendChild(genres);

            li.appendChild(container);
            list.appendChild(li);

            console.log("container criado com imagem");
        });
    });
}


//pesquisa livros por genero
function findBooksSearched() {

    var list = document.getElementById("search-book-list");
    list.style.display = 'block';

    var notFound = document.getElementById("content");
    notFound.style.display = 'none';

    var spin = document.getElementById("spinner");
    spin.style.display = 'flex';

    var bookTitle = document.getElementById("text-search").value;

    let url = 'http://localhost:15000/book/title?bookTitle=' + bookTitle + '&clientId=' + clientLogged.clientId;

    console.log("searching ", bookTitle);

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(json => {
        var list = document.getElementById("search-book-list");

        if (list.firstChild != null) {
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        }

        console.log("criando container");

        json.forEach(function(book) {
            var li = document.createElement("li");
            li.style.listStyleType = 'none';
            var container = document.createElement("div");
            container.classList.add("searchList");
            container.style.display = "inline-block";
            container.style.margin = "10px 0";

            var img = document.createElement("img");
            img.style.height = "250px";
            img.src = book.coverImage;

            var title = document.createElement("h4");
            title.textContent = book.title;

            var author = document.createElement("p");
            author.textContent = "Autor: " + book.author;

            var editor = document.createElement("p");
            editor.textContent = "Editora: " + book.editor;

            var releaseYear = document.createElement("p");
            releaseYear.textContent = "Lançamento: " + book.releaseYear;

            var genres = document.createElement("p");
            genres.textContent = "Gêneros: " + book.genres.map(obj => obj.genreName).join(", ");

            var addButton = document.createElement("button");
            addButton.classList.add("searchListButton");
            addButton.textContent = "Adicionar a lista";
            addButton.id = book.bookId;
            addButton.onclick = function() {
                addBookToClient(book.bookId);
                addButton.style.display = "none";
            };

            container.appendChild(img);
            container.appendChild(title);
            container.appendChild(author);
            container.appendChild(editor);
            container.appendChild(releaseYear);
            container.appendChild(genres);
            container.appendChild(addButton);

            li.appendChild(container);
            list.appendChild(li);

            console.log("container criado com imagem");
        });

        var notFound = document.getElementById("not-found");
        notFound.style.display = "block";

        spin.style.display = 'none';
    });
}

function findBooksRecomended() {

    var spin = document.getElementById("spinner");
    spin.style.display = 'flex';

    var clientId = clientLogged.clientId;

    let url = 'http://localhost:15000/book/recomend?clientId=' + clientId;

    console.log("buscando livros RECOMENDADOS");

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(json => {
        console.log("Found");
        console.log(json);

        var list = document.getElementById("recomendation-book-list");

        if (list.firstChild != null) {
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        }

        console.log("criando container");

        json.forEach(function(book) {
            var li = document.createElement("li");
            li.style.listStyleType = 'none';
            var container = document.createElement("div");
            container.classList.add("bookList");
            container.style.display = "inline-block";
            container.style.margin = "10px 0";

            var img = document.createElement("img");
            img.style.height = "250px";
            img.src = book.coverImage;

            var title = document.createElement("h4");
            title.textContent = book.title;

            var author = document.createElement("p");
            author.textContent = "Autor: " + book.author;

            var editor = document.createElement("p");
            editor.textContent = "Editora: " + book.editor;

            var releaseYear = document.createElement("p");
            releaseYear.textContent = "Lançamento: " + book.releaseYear;

            var genres = document.createElement("p");
            genres.textContent = "Gêneros: " + book.genres.map(obj => obj.genreName).join(", ");
            console.log("GENRES: ",  book.genres.map(obj => obj.genreName).join(", ") );

            var addButton = document.createElement("button");
            addButton.classList.add("searchListButton");
            addButton.textContent = "Adicionar a lista";
            addButton.onclick = function() {
                addBookToClient(book.bookId);
                addButton.style.display = "none";
            };
            
            container.appendChild(img);
            container.appendChild(title);
            container.appendChild(author);
            container.appendChild(editor);
            container.appendChild(releaseYear);
            container.appendChild(genres);
            container.appendChild(addButton);
            
            li.appendChild(container);
            list.appendChild(li);

            console.log("container criado com imagem");
            spin.style.display = 'none';
        });
    });
}

//Chamado pelo botão de + quando for adicionar um livro q já existe à lista do cliente
//padraoADD
function addBookToClient(bookId){


    var spin = document.getElementById("spinner");
    spin.style.display = 'flex ';
    let url = 'http://localhost:15000/book/choose';

    const clientId = clientLogged.clientId

    var clientBookRequest = {
        "clientId": clientId,
        "bookId": bookId
    };

    console.log("request: ", clientBookRequest)

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientBookRequest)
    }) 
    .then(response => {
        spin.style.display = 'none';
    })
}

function cleanSearches(){

    var list = document.getElementById("search-book-list")
    var input = document.getElementById("text-search");
    input.value = "";

    if(list.firstChild != null){
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }

    var notFound = document.getElementById("not-found");
    notFound.style.display = "none";
}

// ------------------------------   GENDERS ---------------------------------------
//-------------------------------   ALTERA  ---------------------------------------
// Selecionando todos os elementos de opção
const options = document.querySelectorAll(".options");
// Adicionando um evento de escuta a cada elemento de opção
options.forEach(option => {
    option.addEventListener("click", function() {
        // Alterando o valor do atributo aria-selected para o elemento clicado
        const gender = option.getAttribute("aria-selected") === "true";
        option.setAttribute("aria-selected",!gender);
    });
});
