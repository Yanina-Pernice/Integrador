const productosContainer = document.querySelector(".productos-container");
// FILTROS
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category"); // Devuelve un HTML Collection
const btnMostrarMas = document.querySelector(".btn-load");
//
const cartBtn = document.querySelector(".cart-label"); //clickeando el cart-label aparece el cart
const cartMenu = document.querySelector(".cart");
const menuBtn = document.querySelector(".menu-label"); // clickeando menu-label aparece el navbarlist
const barsMenu = document.querySelector(".navbar__list");
const overlay = document.querySelector(".overlay"); //fondo blureado

// CARRITO
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");

// MODAL MENSAJE
const modal = document.querySelector(".add-modal");

// BOTONES COMPRAR Y VACIAR CARRITO
const buyBtn = document.querySelector(".cart-btn");
const deleteBtn = document.querySelector(".btn-delete");


// ---------  GUARDAR Y BUSCAR EL CART EN EL LOCAL STORAGE  ---------  //
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const saveCartToLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(cart));
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
        <p>${precio}</p>
        <button class="btn__add"
        data-id="${id}"
        data-name="${name}"
        data-precio="${precio}"
        data-img="${img}">Añadir <i class="fa-solid fa-cart-shopping"></i></button>
        </div>
    </div>
    `
};

// ---------  RENDERIZO EL MENU  ---------  //
const renderProducts = (productsList) => {
    productosContainer.innerHTML += productsList.map(createProductTemplate).join("");
};

// ---------  BOTON MOSTRAR MÁS  ---------  //

const isLastIndexOf = () => { 
    return appState.currentProductsIndex === appState.limiteProducts - 1; // si retorna true es el último índice
};

const mostrarMasProductos = () => {
    appState.currentProductsIndex += 1;

    let { products, currentProductsIndex } = appState; // DESESTRUCTURO EL OBJETO APPSTATE

    renderProducts(products[currentProductsIndex]);

    if(isLastIndexOf()) {
        btnMostrarMas.classList.add("hidden");
    }

    //me traigo del array appState products y el current    
    // let products = appState.products;

    // let currentProductsIndex = appState.currentProductsIndex;

    // let auxiliar = []; // Creo un array nuevo para guardar los productos que quiero mostrar.

    // //recorro el array de 3 en 3
    // for(i = 0; i <= currentProductsIndex; i++){

    //     for(j = 0; j < products[i].length ; j++){ //recorro los productos dentro de cada array de 3

    //         auxiliar.push(products[i][j])
    //     }
    // }

    // renderProducts(auxiliar);

    // if (isLastIndexOf()) {
    //     btnMostrarMas.classList.add("hidden");
    // }
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
    //si no hay en el appState un filtro activo (porque está ACTIVO el btn TODOS) llama al btn mostrar más y removele la clase hidden para mostrarlo
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

// RENDERIZO PRODUCTOS FILTRADOS
const renderFilterProducts = () => {
    //el array de todos los productos
    const filterProducts = productsData.filter((product) => {
        return product.category === appState.activeFilter
    }); // deja pasar aquellos cuyo producto sea igual al que tengan el filtro activo
    renderProducts(filterProducts);
};


//desestructuro el target del evento y se lo paso a la función 
// Recibe target que es el btn que fue seleccionado por el usuario

//e.target const aux = e//////////////////////////
const applyFilter = ({target}) => {
    console.log(target)
    console.log(target.value)
    console.log(target.dataset.category)

    //Chequear que sea botón y no esté activo
    if (!isInactiveFilterBtn(target)) {
        return;
    }

    //Cambiar el filtro a ACTIVO
    changeActiveFilter(target);

    //Si hay filtro activo, renderizo productos filtrados
    productosContainer.innerHTML = "";
    if (appState.activeFilter) {
        renderFilterProducts();
        appState.currentProductsIndex = 0;
        return;
    }
    // Si NO hay filtro activo, renderizo 1er array
    renderProducts(appState.products[0]);    
};


//  ---------  TOGGLE DEL CARRITO  ---------  //

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    //si menu hamburguesa está abierto:
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

const createCartProductTemplate = (cartProduct) => {
    const { id, name, img, precio, quantity } = cartProduct;

    return `
    <div class= ${name}>
        <img class="cart-img" src=${img} alt="latte">                    

        <div class="item-info">
            <h4 class="item-title">Latte</h4>
            <p class="item-bid">Precio</p>
            <span class="item-price">${precio}</span>
        </div>

        <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div>
    `;
};

//RENDERIZO EL CARRITO
const renderCart = () => {
    if(!carrito.length) {
        productsCart.innerHTML = `<p class="empty-msj">El carrito está vacío.</p>`;
        return;
    }
    productsCart.innerHTML = carrito.map(createCartProductTemplate).join("");

};

//FUNCION AUXILIAR REDUCE
const getCartTotal = () => {
    return carrito.reduce((acumulador, valor) => {
        return acumulador + Number(valor.precio) * Number(valor.quantity) // sumale el resultado del actual.precio * cantidad = cant tot del producto
    }, 0)
};

//MUESTRO CARRITO
const showCartTotal = () => {
    total.innerHTML = `${getCartTotal().toFixed(2)} pesos`;
};


//FUNCION AUXILIAR PARA DESESTRUCTURAR
const createProductData = (product) => {
    console.log(product)
    const { id, precio, name, img } = product; // los saco

    return { id, precio, name, img } // retorno un solo objeto con las propiedas que necesito
};

// CHEQUEO SI PRODUCTO YA EXISTE EN EL CARRITO
const isProductInCart = (productId) => {
    return cart.find((item) => {
        return item.id === productId;
    }); // si me devuelve algo es TRU si no me devuelva nada es FALSE
};

//AGREGO UNIDAD DE PRODUCTO AL CARRITO
const addUnitProduct = (product) => {
    carrito = carrito.map((cartProduct) => {
        return cartProduct.id === product.id
            ? {...cartProduct, quantity: cartProduct.quantity + 1}
            : cartProduct;        
    })

};

// MODAL
const showModal = (msj) => {
    modal.classList.add("active-modal");
    modal.textContent = msj;

    setTimeout(() => {
        modal.classList.remove("active-modal");
    }, 1500)
};

// SI EL PRODUCTO NO EXISTE EN EL CARRITO HAY QUE CREARLO
const createCartProduct = () => {
    carrito = [
        ...carrito,
        {
            ...product,
            quantity: 1,
        }
    ];
};

//CHEQUEAR DISABLE DE BOTONES DE COMPRA Y VACIAR CARRITO
const disableButtons = (btn) => {
    if(!carrito.length) {
        btn.classList.add("disabled");
    } else{
        btn.classList.remove("disabled");
    }
};



//RENDERIZAR ESTADO DEL CARRITO
const updateCartStatus = () => {
    //GUARDAR CARRITO EN LOCAL STORAGE
    saveCartToLocalStorage();
    //RENDERIZAR CARRITO
    renderCart();
    //MOSTRAR EL TOTAL DEL CARRITO
    showCartTotal();
    //CHEQUEAR DISABLE DE BOTONES
    disableButtons(buyBtn);
    disableButtons(deleteBtn);
    


    //RENDER BURBUJA CARRITO

}


// AGREGO PRODUCTO AL CARRITO
const addProduct = (e) => {
    if (!e.target.classList.contains("btn__add")) {
        return;
    }

    console.log(e.target)
    console.log(e.dataset.id) 
   
    const product = createProductData(e.target.dataset);

    //CHEQUEAR SI EL PRODUCTO YA EXISTE
    if(isProductInCart(product.id)){
        //AGREGAMOS UNIDAD AL PRODUCTO
        addUnitProduct(product);
        //DAMOS FEEDBACK AL USUARIO
        showModal("Se agregó una unidad del producto al carrito.");      

    } 
    else {
        //SI EL PRODUCTO NO EXISTE
        //CREAMOS EL NUEVO PRODUCTO EN EL ARRAY 
        createCartProduct(product);
        //DAMOS FEEDBACK
        showModal("El producto se ha agregado al carrito.");
    }

    //UPDATE DEL CARRITO
    updateCartStatus();
    

};







// 
const init = () => {

    renderProducts(appState.products[appState.currentProductsIndex]);
    btnMostrarMas.addEventListener("click", mostrarMasProductos);
    btnMostrarMas.addEventListener("click", mostrarMasProductos);
    categoriesContainer.addEventListener("click", applyFilter);
    cartBtn.addEventListener("click", toggleCart);
    menuBtn.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeOnScroll);
    barsMenu.addEventListener("click", closeOnClick);
	overlay.addEventListener("click", closeOnOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
    productosContainer.addEventListener("click", addProduct);
    disableButtons(buyBtn);
    disableButtons(deleteBtn);

  


};

init();