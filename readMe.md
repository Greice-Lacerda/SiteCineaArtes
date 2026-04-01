# 🌿 Cinea Artes - Website & Catálogo Virtual

Este projeto é um website institucional e catálogo de encomendas desenvolvido para o ateliê Cinea Artes. O site apresenta a história da artista, um portfólio visual e um sistema de encomendas integrado ao WhatsApp e Google Sheets (sem necessidade de backend complexo).

## 🎨 Funcionalidades

Design Artístico: Layout responsivo, focado em estética visual com animações suaves e tipografia elegante.

Vitrine de Produtos: Catálogo dinâmico com sistema de filtros (Quadros, Arranjos, Panos de Prato, etc.).

Modal de Detalhes: Visualização ampliada dos produtos com descrição e foto.

Carrinho Simples: Seleção de quantidade e cálculo automático do valor total.

Integração WhatsApp: Gera automaticamente uma mensagem formatada com o pedido e envia para o WhatsApp da artista.

Banco de Dados (Google Sheets): Salva todos os pedidos (Data, Cliente, Produto, Obs, Link da Imagem) em uma planilha do Google via Google Apps Script.

Campo de Observações: Permite ao cliente solicitar personalizações (cor, tamanho, moldura).

## 📂 Estrutura de Arquivos

O projeto segue uma arquitetura organizada para facilitar a manutenção:

/
├── index.html           # Página Inicial
├── pages/               # Arquivos HTML
|    ├── historia.html        # Página "A Artista"
|    ├── portfolio.html       # Página de Galeria/Portfólio
|    └── contato.html         # Página de Encomendas (Vitrine + Formulário)
│
├── styles/              # Arquivos CSS
│   ├── comuns.css       # Estilos globais (Menu, Rodapé, Variáveis, Fontes)
│   ├── style.css        # Estilos específicos da Home
│   ├── historia.css     # Estilos da página de História
│   ├── portfolio.css    # Estilos da página de Portfólio
│   └── contato.css      # Estilos da página de Encomendas/Catálogo
│
├── scripts/             # Arquivos JavaScript
│   ├── script.js        # Interações globais (Menu Mobile, Scroll)
│   ├── produtos.js      # "Banco de Dados" local (Lista de produtos JSON)
│   └── contato.js       # Lógica do carrinho, modal e envio para API/Zap
│
└── images/              # Pasta de imagens
    


## 🚀 Como Configurar e Rodar

### 1. Clonar ou Baixar

Baixe os arquivos para o seu computador. Certifique-se de manter a estrutura de pastas (styles, scripts, images) conforme mostrado acima.

### 2. Configurar a API do Google Sheets (Obrigatório para salvar pedidos)

Para que os pedidos sejam salvos na planilha, você precisa configurar o Google Apps Script:

Crie uma nova planilha no Google Sheets.

Na linha 1, crie os cabeçalhos: Data, Nome, WhatsApp, Endereço, Produto, Qtd, Total, Observação, Imagem.

Vá em Extensões > Apps Script.

Cole o código fornecido (veja abaixo em "Código da API").

Clique em Implantar (Deploy) > Nova Implantação.

Selecione tipo: App da Web.

#### IMPORTANTE: Em "Quem pode acessar", selecione "Qualquer pessoa" (Anyone).

Copie a URL gerada (termina com /exec).

Abra o arquivo scripts/contato.js e cole a URL na variável:

const GOOGLE_SCRIPT_URL = "SUA_URL_AQUI";


### 3. Código da API (Google Apps Script)

Use este código no editor do Google:

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Página1');
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.data, data.nome, data.whatsapp, data.endereco, 
    data.produto, data.quantidade, data.total, 
    data.observacao, data.imagem
  ]);
  return ContentService.createTextOutput(JSON.stringify({"status":"sucesso"})).setMimeType(ContentService.MimeType.JSON);
}


## 📦 Como Adicionar Novos Produtos

Não é necessário mexer no HTML para adicionar produtos. Tudo é controlado pelo arquivo scripts/produtos.js.

Para adicionar um item novo, basta inserir um novo objeto na lista produtosDB:

{
    id: 99,
    nome: "Novo Produto",
    categoria: "quadros", // Opções: quadros, arranjos, panos, diversos
    imagem: "../images/fotosCinea/foto-nova.jpg",
    preco: 100.00,
    status: "encomenda", // ou "pronto"
    descricao: "Descrição detalhada do produto aqui."
},


### 🛠 Tecnologias Utilizadas

HTML5 (Semântico)

CSS3 (Grid, Flexbox, Animações, Variáveis CSS)

JavaScript (ES6+)

Google Apps Script (Para Backend Serverless)

FontAwesome (Ícones)

Google Fonts (Playfair Display, Great Vibes, Lato)

## 📞 Contato e Suporte

Desenvolvido por Greice Lacerda para Cinea Artes.
Para dúvidas sobre o código ou manutenção, consulte este documento.

# &copy; Cineia Artesanatos. Feito com ❤️ e código.
