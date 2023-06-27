const loginForm = document.querySelector("#login__form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#contraseña");
const msjError = document.querySelector("#form__error");

// buscar la data en el local storgae
const users = JSON.parse(localStorage.getItem("users")) || [];

// guardar en el session storage
const guardarEnSessionStorage = (user) => {
  sessionStorage.setItem("activeUser", JSON.stringify(user));
};

const mostrarError = (message) => {
  msjError.textContent = message;
};

const isEmpty = (input) => {
  return !input.value.trim().length;
};

const existeEmail = (input) => {
  return users.some((user) => {
    return user.email ===  input.value.trim();
  }); 
  
};

//si coinciden mail y pass
const coincidenEmailYpass = () => {
  const user = users.find( (user) => {
    return user.email === emailInput.value.trim();
  });
  return user.password === passwordInput.value.trim();

};

const laCuentaEsValida = () => {
  let valid = false;
  //si email esta vacio, tiro error  
  if (isEmpty(emailInput)) {
    mostrarError("Por favor complete los campos");
    return;
  }
  // si pass esta vacio
  if (isEmpty(passwordInput)) {
    mostrarError("Por favor complete los campos");
    return;
  }

  //si mail existe en ""base de datos""
  if (!existeEmail(emailInput)) {
    mostrarError ("El email ingresado no es válido");
    return;    
  } 
  //si coinciden mail y pass
  if (!coincidenEmailYpass()) {
    mostrarError("Los datos ingresados son incorrectos");
    return;
  };

  valid = true;
  mostrarError.textContent = "";
  return valid;
};


const login = (e) => {
  e.preventDefault(); // Prevenir el envío del formulario por defecto

  //si la cuenta es valida
  if (laCuentaEsValida()) {
    //traigo el usuario correspondiente
    const user = users.find((user) => user.email === emailInput.value.trim());
    //guardamos el usuario en el SS
    guardarEnSessionStorage(user);

    //redirigimos al home
    window.location.href = "./index.html";
  };
    

};

const init = () => {
  loginForm.addEventListener("submit", login);

};

init();