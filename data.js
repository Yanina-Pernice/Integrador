const productsData =  [
    {
        id: 1,
        name: "Latte",
        img: "./assets/carta-menu/lattte.jpg",
        precio: "800",
        category: "bebidas",
    
    },
    {
        id: 2,
        name: "Frapuccino",
        img: "./assets/carta-menu/frapu.jpg",
        precio: "900",
        category: "bebidas",
    },
    {
        id: 3,
        name: "Limonada",
        img: "./assets/carta-menu/limonada.jpg",
        precio: "600",
        category: "bebidas",
    },
    {
        id: 4,
        name: "Smoothies",
        img: "./assets/carta-menu/smoothies-pineapple-with-lime.jpg",
        precio: "1000",
        category: "bebidas",
    },
    {
        id: 5,
        name: "Chía Pudding",
        img: "./assets/carta-menu/chia-pudding-vegan-recipe.jpg",
        precio: "900",
        category: "sweets",
    },
    {
        id: 6,
        name: "Tostados",
        img: "./assets/carta-menu/tostado.jpg",
        precio: "1200",
        category: "salad",
    },
    {
        id: 7,
        name: "Cheesecake",
        img: "./assets/carta-menu/cheesecake.jpg",
        precio: "1300",
        category: "sweets",
    },
    {
        id: 8,
        name: "Avocado Toast",
        img: "./assets/carta-menu/avocado_t.jpg",
        precio: "1500",
        category: "salad",
    }
];

// CREO UN ARRAY VACIO PARA LUEGO RENDERIZARLO POR PARTES 
const divideProductsInParts = (size) => {
    let productsList = [];
    // recorro el array mediante el for desde el indice 0 hasta la longitud total del array, incrementando de acuerdo al parametro size en cada iteración.
    for (let i = 0; i < productsData.length; i += size) {
        productsList.push(productsData.slice(i, i + size)); // En cada iteración del bucle, utilizo el método slice para extraer una porción del array productsData desde el índice i hasta el índice i + size. Esta porción se agrega al array productsList.
    }
    return productsList;
};

// se define el OBJETO APPSTATE, representa el estado de la aplicación.
const appState = {
    products: divideProductsInParts(4), // Divide el array de productos
    indiceActualDeProductos: 0, // Se inicializa con el valor 0 y representa el subíndice del array products que se está utilizando actualmente para el renderizado.
    limiteProducts: divideProductsInParts(4).length, 
    activeFilter: null,  // Se utiliza para almacenar un filtro activo para los productos. 
};




