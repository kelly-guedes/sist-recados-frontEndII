const formEntrar = document.querySelector("#form") as HTMLInputElement;
const entrar = document.querySelector("#entrar") as HTMLButtonElement;
const user = document.querySelector("#user") as HTMLInputElement;
const password = document.querySelector("#password") as HTMLInputElement;
const msgError = document.querySelector("#msgError") as HTMLDivElement;
const msgErrorSenha = document.querySelector(
  "#msgErrorSenha"
) as HTMLDivElement;

interface Iuser {
  emailCad: string;
  passwordCad: string;
}

function entrarLogin(e: Event) {
  e.preventDefault();
  const listaUser: Iuser[] = JSON.parse(
    localStorage.getItem("listaUser") || "[]"
  );
  const userEncontrado = listaUser.find((item: Iuser) => {
    return item.emailCad === user.value;
  });

  if (!userEncontrado) {
    msgError.setAttribute("style", "display: block");
    msgError.removeAttribute("hidden");
    user.focus();
    return;
  }

  if (password.value == userEncontrado.passwordCad) {
    document.location.href = "./recados.html";

    sessionStorage.setItem("userLogado", JSON.stringify(userEncontrado));
  } else {
    msgErrorSenha.setAttribute("style", "display: block");
    msgErrorSenha.removeAttribute("hidden");
    user.focus();
  }
}
formEntrar.addEventListener("submit", entrarLogin);
