const productsData =  [
    {
        id: 1,
        name: "Latte",
        img: "./assets/carta-menu/lattte.jpg",
        precio: "$800",
        category: "bebidas",
    
    },
    {
        id: 2,
        name: "Frapuccino",
        img: "./assets/carta-menu/frapu.jpg",
        precio: "$900",
        category: "bebidas",
    },
    {
        id: 3,
        name: "Limonada",
        img: "./assets/carta-menu/limonada.jpg",
        precio: "$600",
        category: "bebidas",
    },
    {
        id: 4,
        name: "Smoothies",
        img: "./assets/carta-menu/smoothies-pineapple-with-lime.jpg",
        precio: "$1000",
        category: "bebidas",
    },
    {
        id: 5,
        name: "Chía Pudding",
        img: "./assets/carta-menu/chia-pudding-vegan-recipe.jpg",
        precio: "$900",
        category: "sweets",
    },
    {
        id: 6,
        name: "Tostados",
        img: "./assets/carta-menu/tostado.jpg",
        precio: "$1200",
        category: "salad",
    },
    {
        id: 7,
        name: "Cheesecake",
        img: "./assets/carta-menu/cheesecake.jpg",
        precio: "$1300",
        category: "sweets",
    },
    {
        id: 8,
        name: "Avocado Toast",
        img: "./assets/carta-menu/avocado_t.jpg",
        precio: "$1500",
        category: "salad",
    }
];

const divideProductsInParts = (size) => {
    let productsList = [];
    //recorro el array, desde cero pero le sumo lo que el usuario me pasa como size.
    for (let i = 0; i < productsData.length; i += size) {
        productsList.push(productsData.slice(i, i + size)); //se corta entre indice y indice + lo que el usuario pase como size (0 y 3 ); //guardo en un array nuevo, arrays con la cant que me pase el usuario
    }
    return productsList;
};

//escucha, guarda y maneja data para el renderizado // es el array de todos los objetos
const appState = {
    products: divideProductsInParts(4), // mi array de arrays en este caso son 3 array de 3
    currentProductsIndex: 0,//subindice estoy parado para poder renderizar el proximo
    limiteProducts: divideProductsInParts(4).length, 
    activeFilter: null, 
};




