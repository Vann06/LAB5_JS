


let posts = []; // Global array for storing API data

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", () => {
    inicializarInterfaz();
    agregarEventos();
    fetchPosts();
});


// funcion para traer datos 
function fetchPosts() {
    fetch('http://awita.site:3000/posts')
        .then(response => response.json()) 
        .then(data => {
            if (data.posts) { 
                posts = data.posts;
                renderizarPosts();
            } else {
                console.error("Invalid API response:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching posts:", error);
        });
}


// Función para inicializar la interfaz
function inicializarInterfaz() {
    crearContenedorPosts();
    crearBarraBusqueda();
}

// Función para agregar eventos
function agregarEventos() {
    searchBar.addEventListener("input", () => renderizarPosts(searchBar.value));
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
    searchCont.style.backgroundColor = "#5ea868";
    searchCont.style.borderBottom = "1.5px solid gray";
    searchCont.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.4)"; 
    searchCont.style.gap = "10px";

    // Crear el texto antes del searchBar
    const searchText = document.createElement("p");
    searchText.innerText = "SEARCH BAR";
    searchText.style.fontSize = "24px";
    searchText.style.color = "#edf2ee";
    searchText.style.margin = "0";
    searchText.style.marginRight = "60px"; 
    searchText.style.fontFamily = "Luminari, fantasy";

    // Crear icono de busqueda 
    const searchIcon = document.createElement("img");
    searchIcon.src = "https://cdn-icons-png.flaticon.com/512/622/622669.png"; // Icono de Flaticon 
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
    postsCont.style.position = "relative";
    postsCont.style.width = "100%";
    postsCont.style.minHeight = "100vh"; 
    postsCont.style.margin = "80px auto 20px"; 
    postsCont.style.alignItems = "center";
    postsCont.style.padding = "40px";
    postsCont.style.backgroundColor = "#f2faf3";
    postsCont.style.boxSizing = "border-box";
    postsCont.style.boxShadow = "4px 4px 4px 4px rgba(0, 0, 0, 0.4)"; 
    postsCont.style.gap = "10px";

    document.body.appendChild(postsCont);

}

// Función para crear un solo post 
function crearPost(post){
    const cardPost = document.createElement("div");
    cardPost.className = "card-post";
    cardPost.style.display = "flex";
    cardPost.style.width = "90%";
    cardPost.style.height = "auto";
    cardPost.style.alignItems = "center";
    cardPost.style.padding = "10px";
    cardPost.style.marginBottom = "10px";
    cardPost.style.border = "1px solid rgb(255, 255, 255)";
    cardPost.style.borderRadius = "20px";
    cardPost.style.backgroundColor = "rgb(255, 255, 255)";
    cardPost.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.6)";
    cardPost.style.cursor = "pointer"; 

    // Imagen del post
    const imgPost = document.createElement("img");
    imgPost.src = fixRedditImage(post.imagen);
    imgPost.alt = post.titulo;
    imgPost.style.width = "160px";
    imgPost.style.height = "120px";
    imgPost.style.borderRadius = "10px";
    imgPost.style.marginRight = " 35px";
    imgPost.style.border = "1pz solid black";
    imgPost.style.left = "100%";
    imgPost.style.objectFit = "cover"; // Ensure image fits well
    imgPost.style.display = "block"; // Ensure it doesn't break layout
    imgPost.style.marginLeft = "auto"; // mandar la imagen hasta la derecha

    // Crear nuevo contenedor para texto 
    const textCont = document.createElement("div");
    textCont.style.display = "flex";
    textCont.style.flexDirection = "column";
    textCont.style.textAlign = "left";
    textCont.style.width = "60%";
    textCont.style.overflow = "hidden"; 


    // Titulo del post 
    const postTitle = document.createElement("h2");
    postTitle.innerText = post.titulo;
    postTitle.style.fontSize = "26px";
    postTitle.style.color = "#333";
    postTitle.style.margin = "5px";
    postTitle.style.marginRight = "60px"; 
    postTitle.style.fontFamily = "FreeMono";


    // Descripcion del post
    const postDes = document.createElement("p");
    postDes.innerText = post.descripcion;
    postDes.style.fontSize = "12px";

    
    textCont.appendChild(postTitle);
    textCont.appendChild(postDes);
    cardPost.appendChild(textCont);
    cardPost.appendChild(imgPost);
 
    // Crear listener para hacerle click al post
    cardPost.addEventListener("click", () => seleccionarPost(post.id));

    return cardPost; 
}

function fixRedditImage(imageUrl) {
    if (imageUrl.includes("reddit.com/media?url=")) {
        return decodeURIComponent(imageUrl.split("url=")[1]); 
    }
    return imageUrl; 
}


// Función para renderizar posts
function renderizarPosts(filtro = "") {
    const contenedor = document.getElementById("contenedor-posts");
    contenedor.innerHTML = ""; 
    // crear el filtro con respecto al titulo 
    const postsFilter = posts.filter(post =>
        post.titulo.toLowerCase().includes(filtro.toLowerCase())
    )

    // Lógica para mostrar los posts filtrados
    if (postsFilter.length > 0){
        postsFilter.forEach(post => {
            const cardPost = crearPost(post); 
            contenedor.appendChild(cardPost); 
        });
    }
    else {
        // mostrar mensaje de que no se encontro
        const mensaje = document.createElement("p");
        mensaje.innerText = "No posts found 😿";
        mensaje.style.textAlign = "center";
        mensaje.style.fontSize = "18px";
        mensaje.style.color = "#666";
        contenedor.appendChild(mensaje);
    }
}

const postsFiltrados = posts.filter(post => 
    post.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    post.descripcion.toLowerCase().includes(filtro.toLowerCase())
);


// ------------ 2NDA PAGINA -------------

// Función para manejar la selección de un post
function seleccionarPost(postId) {
    const post = posts.find(p => p.id == postId); 
    if (!post) return;
    document.body.innerHTML = ""; 
    DetallePost(post);
}

function DetallePost(post) {

    // Create a container div for the detailed pos(t view
    const contenedor = document.createElement("div");
    contenedor.id = "detalle-contenedor";
    contenedor.style.width = "80%";
    contenedor.style.margin = "50px auto";
    contenedor.style.padding = "20px";
    contenedor.style.border = "1px solid #ddd";
    contenedor.style.borderRadius = "10px";
    contenedor.style.backgroundColor = "rgb(255, 255, 255)";
    contenedor.style.boxShadow = "0px 2px 6px rgba(0, 0, 0, 0.2)";
    contenedor.style.textAlign = "center";
    
    // Create an H1 element for the post title
    const title = document.createElement("h1");
     title.innerText = post.titulo;
     title.style.fontSize = "26px";
     title.style.color = "#333";
     title.style.margin = "5px";
     title.style.marginRight = "60px"; 
     title.style.fontFamily = "FreeMono";
    
    // Create an img element for the post image
    const imgPost = document.createElement("img");
    imgPost.src = fixRedditImage(post.imagen);
    imgPost.alt = post.titulo;
    imgPost.style.width = "160px";
    imgPost.style.height = "120px";
    imgPost.style.borderRadius = "10px";
    imgPost.style.marginRight = " 35px";
    imgPost.style.border = "1pz solid black";
    imgPost.style.objectFit = "cover";
    imgPost.style.left = "100%";
    imgPost.style.marginLeft = "auto"; // mandar la imagen hasta la derecha

    // Create a p element for the post description
    const postDes = document.createElement("p");
    postDes.innerText = post.descripcion;
    postDes.style.color = "#555";
    postDes.style.fontSize = "18px";

     // Botón para regresar
     const backButton = document.createElement("button");
     backButton.innerText = " Back";
     backButton.style.padding = "10px 20px";
     backButton.style.fontSize = "16px";
     backButton.style.border = "none";
     backButton.style.borderRadius = "5px";
     backButton.style.backgroundColor = "#5ea868";
     backButton.style.color = "white";
     backButton.style.cursor = "pointer";
     backButton.style.marginTop = "20px";

     // Evento para regresar a la pantalla principal
    backButton.addEventListener("click", () => {
        document.body.innerHTML = "";
        inicializarInterfaz();
        renderizarPosts();
    });

    
    // Agregar elementos al contenedor
    contenedor.appendChild(title);
    contenedor.appendChild(imgPost);
    contenedor.appendChild(postDes);
    contenedor.appendChild(backButton);

    // Agregar contenedor al cuerpo de la página
    document.body.appendChild(contenedor);
}

// funcion para generar los comentarios de un post especifico 
function comments(post){


}