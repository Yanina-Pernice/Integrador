const registerForm = document.getElementById("register-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

//Lo busco en LS
const users = JSON.parse(localStorage.getItem("users")) || [];

//Guardo en Local Storage
const saveToLocalStorage = () => {
	localStorage.setItem("users", JSON.stringify(users));
}

// -. FUNCIONES AUXILIARES .-

//Chequear si el input está vacío
const isEmpty = (input) => {
	return !input.value.trim().length;	 
};

//Si esta entre los caracteres min y max
const isBetween = (input, minCharacters, maxCharacters) => {
	return input.value.length >= minCharacters && input.value.length <= maxCharacters;
};

//Chequear si mail es valido
const isEmailValid = (input) => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	return re.test(input.value.trim());
};

//Chequear si ya existe el mail
const isExistingEmail = (input) => {
	return users.some((user) => user.email === input.value.trim());
};

//chequear si la contraseña es segura con RE
const isPassSecure = (input) => {
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
	return re.test(input.value.trim());
};


// -. MENSAJES .-
//Mostrar msj de error
const showError = (input, message) => {
	const formField = input.parentElement;
	formField.classList.remove("success");
	formField.classList.add("error");
	const error = formField.querySelector("small"); // capturo la etiqueta small
	error.style.display = "block"; //pisa el display none del small
	error.textContent = message;

};

//Mostrar msj de éxito
const showSuccess = (input, message) => {
	const formField = input.parentElement;
	formField.classList.remove("error");
	formField.classList.add("success");
	const error = formField.querySelector("small"); 
	error.style.display = "none";
	error.textContent= "";
};

// -. FUNCIONES PARA VALIDACION DE INPUTS .-

const checkTextInput = (input) => {
	let valid = false;
	const minCharacters = 3;
	const maxCharacters = 15;

	//si el input esta vacio, mostramos error
	if (isEmpty(input)){
		//muestro error
		showError(input, "Este campo es obligatorio");
		return
	};

	//si tiene mal cant de caracteres
	if (!isBetween(input, minCharacters, maxCharacters)){
		//muestro error
		showError(input, `Este campo requiere ${minCharacters} y ${maxCharacters} caracteres.`)
		return
	}

	//Borramos error
	showSuccess(input);
	valid = true;
	return valid;
};

const checkEmail = (input) => {
	let valid = false;

	//chequear si esta vacio
	if(isEmpty(input)){
		showError(input, "El email es obligatorio");
		return;
	}

	//chequear si NO es un mail VALIDO
	if (!isEmailValid(input)){
		showError(input, "El mail no es válido");
		return;
	}
	//verificar si ya existe ese mail 
	if (isExistingEmail(input)) {
		showError(input,"El mail ya se encuentra registrado");
		return;
	}
	showSuccess(input);
	valid = true;
	return valid;
};

const checkPassword = (input) => {
	let valid = false;

	// que no este vacio
	if(isEmpty(input)){
		showError(input, "La contraseña es obligatoria");
		return;
	};

	//chequear la seguridad
	if (!isPassSecure(input)){
		showError(input, "La contraseña debe tener al menos 8 caracteres, un número, una mayúscula, una minúscula y un símbolo.");
		return;
	}
	showSuccess(input);
	valid = true;
	return valid;

};




//-. VALIDACION GENERAL Y ALMACENAMIENTO DE DATOS .-
const submitHandler = (e) => {
	//Prevenir comportamiento por Default para que no se recargue la pagina.
	e.preventDefault();
	//Chequear que los inputs sean validos
	let isNameValid = checkTextInput(nameInput);
	let isEmailValid = checkEmail(emailInput);
	let isPasswordValid = checkPassword(passInput);

	let isValidForm = isNameValid && isEmailValid && isPasswordValid;

	//Si el input es valido, guardo la data en el array 
	if(isValidForm){
		users.push({
			name: nameInput.value,
			email: emailInput.value,
			password: passInput.value,

		});	

		//Guardar en local storage
		saveToLocalStorage();
		//Dar feedback al usuario
		alert("Te registraste con éxito!");
		//Redirigir al login
		window.location.href = "login.html";
	}	
};


const init = () => {
registerForm.addEventListener("submit", submitHandler);
nameInput.addEventListener("input", () => checkTextInput(nameInput));
emailInput.addEventListener("input", () => checkEmail(emailInput));
passInput.addEventListener("input", () => checkPassword(passInput));


};

init();