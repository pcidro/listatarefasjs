const input = document.getElementById("input-tarefa");
const botao = document.getElementById("btn");
const lista = document.getElementById("lista-container");
const paragrafoinfo = document.getElementById("paragrafo-info");
const totalTexto = document.getElementById("total-tarefas");

// Atualizar o total de tarefas
function atualizarTotal() {
  const total = lista.children.length;
  totalTexto.innerText = `Total: ${total} ${
    total === 1 ? "tarefa" : "tarefas"
  }`;
  totalTexto.style.display = total > 0 ? "block" : "none";
  paragrafoinfo.style.display = total > 0 ? "none" : "block";
}

// Função adcionar tarefa / remover
function callBackBotao() {
  const valor = input.value.trim();
  if (valor === "") return;

  const li = document.createElement("li");
  li.classList.add("item-tarefa");

  const texto = document.createTextNode(valor);
  li.appendChild(texto);

  const botaoExcluir = document.createElement("button");
  botaoExcluir.innerHTML = "🗑️";
  botaoExcluir.classList.add("botao-excluir");

  botaoExcluir.addEventListener("click", () => {
    li.remove();
    atualizarTotal();
  });

  li.appendChild(botaoExcluir);
  lista.appendChild(li);

  input.value = "";
  atualizarTotal();
}

botao.addEventListener("click", callBackBotao);
