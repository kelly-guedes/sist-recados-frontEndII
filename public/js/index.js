"use strict";
const formEntrar = document.querySelector("#form");
const entrar = document.querySelector("#entrar");
const user = document.querySelector("#user");
const password = document.querySelector("#password");
const msgError = document.querySelector("#msgError");
const msgErrorSenha = document.querySelector("#msgErrorSenha");
function entrarLogin(e) {
    e.preventDefault();
    const listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");
    const userEncontrado = listaUser.find((item) => {
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
    }
    else {
        msgErrorSenha.setAttribute("style", "display: block");
        msgErrorSenha.removeAttribute("hidden");
        user.focus();
    }
}
formEntrar.addEventListener("submit", entrarLogin);
