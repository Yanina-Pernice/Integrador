const loginForm = document.querySelector("#login__form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#contraseña");
const msjError = document.querySelector("#form__error");

const users = JSON.parse(localStorage.getItem("users")) || [];

const saveToSessionStorage = (user) => {
	sessionStorage.setItem("activeUser", JSON.stringify(user));
};

const showError = (message) => {
	msjError.textContent = message;
};

//validaciones 
const isEmpty = (input) => {
	return !input.value.trim().length;
};

const isExistingEmail = (input) => {
	return users.some((user) => user.email === input.value.trim());
};

const isMatchingData = () => {
    const user = users.find((user) => user.email === email.emailInput.value.trim());
    return user.password === passwordInput.value.trim();
};

const checkValidAccount = () => {
    let valid = false;

    //VALIDACIONES
    //input vacío
    if (isEmpty(emailInput)){
        showError("Los campos son obligatorios.");
        return;
    }
    //input vacío
    if (isEmpty(passwordInput)){
        showError("Los campos son obligatorios.");
        return;
    }
    //el mail ya existe?
    if(!isExistingEmail(emailInput)){
        showError("El email ingreado no es válido.");
        return;
    }
    //mail y password coinciden?
    if (!isMatchingData()){
        showError("Los datos ingresados son incorrectos.");
        return;
    }

    valid = true;
    msjError.textContent = "";
    return valid;

};

const login = (e) => {
    e.preventDefault(); // Prevenimos el comport. x Default

    //chequear si la cuenta es valida
    if(checkValidAccount()){
        const user = users.find((user) => user.email === emailInput.value.trim());
        console.log(user);
        saveToSessionStorage(user);
        window.location.href = "index.html";//redirigir a la pag ppal
    } 
};


const init = () => {
    loginForm.addEventListener("submit", login);

};

init();


