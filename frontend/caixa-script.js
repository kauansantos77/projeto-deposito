// Lista que armazena os produtos
let itens = [];

// Elementos HTML
const produtoInput = document.getElementById("produto");
const quantidadeInput = document.getElementById("quantidade");
const precoInput = document.getElementById("preco");
const btnVoltar = document.getElementById("btnVoltar");


const btnAdicionar = document.getElementById("btnAdicionar");
const btnFechar = document.getElementById("btnFechar");
const btnLimpar = document.getElementById("btnLimpar");

const listaItens = document.getElementById("listaItens");
const totalElement = document.getElementById("total");
const contadorElement = document.getElementById("contador");

const modal = document.getElementById("modal");
const totalFinal = document.getElementById("totalFinal");

const btnFecharModal = document.getElementById("btnFecharModal");
const btnNovaConta = document.getElementById("btnNovaConta");

//VOLTAR BOTÃO

btnVoltar.addEventListener("click", function() {
    window.history.back();
});


// ADICIONAR ITEM

btnAdicionar.addEventListener("click", adicionarItem);


// Também permite apertar ENTER
produtoInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        adicionarItem();
    }

});


// Função para adicionar produto
function adicionarItem() {

    const nome = produtoInput.value.trim();
    const quantidade = Number(quantidadeInput.value);
    const preco = Number(precoInput.value);

    // Validação
    if (nome === "") {
        alert("Digite o nome do produto.");
        produtoInput.focus();
        return;
    }

    if (quantidade <= 0 || isNaN(quantidade)) {
        alert("Digite uma quantidade válida.");
        quantidadeInput.focus();
        return;
    }

    if (preco <= 0 || isNaN(preco)) {
        alert("Digite um preço válido.");
        precoInput.focus();
        return;
    }


    // Cria o produto
    const item = {
        id: Date.now(),
        nome: nome,
        quantidade: quantidade,
        preco: preco
    };


    // Adiciona na lista
    itens.push(item);


    // Atualiza a tela
    atualizarLista();


    // Limpa os campos
    produtoInput.value = "";
    quantidadeInput.value = "1";
    precoInput.value = "";

    produtoInput.focus();
}


// ATUALIZAR LISTA

function atualizarLista() {

    listaItens.innerHTML = "";


    // Se não tiver produtos
    if (itens.length === 0) {

        listaItens.innerHTML = `
            <p class="vazio">
                Nenhum item adicionado.
            </p>
        `;

    }


    // Mostra cada produto
    itens.forEach(function(item) {

        const subtotal = item.quantidade * item.preco;

        const div = document.createElement("div");

        div.classList.add("item");


        div.innerHTML = `

            <div>
                <div class="item-nome">
                    ${item.nome}
                </div>

                <div class="item-info">
                    ${item.quantidade} x ${formatarMoeda(item.preco)}
                </div>
            </div>

            <div class="item-total">
                ${formatarMoeda(subtotal)}
            </div>

            <button
                class="btn-remover"
                onclick="removerItem(${item.id})"
            >
                Remover
            </button>

        `;


        listaItens.appendChild(div);

    });


    atualizarTotal();
}


// REMOVER ITEM

function removerItem(id) {

    itens = itens.filter(function(item) {

        return item.id !== id;

    });


    atualizarLista();
}


// CALCULAR TOTAL

function calcularTotal() {

    let total = 0;


    itens.forEach(function(item) {

        total += item.quantidade * item.preco;

    });


    return total;
}


// ATUALIZAR TOTAL

function atualizarTotal() {

    const total = calcularTotal();

    totalElement.textContent = formatarMoeda(total);


    const quantidadeItens = itens.reduce(
        function(total, item) {
            return total + item.quantidade;
        },
        0
    );


    if (quantidadeItens === 1) {
        contadorElement.textContent = "1 item";
    } else {
        contadorElement.textContent = `${quantidadeItens} itens`;
    }
}


// FORMATAR DINHEIRO

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// FECHAR CAIXA

btnFechar.addEventListener("click", function() {

    if (itens.length === 0) {

        alert("Adicione pelo menos um produto antes de fechar o caixa.");

        return;
    }


    const total = calcularTotal();

    totalFinal.textContent = formatarMoeda(total);

    modal.classList.add("ativo");

});


// FECHAR MODAL

btnFecharModal.addEventListener("click", function() {

    modal.classList.remove("ativo");

});


// NOVA CONTA

btnNovaConta.addEventListener("click", function() {

    itens = [];

    atualizarLista();

    modal.classList.remove("ativo");

    produtoInput.focus();

});


// LIMPAR CONTA

btnLimpar.addEventListener("click", function() {

    if (itens.length === 0) {
        return;
    }


    const confirmar = confirm(
        "Tem certeza que deseja limpar toda a conta?"
    );


    if (confirmar) {

        itens = [];

        atualizarLista();

        produtoInput.focus();

    }

});
