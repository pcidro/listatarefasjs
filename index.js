const input = document.getElementById("input-tarefa");
const botao = document.getElementById("btn");
const lista = document.getElementById("lista-container");
const paragrafoinfo = document.getElementById("paragrafo-info");
const totalTexto = document.getElementById("total-tarefas");

botao.addEventListener("click", adcionarTarefa);

function atualizarTarefa() {
  const total = lista.children.length;

  if (total === 1) {
    totalTexto.innerText = `Total: ${total} tarefa`;
  } else {
    totalTexto.innerText = `Total: ${total} tarefas`;
  }

  if (total > 0) {
    totalTexto.style.display = "block";
    paragrafoinfo.style.display = "none";
  } else {
    totalTexto.style.display = "none";
    paragrafoinfo.style.display = "block";
  }
  salvarTarefas();
}

function adcionarTarefa(event) {
  event.preventDefault();
  const valor = input.value.trim();
  if (valor === "") return;

  criarTarefa(valor);
  input.value = "";
  atualizarTarefa();
}

function criarTarefa(textoTarefa) {
  const li = document.createElement("li");
  li.classList.add("item-tarefa");
  li.textContent = textoTarefa;

  const botaoDelete = document.createElement("button");
  botaoDelete.classList.add("botao-excluir");
  const icone = document.createElement("i");
  icone.classList.add("fa-solid", "fa-trash");
  botaoDelete.appendChild(icone);
  botaoDelete.addEventListener("click", () => {
    li.remove();
    atualizarTarefa();
  });

  li.appendChild(botaoDelete);
  lista.appendChild(li);
}

function salvarTarefas() {
  const itens = Array.from(lista.querySelectorAll("li")).map((li) =>
    li.firstChild.textContent.trim()
  );

  localStorage.setItem("tarefas", JSON.stringify(itens));
}

// ====== CARREGAR do localStorage ======
function carregarTarefas() {
  const dados = localStorage.getItem("tarefas");
  if (!dados) return;

  const itens = JSON.parse(dados);

  itens.forEach((texto) => {
    criarTarefa(texto);
  });

  atualizarTarefa();
}

// chama ao abrir a página
carregarTarefas();
