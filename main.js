const productosContainer = document.querySelector(".productos-container");
// FILTROS
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category"); // Devuelve un HTML Collection
const btnMostrarMas = document.querySelector(".btn-load");
// BOTONES DEL CARRITO Y DEL MENU Y OVERLAY
const cartBtn = document.querySelector(".cart-label"); //clickeando el cart-label aparece el cart
const cartMenu = document.querySelector(".cart");
const menuBtn = document.querySelector(".menu-label"); // clickeando menu-label aparece el navbarlist
const barsMenu = document.querySelector(".navbar__list");
const overlay = document.querySelector(".overlay"); //fondo blureado
// CARRITO - TOTAL CARRITO
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
// MODAL MENSAJE
const modal = document.querySelector(".add-modal");
// BOTONES COMPRAR Y VACIAR CARRITO
const buyBtn = document.querySelector(".cart-btn");
const deleteBtn = document.querySelector(".btn-delete");
// BURBUJA CARRITO
const cartBubble = document.querySelector(".cart-bubble");

// ---------  GUARDAR Y BUSCAR EL CART EN EL LOCAL STORAGE  ---------  //
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const saveCartToLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};


// ---------  CREO LA TEMPLATE PARA CADA CARD DEL MENU  --------- //
const createProductTemplate = (product) => {
    const { id, name, img, precio } = product;

    return `
    <div class="producto">  
        <h3 class="item-name">${name}</h3>
     
        <div class="card-image">
            <img src=${img} alt=${name}>
        </div>
        <div class="card-price-and-button">
        <p>$${precio}</p>
        
        <button class="btn-add"
        data-id="${id}"
        data-name="${name}"
        data-precio="${precio}"
        data-img="${img}">Añadir <i class="fa-solid fa-cart-shopping"></i></button>
        </div>
    </div>
    `
};

// ---------  RENDERIZO EL MENU  ---------  //
const renderProducts = (listaProductos) => {
    productosContainer.innerHTML += listaProductos.map(createProductTemplate).join("");
};

// ---------  MENU-BOTON MOSTRAR MÁS  ---------  //

const esUltimoIndice = () => { 
    return appState.indiceActualDeProductos === appState.limiteProducts - 1; // si retorna true es el último índice
};

const mostrarMasProductos = () => {
    appState.indiceActualDeProductos += 1;

    let { products, indiceActualDeProductos } = appState; // DESESTRUCTURO EL OBJETO APPSTATE

    renderProducts(products[indiceActualDeProductos]);

    if(esUltimoIndice()) {
        btnMostrarMas.classList.add("hidden");
    }
};

// ---------  FILTROS  --------- //
//Chequear que sea botón y no esté activo
const isInactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") && !element.classList.contains("active")
    );

};

const setButtonAsActive = (selectedCategory) => {

    const categories = [...categoriesList];

    categories.forEach((categoryBtn) => {
        // si del boton que estas iterando ese category no es igual a la categoria seleccionada entonces remove la clase active.
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        }
        //si coincide el btn con la category agrega la clase active
        categoryBtn.classList.add("active");        
    });
};

const setBtnMostrarMasVisibility = () => {
    //si no hay filtro activo en el appState (porque está ACTIVO el btn TODOS) llama al btn mostrar más y le remueve la clase hidden para mostrarlo
    if (!appState.activeFilter) {
        btnMostrarMas.classList.remove("hidden");
        return;
    }
    //si hay filtro activo agregale la clase hidden
    btnMostrarMas.classList.add("hidden");
};

const changeActiveFilter = (btn) => {
    appState.activeFilter = btn.dataset.category; // guardo la category en el appState
    setButtonAsActive(appState.activeFilter); // seteo el boton de la categoria seleccionada como activo
    setBtnMostrarMasVisibility();
};

// ---------  RENDERIZO PRODUCTOS FILTRADOS  ---------  //
const renderFilterProducts = () => {
    //filtro el array de todos los productos
    const filterProducts = productsData.filter((product) => {
        return product.category === appState.activeFilter
    }); // deja pasar aquellos cuyo producto sea igual al que tengan el filtro activo
    renderProducts(filterProducts);
};

// Recibe target (del evento desetructurado) que es el btn que fue seleccionado por el usuario
const applyFilter = ({target}) => {
    //Chequear que sea botón y no esté activo
    if (!isInactiveFilterBtn(target)) {
        return;
    };

    //Cambiar el filtro a ACTIVO
    changeActiveFilter(target);

    //Si hay filtro activo, renderizo productos filtrados
    productosContainer.innerHTML = "";
    if (appState.activeFilter) {
        renderFilterProducts();
        appState.indiceActualDeProductos = 0;
        return;
    }
    // Si NO hay filtro activo, renderizo 1er array
    renderProducts(appState.products[0]);    
};

//  ---------  TOGGLE DEL CARRITO  ---------  //
const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    //si el menu hamburguesa está abierto:
    if (barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu");
        return;
    }

    overlay.classList.toggle("show-overlay");
};

//  ---------   TOGGLE DEL MENU  ---------  //
const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    //si el carrito está abierto:
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    }

    overlay.classList.toggle("show-overlay");
};

const closeOnScroll = () => {
    //si el barsmenu ni el cartMenu están abiertos no te ejecutes
    if (!barsMenu.classList.contains("open-menu") && !cartMenu.classList.contains("open-cart")) {
        return;
    }
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

const closeOnClick = (e) => {
    //chequear donde hace el click
    if (!e.target.classList.contains("navbar-link")){
        return;
    };
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
};

const closeOnOverlayClick = () => {
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart")
    overlay.classList.remove("show-overlay")
};

//  --------- LOGICA DEL CARRITO  ---------  //

//  --------- SE CREA EL TEMPLATE DEL CARRITO  ---------  //
const createCartProductTemplate = (cartProduct) => {
    const { id, name, img, precio, quantity } = cartProduct;

    return `
    <div class= "cart-item">
        <img class="cart-img" src=${img} alt="latte">                    

        <div class="item-info">
            <h4 class="item-title">${name}</h4>
            <p class="item-bid">Precio</p>
            <span class="item-price">$ ${precio}</span>
        </div>

        <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div>
    `;
};

//  ---------  RENDERIZO EL CARRITO  ---------  //
const renderCart = () => {
    if(!carrito.length) {
        productsCart.innerHTML = `<p class="empty-msj">El carrito está vacío.</p>`;
        return;
    }
    productsCart.innerHTML = carrito.map(createCartProductTemplate).join("");
};

// FUNCION AUXILIAR REDUCE
const getCartTotal = () => {
    return carrito.reduce((acumulador, valor) => {
        return acumulador + Number(valor.precio) * Number(valor.quantity) // sumale el resultado del actual.precio * cantidad = cant tot del producto
    }, 0);
};

// MUESTRO CARRITO
const mostrarTotalCarrito = () => {
    total.innerHTML = `${getCartTotal()} pesos`;
};

// FUNCION AUXILIAR PARA DESESTRUCTURAR
const createProductData = (idProduct) => {

    const products = productsData.filter(product => product.id == idProduct);

    const { id, precio, name, img } = products[0]; // los saco

    return { id, precio, name, img } // retorno un solo objeto con las propiedas que necesito
};

// ---------  CHEQUEO SI PRODUCTO YA EXISTE EN EL CARRITO  ---------  //
const estaElProductoEnElCarrito = (productId) => {
    return carrito.find((item) => {
        return item.id === productId;
    }); // si me devuelve algo es TRUE si no me devuelva nada es FALSE
};

// ---------  AGREGO UNIDAD DE PRODUCTO AL CARRITO  ---------  //
const agregarUnidadProducto = (product) => {

    carrito = carrito.map((cartProduct) => {
        return cartProduct.id === product.id
            ? {...cartProduct, quantity: cartProduct.quantity + 1}
            : cartProduct;        
    });
};

// ---------  MODAL  ---------  //
const showModal = (msj) => {
    modal.classList.add("active-modal");
    modal.textContent = msj;

    setTimeout(() => {
        modal.classList.remove("active-modal");
    }, 1500)
};

// ---------  SI EL PRODUCTO NO EXISTE EN EL CARRITO HAY QUE CREARLO  ---------  //
const createCartProduct = (product) => {

    carrito = [
        ...carrito,
        {
            ...product,
            quantity: 1,
        }
    ];
};

// ---------  CHEQUEAR DISABLE DE BOTONES DE COMPRA Y VACIAR CARRITO  ---------  //
const disableButtons = (btn) => {
    if(!carrito.length) {
        btn.classList.add("disabled");
    } else{
        btn.classList.remove("disabled");
    }
};

//  ---------  RENDERIZAR BUBBLE  ---------  //
const renderCartBubble = () => {
    cartBubble.textContent = carrito.reduce((acumulador, valor) => {
        return acumulador + valor.quantity;
    }, 0);
};

//  ---------  RENDERIZAR ESTADO DEL CARRITO  ---------  //
const updateCartStatus = () => {
    //GUARDAR CARRITO EN LOCAL STORAGE
    saveCartToLocalStorage();
    //RENDERIZAR CARRITO
    renderCart();
    //MOSTRAR EL TOTAL DEL CARRITO
    mostrarTotalCarrito();
    //CHEQUEAR DISABLE DE BOTONES
    disableButtons(buyBtn);
    disableButtons(deleteBtn);
    
    //RENDER BURBUJA CARRITO
    renderCartBubble();
};

// ---------  AGREGO PRODUCTO AL CARRITO  ---------  //
const agregarProducto = (e) => {
    e.preventDefault()
    
    if (!e.target.classList.contains("btn-add")) {
        return;
    }
        const product = createProductData(e.target.dataset.id);

        //CHEQUEAR SI EL PRODUCTO YA EXISTE
    if (estaElProductoEnElCarrito(product.id)){
        console.log("El producto ya existe")
        //AGREGAMOS UNIDAD AL PRODUCTO
        agregarUnidadProducto(product);
        //DAMOS FEEDBACK AL USUARIO
        showModal("Se agregó una unidad del producto al carrito.");     
    } 
    else {
        //SI EL PRODUCTO NO EXISTE CREAMOS EL NUEVO PRODUCTO EN EL ARRAY 
        createCartProduct(product);
        //DAMOS FEEDBACK
        showModal("El producto se ha agregado al carrito.");
    }    
    // UPDATE DEL CARRITO
    updateCartStatus();
};

// ---------  REMOVER PRODUCTO DEL CARRITO ---------  //
const removerProductoDelCarrito = (productoExistente) => {
    carrito = carrito.filter( (producto) => {
        return producto.id !== productoExistente.id
    });
    updateCartStatus();
};

// ---------  REMOVER UNIDAD DE UN PRODUCTO DEL CARRITO ---------  //
const sacarUnidadAlProducto = (productoExistente) => {
    carrito = carrito.map((producto) => {
        return producto.id === productoExistente.id
                ? {...producto, quantity: Number(producto.quantity) - 1 }
                : producto;
    });
};

// ---------  BOTON MENOS  --------- //
const handlerBotonMenos = (id) => { 
    const existeProductoEnCarrito = carrito.find((item) => item.id == id);
    
    if (existeProductoEnCarrito.quantity === 1) {
        //pedir confirmacion
        if(window.confirm("¿Desea eliminar el producto del carrito?")) {
             //eliminar producto
            removerProductoDelCarrito(existeProductoEnCarrito);
        }
        return
    }
    // sacarle unidad al producto
    sacarUnidadAlProducto(existeProductoEnCarrito);
};

// ---------  BOTON MAS  ---------  //
const handlerBotonMas = (id) => {
    const existeProductoEnCarrito = carrito.find((item) => item.id == id);
    agregarUnidadProducto(existeProductoEnCarrito);
};

// ---------  HANDLER BOTONES MAS Y MENOS  ---------  //
const handlerCantidad = (e) => {
    if (e.target.classList.contains("down")) {
        //manejamos evento de boton menos
        handlerBotonMenos(e.target.dataset.id);
    }    
    else if(e.target.classList.contains("up")) {
        //manejamos el evento del boton más
        handlerBotonMas(e.target.dataset.id)
    }
    //actualizamos el estado del carrito
    updateCartStatus();
};

//  ---------   VACIAR CARRITO  --------- //
const resetItemsDelCarrito = () => {
    carrito = []; //VACIO EL CARRITO
    updateCartStatus(); 
};

//  --------- FINALIZAR COMPRA  ---------  //
const completarAccionComprar = (confirmMsg, successMsg) => {
    if(!carrito.length) return;

    if(window.confirm(confirmMsg)) {
        resetItemsDelCarrito();
        alert(successMsg);
    }
};

const completarCompra = () => {
    completarAccionComprar("¿Desea completar su compra?", "Gracias por comprar en Coffe&Cats!");
};

const borrarCarrito = () => {
    completarAccionComprar("¿Está seguro que desea vaciar su carrito?", "No hay productos en el carrito");
};

const init = () => {

    renderProducts(appState.products[appState.indiceActualDeProductos]);
    btnMostrarMas.addEventListener("click", mostrarMasProductos);
    categoriesContainer.addEventListener("click", applyFilter);
    cartBtn.addEventListener("click", toggleCart);
    menuBtn.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeOnScroll);
    barsMenu.addEventListener("click", closeOnClick);
	overlay.addEventListener("click", closeOnOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", mostrarTotalCarrito);
    productosContainer.addEventListener("click", agregarProducto);
    productsCart.addEventListener("click", handlerCantidad);
    buyBtn.addEventListener("click", completarCompra);
    deleteBtn.addEventListener("click", borrarCarrito)
    disableButtons(buyBtn);
    disableButtons(deleteBtn);
};

init();