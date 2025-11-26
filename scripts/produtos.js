/* =========================================
   PRODUTOS.JS - Banco de Dados de Produtos
   Arquivo: scripts/produtos.js
   ========================================= */

const produtosDB = [
    {
        id: 1,
        nome: "Jardim Vertical",
        categoria: "quadros", // Necessário para o filtro funcionar
        imagem: "../images/DSC04589.JPG",
        preco: 150.00,
        status: "pronto",
        descricao: "Quadro decorativo com folhagens preservadas. Tamanho 30x40cm."
    },
    {
        id: 2,
        nome: "Raios de Sol",
        categoria: "arranjos",
        imagem: "../images/DSC04602.JPG",
        preco: 120.00,
        status: "encomenda",
        descricao: "Arranjo vibrante de dálias amarelas. Ideal para centro de mesa."
    },
    {
        id: 3,
        nome: "Suavidade Rosa",
        categoria: "quadros",
        imagem: "../images/DSC04587.jpg",
        preco: 180.00,
        status: "pronto",
        descricao: "Composição delicada com tons de rosa pastel e moldura branca."
    },
    {
        id: 4,
        nome: "Primavera Viva",
        categoria: "arranjos",
        imagem: "../images/DSC04593.JPG",
        preco: 95.00,
        status: "encomenda",
        descricao: "Buquê colorido e alegre. Perfeito para presentear."
    },
    {
        id: 5,
        nome: "Arte em Folha",
        categoria: "quadros",
        imagem: "../images/DSC04581.JPG",
        preco: 80.00,
        status: "pronto",
        descricao: "Detalhes de folhagem esculpida à mão. Peça minimalista."
    },
    {
        id: 6,
        nome: "Elegância Clássica",
        categoria: "arranjos",
        imagem: "../images/DSC04613.JPG",
        preco: 200.00,
        status: "encomenda",
        descricao: "Vaso grande com arranjo floral completo e sofisticado."
    },
    // Item extra para testar a categoria "Quadros" com a foto da moldura
    {
        id: 7,
        nome: "Espelho Floral",
        categoria: "quadros",
        imagem: "../images/FotoMolduraCinea.png",
        preco: 250.00,
        status: "encomenda",
        descricao: "Moldura trabalhada com rosas artesanais. Peça de destaque."
    },
    // Item extra para testar a categoria "Panos de Prato"
    {
        id: 8,
        nome: "Pano Bordado",
        categoria: "panos",
        imagem: "../images/DSC4603",
        preco: 35.00,
        status: "pronto",
        descricao: "Pano de prato com barrado e bordado manual delicado."
    }
];
