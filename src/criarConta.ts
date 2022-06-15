const formCadastro = document.querySelector(
  "#formCadastro"
) as HTMLInputElement;

const emailUser = document.querySelector("#emailUser") as HTMLInputElement;
const labelEmailUser = document.querySelector("#labelEmailUser") as HTMLElement;
let validEmail = false;

const passwordUser = document.querySelector(
  "#passwordUser"
) as HTMLInputElement;
const labelPasswordUser = document.querySelector(
  "#labelPasswordUser"
) as HTMLElement;
let validPassword = false;

const confirmPassword = document.querySelector(
  "#confirmPassword"
) as HTMLInputElement;
const labelConfirmPassword = document.querySelector(
  "#labelConfirmPassword"
) as HTMLElement;
let validConfirmPassword = false;

const msgError1 = document.querySelector("#msgError1") as HTMLDivElement;
const msgSuccess = document.querySelector("#msgSuccess") as HTMLDivElement;

emailUser.addEventListener("keyup", () => {
  if (emailUser.value.length <= 5) {
    labelEmailUser.setAttribute("style", "color: red");
    labelEmailUser.innerHTML = "Email mínino 6 caracteres ";
    emailUser.setAttribute("style", "outline-color: red");
    validEmail = false;
  } else {
    emailUser.setAttribute("style", "outline-color: green");
    labelEmailUser.setAttribute("style", "color: green");
    labelEmailUser.innerHTML = "Email";
    validEmail = true;
  }
});

passwordUser.addEventListener("keyup", () => {
  if (passwordUser.value.length <= 5) {
    passwordUser.setAttribute("style", "outline-color: red");
    labelPasswordUser.setAttribute("style", "color: red");
    labelPasswordUser.innerHTML = "Mínimo 6 caracteres";
    validPassword = false;
  } else {
    passwordUser.setAttribute("style", "outline-color: green");
    labelPasswordUser.setAttribute("style", "color: green");
    labelPasswordUser.innerHTML = "Senha";
    validPassword = true;
  }
});

confirmPassword.addEventListener("keyup", () => {
  if (passwordUser.value != confirmPassword.value) {
    confirmPassword.setAttribute("style", "outline-color: red");
    labelConfirmPassword.setAttribute("style", "color: red");
    labelConfirmPassword.innerHTML = "As senhas não conferem";
    validConfirmPassword = false;
  } else {
    confirmPassword.setAttribute("style", "outline-color: green");
    labelConfirmPassword.setAttribute("style", "color: green");
    labelConfirmPassword.innerHTML = "Confirmar senha";

    validConfirmPassword = true;
  }
});

function cadastrado(e: Event) {
  e.preventDefault();
  const listaUser: Iuser[] = JSON.parse(
    localStorage.getItem("listaUser") || "[]"
  );

  const userExistente = listaUser.some(
    (user: Iuser) => emailUser.value === user.emailCad
  );

  if (userExistente) {
    labelEmailUser.setAttribute("style", "color: red");
    labelEmailUser.innerHTML = "Email já cadastrado";
    emailUser.setAttribute("style", "outline-color: red");
    validEmail = false;
    return;
  }

  if (validEmail && validPassword && validConfirmPassword) {
    listaUser.push({
      emailCad: emailUser.value,
      passwordCad: passwordUser.value,
    });

    localStorage.setItem("listaUser", JSON.stringify(listaUser));

    msgSuccess.removeAttribute("hidden");
    msgSuccess.setAttribute("style", "display: block");
    msgSuccess.innerHTML = "<strong>Cadastrando usuário...</strong>";
    msgError1.innerHTML = "";
    msgError1.setAttribute("style", "display: none");

    setTimeout(() => {
      document.location.href = "./index.html";
    }, 1300);
  } else {
    msgError1.removeAttribute("hidden");
    msgError1.innerHTML =
      "<strong>Preencha todos os campos corretamente</strong>";
    msgSuccess.innerHTML = "";
    msgSuccess.setAttribute("style", "display: none");
  }
}

formCadastro.addEventListener("submit", cadastrado);