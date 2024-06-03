const cardContainer = document.querySelector('.cardContainer');
const form = document.querySelector('.formulario');

async function fetchApi() {
  const conexao = await fetch('http://localhost:3000/produtos', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (!conexao.ok) {
    throw new Error('Não foi possivel encontrar os dados');
  }

  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

const dados = await fetchApi();

function constuirCard() {
  dados.map((dado) => {
    const card = document.createElement('div');
    card.innerHTML = `<div class="card">
    <div class="productImg">
      <img src="${dado.imagem}" alt="product">
    </div>
    <h2>${dado.titulo}</h2>
    <div class="cardInfo">
      <p class="price">$ ${Number(dado.price).toFixed(2).replace('.', ',')}</p>
      <button><img src="./assets/Trash.svg"></img></button>
    </div>
   </div>`;
    cardContainer.appendChild(card);
  });
}

constuirCard();

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const titulo = document.getElementById('nome').value;
  const price = document.getElementById('valor').value;
  const imagem = document.getElementById('imagem').value;

  const conexao = await fetch('http://localhost:3000/produtos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      titulo,
      price,
      imagem
    }),
  });

  if (!conexao.ok) {
    throw new Error('Não foi possivel enviar o formulário');
  }
});
