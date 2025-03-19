
let posts = []; // arreglo global para los posts

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", () => {
    inicializarInterfaz();
    agregarEventos();
    fetchPosts();
});

// funcion para traer posts 
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

// funcion para identificar la imagen desde reddit 
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
        post.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        post.descripcion.toLowerCase().includes(filtro.toLowerCase()) 
    );

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


// ====================== 2NDA PAGINA ==========================

// Función para manejar la selección de un post
function seleccionarPost(postId) {
    const post = posts.find(p => p.id == postId); 
    if (!post) return;
    document.body.innerHTML = ""; 
    DetallePost(post);
}

function DetallePost(post) {
    document.body.innerHTML = ""; // Limpiar pantalla

    // Contenedor principal del post
    const contenedor = document.createElement("div");
    contenedor.id = "detalle-contenedor";
    contenedor.style.width = "80%";
    contenedor.style.margin = "70px auto";
    contenedor.style.padding = "20px";
    contenedor.style.border = "1px solid #ddd";
    contenedor.style.borderRadius = "10px";
    contenedor.style.backgroundColor = "rgb(255, 255, 255)";
    contenedor.style.boxShadow = "0px 2px 6px rgba(0, 0, 0, 0.2)";
    contenedor.style.textAlign = "center";

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
    backButton.style.marginTop = "10px";
    backButton.style.position = "absolute";
    backButton.style.top = "10px";
    backButton.style.left = "10px";
    backButton.addEventListener("click", () => {
        document.body.innerHTML = "";
        inicializarInterfaz();
        renderizarPosts();
    });

    // Crear titulo
    const title = document.createElement("h1");
    title.innerText = post.titulo;
    title.style.fontSize = "26px";
    title.style.color = "#333";
    title.style.margin = "5px";
    title.style.fontFamily = "FreeMono";
    
    // Imagen del post
    const imgPost = document.createElement("img");
    imgPost.src = fixRedditImage(post.imagen);
    imgPost.alt = post.titulo;
    imgPost.style.width = "400px";
    imgPost.style.height = "250px";
    imgPost.style.borderRadius = "10px";
    imgPost.style.objectFit = "cover";

    const postDes = document.createElement("p");
    postDes.innerText = post.descripcion;
    postDes.style.color = "#555";
    postDes.style.fontSize = "18px";

    // Contenedor para escribir comentarios 
    const writeCommentsCont = document.createElement("div");
    writeCommentsCont.id = "write-comments-container";
    writeCommentsCont.style.padding = "10px";
    writeCommentsCont.style.marginBottom = "20px";
    writeCommentsCont.style.border = "2px solid #5ea868";
    writeCommentsCont.style.borderRadius = "5px";
    writeCommentsCont.style.backgroundColor = "#e0f7e9";

    // Contenedor de comentarios antiguos
    const commentsContainer = document.createElement("div");
    commentsContainer.id = "comments-container";
    commentsContainer.style.margin = "0 auto"; 
    commentsContainer.style.maxHeight = "300px";
    commentsContainer.style.overflowY = "auto";
    commentsContainer.style.border = "2px solid #5ea868";
    commentsContainer.style.borderTop = "1px solid #ddd";
    commentsContainer.style.padding = "10px";
    commentsContainer.style.backgroundColor = "#e0f7e9";

    // Agregar elementos al contenedor principal
    contenedor.appendChild(title);
    contenedor.appendChild(imgPost);
    contenedor.appendChild(postDes);
    contenedor.appendChild(writeCommentsCont); 
    contenedor.appendChild(commentsContainer);

    // Agregar contenedor a la pagina
    document.body.appendChild(contenedor);
    document.body.appendChild(backButton);

    // Agregar input para comentarios 
    commentInput(post.id);

    // Traer los comentarios del post
    fetchComments(post.id);
}

// Funcion para obtener comentarios 
function fetchComments(postId) {
    fetch(`http://awita.site:3000/comments/${postId}`)
        .then(response => response.json()) 
        .then(data => {
            if (data.comments) { 
                renderComments(data.comments);
            } else {
                console.error("Invalid API response:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching comments:", error);
        });
}

// Renderizar comentarios antiguos
function renderComments(comments) {
    const commentsContainer = document.getElementById("comments-container");
    if (!commentsContainer) return;

    commentsContainer.innerHTML = ""; 

    comments.forEach(comment => {
        const commentCont = createComment(comment);
        commentsContainer.appendChild(commentCont);
    });

    commentsContainer.scrollTop = 0;
}

// Renderizar nuevos comentarios en el contenedor superior
function renderWriteComment(comment) {
    const writeCommentsContainer = document.getElementById("write-comments-container");
    if (!writeCommentsContainer) return;

    const commentCont = createComment(comment);
    writeCommentsContainer.prepend(commentCont); 
}

// Crear un comentario visualmente
function createComment(comment) {
    const commentCont = document.createElement("div");
    commentCont.style.borderBottom = "1px solid black";
    commentCont.style.backgroundColor = "#f0f0f0";
    commentCont.style.borderRadius = "5px";

    const username = document.createElement("p");
    username.innerText = comment.username || "23201"; //Comentar con mi carnet
    username.style.fontSize = "12px";
    username.style.color = "#888";
    username.style.fontWeight = "bold";

    const text = document.createElement("p");
    text.innerText = comment.comentario;

    commentCont.appendChild(username);
    commentCont.appendChild(text);

    return commentCont;
}

// Input para escribir un comentario 
function commentInput(postId) {
    const inputCont = document.createElement("div");
    inputCont.style.display = "flex";
    inputCont.style.flexDirection = "column";
    inputCont.style.marginBottom = "10px";

    const commentInput = document.createElement("textarea");
    commentInput.id = "comment-text";
    commentInput.placeholder = "Write a comment...";
    commentInput.style.width = "100%";
    commentInput.style.height = "50px";
    commentInput.style.padding = "5px";
    commentInput.style.border = "1px solid #ddd";

    const sendButton = document.createElement("button");
    sendButton.innerText = "Add Comment";
    sendButton.style.marginTop = "5px";
    sendButton.style.padding = "8px";
    sendButton.style.backgroundColor = "#5ea868";
    sendButton.style.color = "white";
    sendButton.style.border = "none";
    sendButton.style.borderRadius = "5px";
    sendButton.style.cursor = "pointer";
    sendButton.addEventListener("click", () => addComment(postId));

    inputCont.appendChild(commentInput);
    inputCont.appendChild(sendButton);

    document.getElementById("write-comments-container").appendChild(inputCont);
}

// Función para agregar comentario
function addComment(postId) {
    const commentText = document.getElementById("comment-text").value.trim();
    if (commentText === "") return;

    const newComment = { postId, username: "23201", comentario: commentText };

    renderWriteComment(postId, newComment);
    document.getElementById("comment-text").value = "";
}
