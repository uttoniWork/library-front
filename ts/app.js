window.onload = function() {
    findBooksOfClient();
};

function getItem(){
    return localStorage.getItem(client)
    window.onload
}

function HideShow(id, inverse_id){
    document.getElementById(id).style.display = 'block';
    document.getElementById(inverse_id).style.display = 'none';
}

function showRegister(id){
    document.getElementById(id).style.display = 'block';
}

/////////////////////////////////////////////////////////////////////////////////////////////////
function searchBooks(idDiv){
    var campo = document.getElementById("text-search");
    if (campo.value !== "") {
        document.getElementById(idDiv).style.display = 'block';
    }
    else{
        window.alert("Preencha o campo de pesquisa")
    }

    findBooksOfTitle()
}

function validaCampo(){

    var title = document.getElementById("book_name").value
    var author = document.getElementById("autor").value
    var coverImage = document.getElementById("image").value
    var genre = document.getElementById("genero").value
    var editor = document.getElementById("editora").value
    var releaseYear = document.getElementById("ano").value

    console.log("validando campos");

    if (title !== '' && author !== '' && coverImage !== '' && genre !== '' && editor !== '' && releaseYear !== ''){
        return;
    }
}

function createBook(){

    validaCampo()

    console.log("campos validados");

    let url = 'http://localhost:15000/book';

    var form = document.getElementById("createForm");
    form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (event) {
        event.preventDefault();

        const clientId = 0
        const title = document.getElementById("book_name").value
        const author = document.getElementById("autor").value
        const coverImage = document.getElementById("image").value
        const genre = document.getElementById("genero").value
        const editor = document.getElementById("editora").value
        const releaseYear = document.getElementById("ano").value

        var clientRequest = {
            "clientId": clientId,
            "title": title,
            "author": author,
            "coverImage": coverImage,
            "genres": [genre],
            "editor": editor,
            "releaseYear": releaseYear
        };

        console.log("creating")

        fetch(url, {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientRequest)
        })
            .then(response => {
                console.log("created")
                response.json();
            })
    });

    alert("Livro cadastrado");

}

var clientBookList = []

//lista livros do cliente, deve ser carregado assim q a pagina carrega pra montar a lista de livros do cliente
function findBooksOfClient(){
    
    const clientId = 0;

    let url = 'http://localhost:15000/book?clientId=' + clientId;

    console.log("buscando livros")

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(json => {
        console.log("Found")
        console.log(json)

        var list = document.getElementById("client-book-list")

        console.log("criando container")

        json.forEach(function(book) {

            console.log(book)

            var li = document.createElement("li")
            var container = document.createElement("div")

            var img = document.createElement("img")
            img.style.height="250px"
            img.src = book.coverImage
            var title = document.createElement("figcaption")
            title.textContent = book.title
            var author = document.createElement("figcaption")
            author.textContent = book.author
            var editor = document.createElement("figcaption")
            editor.textContent = book.editor
            var releaseYear = document.createElement("figcaption")
            releaseYear.textContent = book.releaseYear
            var genres = document.createElement("figcaption")
            genres.textContent = book.genres.map(obj => obj.genreName).join(", ");

            container.appendChild(img)
            container.appendChild(title)
            container.appendChild(author)
            container.appendChild(editor)
            container.appendChild(releaseYear)
            container.appendChild(genres)

            li.appendChild(container)
            list.appendChild(li)

            console.log("container criado com imagem")
        })
    })
}

//pesquisa livros por genero
function findBooksSearched(){

    var bookTitle = document.getElementById("text-search").value;

    let url = 'http://localhost:15000/book/title?bookTitle=' + bookTitle;

    console.log("searching ", bookTitle)

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(json => {
        console.log("Found")
        //console.log(json)

        var list = document.getElementById("search-book-list")

        console.log("criando container")

        json.forEach(function(book) {

            console.log(book)

            var li = document.createElement("li")
            var container = document.createElement("div")

            var img = document.createElement("img")
            img.style.height="250px"
            img.src = book.coverImage
            var title = document.createElement("figcaption")
            title.textContent = book.title
            var author = document.createElement("figcaption")
            author.textContent = book.author
            var editor = document.createElement("figcaption")
            editor.textContent = book.editor
            var releaseYear = document.createElement("figcaption")
            releaseYear.textContent = book.releaseYear
            var genres = document.createElement("figcaption")
            genres.textContent = book.genres.map(obj => obj.genreName).join(", ");

            var addButton = document.createElement("button")
            addButton.textContent="ADD"
            addButtton.onclick="addBookToClient()"

            container.appendChild(img)
            container.appendChild(title)
            container.appendChild(author)
            container.appendChild(editor)
            container.appendChild(releaseYear)
            container.appendChild(genres)

            li.appendChild(container)
            list.appendChild(li)

            console.log("container criado com imagem")
        })
    })
}

//Chamado pelo botão de + quando for adicionar um livro q já existe à lista do cliente
//padraoADD
function addBookToClient(){

    let url = 'http://localhost:15000/book/choose';

    const clientId = 4
    const bookId = 2

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
}