var bootstrap: any;

const form = document.querySelector("#infos_recados") as HTMLFormElement;
const corpoRecados = document.querySelector("#tbody") as HTMLElement;

const userLogado = JSON.parse(localStorage.getItem("userLogado") || "{}");

if (!userLogado.emailCad) {
  alert("Você precisa estar logado para acessar esta página");
  document.location.href = "./index.html";
}

const recuperarMensagens = () =>
  JSON.parse(localStorage.getItem(userLogado.emailCad) || "[]");

let deveEditar = false;
let indiceEdicao = 0;

let myModal = new bootstrap.Modal(document.getElementById("myModal"));
let myInput = document.getElementById("myInput") as HTMLInputElement;

let tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
let tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

const salvarLembrete = (event: Event) => {
  event.preventDefault();

  const modalEditar = document.querySelector("#myModal") as HTMLElement;

  const lembrete = form.lembrete.value;
  const detalhamento = form.detalhamento.value;

  const recados = recuperarMensagens();

  if (deveEditar) {
    recados[indiceEdicao].lembrete = lembrete;
    recados[indiceEdicao].detalhamento = detalhamento;
    deveEditar = false;

    alert("Recado editado com sucesso!");
  } else {
    recados.push({
      id: definirID(),
      lembrete,
      detalhamento,
    });

    myModal.show();
  }

  localStorage.setItem(userLogado.emailCad, JSON.stringify(recados));

  form.lembrete.value = "";
  form.detalhamento.value = "";

  preencherTabela();
};

const preencherTabela = () => {
  const recados = recuperarMensagens();

  corpoRecados.innerHTML = "";

  for (const recado of recados) {
    corpoRecados.innerHTML += `
    
<tr>
     
     <td> ${recado.id}</td>
     <td> ${recado.lembrete}</td>
     <td> ${recado.detalhamento}</td>
     <td> 
     <i class="bi bi-trash3 me-4 ms-4"onclick="apagarRecado(${recado.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Apagar"></i>
     <i class="bi bi-pencil-square ms-2" onclick="editarRecado(${recado.id})"data-bs-toggle="tooltip" data-bs-placement="top" title="Editar"></i>
     
     </td>
</tr>
     `;
  }

  tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
};

const apagarRecado = (id: any) => {
  const recados = recuperarMensagens();

  const indice = recados.findIndex((rec: any) => {
    return rec.id === id;
  });

  recados.splice(indice, 1);
  localStorage.setItem(userLogado.emailCad, JSON.stringify(recados));
  preencherTabela();
};

const editarRecado = (id: any) => {
  const recados = recuperarMensagens();

  const indice = recados.findIndex((rec: any) => rec.id === id);

  const recado = recados[indice];

  form.lembrete.value = recado.lembrete;
  form.detalhamento.value = recado.detalhamento;

  deveEditar = true;
  indiceEdicao = indice;
};

const definirID = () => {
  let max = 0;
  const recados = recuperarMensagens();
  recados.forEach((recado: any) => {
    if (recado.id > max) max = recado.id;
  });
  return max + 1;
};

function sairSistema() {
  localStorage.removeItem("userLogado");
  document.location.href = "./index.html";
}

form.addEventListener("submit", salvarLembrete);
document.addEventListener("DOMContentLoaded", preencherTabela);
