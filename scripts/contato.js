/* =========================================
   CONTATO.JS - Lógica de Pedidos, Filtros e API
   Arquivo: scripts/contato.js
   ========================================= */

// CONFIGURAÇÃO: URL da sua API do Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwEmYb9_wfiy5_wEonFOF4oQItLqQKvNIuAUfx7wgJE8EOhCUSHHZa1vFcP6nkCy7on/exec";

// 1. INICIALIZAÇÃO E RENDERIZAÇÃO DA VITRINE
document.addEventListener('DOMContentLoaded', () => {

    // Verifica se o banco de dados de produtos foi carregado
    if (typeof produtosDB === 'undefined') {
        console.error("ERRO: O arquivo produtos.js não foi carregado corretamente.");
        const grid = document.getElementById('productsGrid');
        if (grid) grid.innerHTML = '<p style="text-align:center; padding:2rem;">Erro ao carregar o catálogo. Tente recarregar a página.</p>';
        return;
    }

    const grid = document.getElementById('productsGrid');

    if (grid) {
        // Renderiza todos os produtos inicialmente
        renderizarProdutos(produtosDB);
        // Ativa os botões de filtro
        setupFiltros();
    }
});

/**
 * Função responsável por desenhar os cartões na tela
 * @param {Array} listaProdutos - Array de objetos de produtos
 */
function renderizarProdutos(listaProdutos) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = ''; // Limpa a grade atual

    // Se não houver produtos na categoria selecionada
    if (listaProdutos.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; margin-top: 2rem;">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    listaProdutos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'mini-card';
        // Adiciona atributo de categoria para controle extra, se necessário
        card.setAttribute('data-category', produto.categoria);

        // Monta o HTML do cartão
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
            <div class="mini-info">
                <h4>${produto.nome}</h4>
                <div class="mini-price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
            </div>
        `;

        // Adiciona evento de clique para abrir o modal
        card.addEventListener('click', () => abrirModalProduto(produto));

        // Adiciona o cartão ao grid
        grid.appendChild(card);
    });
}

/**
 * Configura a lógica dos botões de filtro (Todos, Quadros, etc.)
 */
function setupFiltros() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adiciona a classe 'active' apenas no botão clicado
            btn.classList.add('active');

            const categoriaSelecionada = btn.getAttribute('data-filter');

            if (categoriaSelecionada === 'todos') {
                renderizarProdutos(produtosDB);
            } else {
                // Filtra o array original baseado na categoria
                const filtrados = produtosDB.filter(p => p.categoria === categoriaSelecionada);
                renderizarProdutos(filtrados);
            }
        });
    });
}

// 2. LÓGICA DO MODAL (POP-UP)
const modal = document.getElementById('orderModal');
const closeModal = document.querySelector('.close-modal');
let produtoAtual = null;
let quantidadeAtual = 1;

function abrirModalProduto(produto) {
    produtoAtual = produto;
    quantidadeAtual = 1;

    // Preenche os dados visuais do modal
    document.getElementById('modalImg').src = produto.imagem;
    document.getElementById('modalTitle').innerText = produto.nome;
    document.getElementById('modalDesc').innerText = produto.descricao;
    document.getElementById('modalPrice').innerText = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
    document.getElementById('qtyInput').value = 1;

    atualizarTotal();

    // Configura o badge de status (cor e texto)
    const badge = document.getElementById('modalStatus');
    if (produto.status === 'pronto') {
        badge.innerText = "Pronta Entrega";
        badge.className = "status-badge status-pronto";
    } else {
        badge.innerText = "Sob Encomenda";
        badge.className = "status-badge status-encomenda";
    }

    // Exibe o modal usando Flexbox
    if (modal) modal.style.display = 'flex';
}

// Fechar Modal (Clicando no X)
if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });
}

// Fechar Modal (Clicando na área escura fora do modal)
window.addEventListener('click', (e) => {
    if (modal && e.target === modal) {
        modal.style.display = 'none';
    }
});

// 3. CONTROLE DE QUANTIDADE (+ e -)
const btnMinus = document.getElementById('btnMinus');
const btnPlus = document.getElementById('btnPlus');
const qtyInput = document.getElementById('qtyInput');

if (btnMinus && btnPlus && qtyInput) {
    btnMinus.addEventListener('click', () => {
        if (quantidadeAtual > 1) {
            quantidadeAtual--;
            qtyInput.value = quantidadeAtual;
            atualizarTotal();
        }
    });

    btnPlus.addEventListener('click', () => {
        quantidadeAtual++;
        qtyInput.value = quantidadeAtual;
        atualizarTotal();
    });
}

function atualizarTotal() {
    if (produtoAtual) {
        const total = produtoAtual.preco * quantidadeAtual;
        const totalElement = document.getElementById('modalTotal');
        if (totalElement) {
            totalElement.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }
    }
}

// 4. FINALIZAR ENCOMENDA E ENVIAR DADOS
const btnFinalize = document.getElementById('btnFinalizeOrder');

if (btnFinalize) {
    btnFinalize.addEventListener('click', (e) => {
        e.preventDefault(); // Impede que o formulário recarregue a página

        if (!produtoAtual) return;

        // Captura os valores dos campos
        const nomeInput = document.getElementById('nome');
        const whatsInput = document.getElementById('whatsapp');
        const endInput = document.getElementById('endereco');
        const obsInput = document.getElementById('observacoes');

        const nome = nomeInput.value.trim();
        const whats = whatsInput.value.trim();
        const endereco = endInput.value.trim();
        const observacao = obsInput ? obsInput.value.trim() : "";

        // Validação simples (Observação é opcional)
        if (!nome || !whats || !endereco) {
            alert("Por favor, preencha os campos obrigatórios (Nome, WhatsApp e Endereço) para confirmar o pedido.");

            // Foca no primeiro campo vazio para ajudar o usuário
            if (!nome) nomeInput.focus();
            else if (!whats) whatsInput.focus();
            else endInput.focus();
            return;
        }

        // Tenta criar um link absoluto para a imagem (para o WhatsApp)
        let linkImagem = produtoAtual.imagem;
        try {
            linkImagem = new URL(produtoAtual.imagem, window.location.href).href;
        } catch (err) {
            console.log("Usando caminho relativo para imagem");
        }

        // Cria o objeto com os dados do cliente e do pedido
        const cliente = {
            nome: nome,
            whatsapp: whats,
            endereco: endereco,
            produto: produtoAtual.nome,
            quantidade: quantidadeAtual,
            total: (produtoAtual.preco * quantidadeAtual).toFixed(2),
            observacao: observacao,
            imagem: linkImagem,
            data: new Date().toLocaleString('pt-BR')
        };

        // Feedback visual no botão enquanto processa
        const textoOriginal = btnFinalize.innerHTML;
        btnFinalize.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btnFinalize.disabled = true;

        // A. Enviar para Google Sheets
        if (GOOGLE_SCRIPT_URL) {
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Importante para enviar dados para o Google Script sem erro de CORS
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente)
            })
                .then(() => console.log("Dados enviados para o Google Sheets"))
                .catch(err => console.error("Erro ao salvar no Google:", err));
        }

        // B. Gerar Link do WhatsApp
        let textoObs = "";
        if (observacao) {
            textoObs = `\n*Detalhes/Obs:* ${observacao}`;
        }

        // Monta a mensagem formatada para o WhatsApp
        const msg = `Olá! Me chamo *${cliente.nome}*.\n\nGostaria de encomendar:\nPeça: *${cliente.produto}*\nQtd: ${cliente.quantidade}\nValor Total: R$ ${cliente.total}\n\nMeu endereço: ${cliente.endereco}${textoObs}\n\n*Foto de referência:* ${linkImagem}`;

        // Cria o link da API do WhatsApp
        const whatsappLink = `https://api.whatsapp.com/send?phone=5521987170742&text=${encodeURIComponent(msg)}`;

        // Aguarda 1.5s para simular processamento e abre o WhatsApp
        setTimeout(() => {
            window.open(whatsappLink, '_blank');

            // Restaura o botão
            btnFinalize.innerHTML = textoOriginal;
            btnFinalize.disabled = false;

            // Fecha o modal e limpa o formulário
            if (modal) modal.style.display = 'none';
            document.getElementById('modalForm').reset();

            // Aviso final (opcional)
            // alert("Pedido gerado! Vamos finalizar o pagamento no WhatsApp.");
        }, 1500);
    });
}