const form = document.querySelector("form");
const cardNum = document.getElementById("cn");
const expNum = document.getElementById("exp");
const cvvNum = document.getElementById("cvv");
const submitBtn = document.getElementById('btnSubmit');
const nameUserForm = document.getElementById("name");

//Dato de prueba 4772103000098954
// // Deshabilitando el input
// submitBtn.setAttribute("disabled");

// Limitar las entradas
const validateCardNumCont = () => {
  if (cardNum.value.length === 16 && cardNum.value !== "") {
    cardNum.classList.add("success");
    return true;
  } else {
    cardNum.classList.add("error");
    return false;
  }
};

const validateCvvCont = () => {
  if (cvvNum.value.length === 3 && cvvNum.value !== "" && cvvNum.value !== "000") {
    cvvNum.classList.add("success");
    return true;
  } else {
    cvvNum.classList.add("error");
    return false;
  }
};

const validateExpCont = () => {
  if (expNum.value.length > 1) {
    expNum.classList.add("success");
    return true;
  } else {
    expNum.classList.add("error");
    return false;
  }
};

const validateName = () => {
  let frase = /\w+\s+\w+/;
  let x = nameUserForm.value;
  if (x !== " " && x.length !== 0 && frase.test(x)) {
    let arrayName = x.split(" ");
    const arrayNameLength = arrayName.length;
    let filteredName = arrayName.filter(validateCapitalLetter);
    if (filteredName.length === arrayNameLength) {
      nameUserForm.classList.remove("error");
      nameUserForm.classList.add("success");
      return true;
    }
  } else {
    nameUserForm.classList.add("error");
    return false
  }
};

const validateCapitalLetter = (value, index, arrayName) => {
  if (arrayName[index].charCodeAt(0) >= 65 && arrayName[index].charCodeAt(0) <= 90) {
    return true;
  } else {
    nameUserForm.classList.add("error");
    return false;
  }

};

const minDate = () => {
  // Se obtiene la fecha actual
  let today = new Date();
  let mm = today.getMonth() + 1; //hoy es 0!
  let yyyy = today.getFullYear();
  if (mm < 10) {
    mm = "0" + mm;
  }
  let date = (yyyy + "-" + mm);
  let datenm = parseInt(date.charAt(date.length - 1));
  let dateStr = datenm + 1;
  dateStr = dateStr.toString();
  dateStrCom = date.substr(0, 6);
  date = dateStrCom + dateStr;
  return date;
};

let dateMin = minDate();
expNum.setAttribute("min", dateMin);

//Obteniendo la fecha de vencimiento
const validateCardDetails = element => {

  // Convirtiendo los datos del form en un arreglo
  const formArray = Array.from(form);
  console.log(formArray); //0 número 1 fecha 2 cvv 3 nombre
  let dataArray = formArray.map(validateCont);
  // Función que manipula la data para mantenerla almacenada
  dataConvert(dataArray);
  // Se convierten los datos a NUMBER
  dataArray = dataArray.map(convertInt);
  // Se tiene un arreglo con los datos tipo NUMBER
  // console.log(dataArray);
  // Función que válida el contenido del número de tarjeta
  let result1 = validateCardNumCont();
  // Función que válida el contenido del número de CVV
  let result2 = validateCvvCont();
  // Función que válida el contenido de la fecha de vencimiento
  let result3 = validateExpCont();
  // Función que válida el contenido del nombre
  let result4 = validateName();
  // Función que válida el número de la tarjeta. Método de Luhn
  let result5 = checkCard(dataArray[0]);
  //Todas las funciones deben de dar true para que se envien los datos
  if (result1 === true && result2 === true && result3 === true && result4 === true && result5 === true) {
    console.log("devuelvo true");
    return true;
  } else {
    return false;
  }
};

const dataConvert = (dataArray) => {
  // Se elimina el último input corresponde a = PAGAR
  dataArray.pop();
  console.log(dataArray);
  // Guarda el nombre como string
  let nameUser = dataArray[dataArray.length - 1];
  // Se elimina del array
  dataArray.pop();
  // Obteniendo el año
  let yearString = dataArray[1].substr(0, 4);
  // Obteniendo el mes
  let monthString = dataArray[1].substr(5, 6);
  // Se elimina el dato obtenido dado que es string y se separa en 2 elementos
  dataArray.splice(1, 1);
  dataArray.splice(1, 0, yearString);
  dataArray.splice(2, 0, monthString);
  return dataArray;
};

const validateCont = element => {
  return element.value;
};

// Convierte a enteros
const convertInt = element => {
  return parseInt(element);
};

// Método de Luhn
const checkCard = cardN => {
  let sum = 0;
  let digits = cardN.length;
  let parity = digits % 2;
  for (let i = 0; i < digits; i++) {
    var digit = parseInt(cardN.charAt(i))
    if (i % 2 == parity) digit *= 2;
    if (digit > 9) digit -= 9;
    sum += digit;
  }
  console.log((sum % 10) == 0);
  return (sum % 10) == 0;
};

// Evento que detona las funciones de validación
form.addEventListener("submit", e => {
  e.preventDefault();
  // Si los datos son correctos se envían
  if (validateCardDetails(form)) {
    alert("datos válido... enviar...");
    console.log("datos válido... enviar...");
  } else {
    console.log("datos inválidos");
    alert("datos inválidos");
  }
});
