
// crear datos dummy
const posts = [
    {
        "imagen": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "titulo": "Google",
        "descripcion": "Motor de búsqueda",
        "id": 1
    },
    {
        "imagen": "https://www.facebook.com/images/fb_icon_325x325.png",
        "titulo": "Facebook",
        "descripcion": "Red social",
        "id": 2
    }
]


const post = [
    {
        "imagen": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "titulo": "Google",
        "descripcion": "Motor de búsqueda",
        "id": 1,
        "comentarios": [
            {
                "id": 1,
                "comentario": "Excelente buscador"
            },
            {
                "id": 2,
                "comentario": "Muy útil"
            }
        ]
    }
]



// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", () => {
    inicializarInterfaz();
    agregarEventos();
    renderizarPosts();
});

// Función para inicializar la interfaz
function inicializarInterfaz() {
    crearBarraBusqueda();
    crearContenedorPosts();
}

// Función para agregar eventos
function agregarEventos() {
    searchBar.addEventListener("input", () => renderizarPosts(searchBar.value));
}

// Función para renderizar posts
function renderizarPosts(filtro = "") {
    // Lógica para mostrar los posts filtrados
}

// Función para crear la barra de búsqueda
function crearBarraBusqueda() {
    // Crear el div-contenedor
    const searchCont = document.createElement("div");
    searchCont.style.position = "fixed";
    searchCont.style.top = 0;
    searchCont.style.left = 0;
    searchCont.style.width = "100%";
    searchCont.style.alignItems = "center";
    searchCont.style.display = "flex";
    searchCont.style.height = "50px";
    searchCont.style.padding = "10px";
    searchCont.style.borderBottom = "1.5px solid gray";
    searchCont.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.4)"; 
    searchCont.style.gap = "10px";

    // Crear el texto antes del searchBar
    const searchText = document.createElement("p");
    searchText.innerText = "SEARCH BAR";
    searchText.style.fontSize = "16px";
    searchText.style.color = "#333";
    searchText.style.margin = "0";
    searchText.style.marginRight = "60px"; 
    searchText.style.fontFamily = "Luminari, fantasy";

    // Crear icono de busqueda 
    const searchIcon = document.createElement("img");
    searchIcon.src = "https://cdn-icons-png.flaticon.com/512/622/622669.png"; // Magnifying glass icon
    searchIcon.alt = "Search";
    searchIcon.style.width = "20px";
    searchIcon.style.height = "20px";
    searchIcon.style.marginLeft = "10px";

    // Crear el SearchBar 
    searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.placeholder = "    Search RedditUVG...";
    searchBar.style.borderRadius = "25px"; 
    searchBar.style.borderColor = "#e5ebee";
    searchBar.style.backgroundColor = "#e5ebee"; 
    searchBar.style.fontSize = "16px";
    searchBar.style.flexGrow = "0.7";

    // Agregar al contenedor 
    searchCont.appendChild(searchIcon);
    searchCont.appendChild(searchText);
    searchCont.appendChild(searchBar);
    document.body.appendChild(searchCont);

}

// Función para crear el contenedor de posts
function crearContenedorPosts() {
    // Crear y agregar el contenedor de posts al DOM
    const postsCont = document.createElement("div");
    postsCont.id = "contenedor-posts";
    postsCont.style.top = "80px";
    postsCont.style.left = 0;
    postsCont.style.width = "60%";
    postsCont.style.margin = "80px auto 20px"; 
    postsCont.style.alignItems = "center";
    postsCont.style.padding = "100%";
    postsCont.style.boxShadow = "4px 4px 4px 4px rgba(0, 0, 0, 0.4)"; 
    postsCont.style.gap = "10px";

    document.body.appendChild(postsCont);

}

// Función para manejar la selección de un post
function seleccionarPost(postId) {
    // Lógica para manejar la selección de un post
}
