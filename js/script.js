const cardContainer = document.querySelector('.cardContainer');

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

fetchApi()

function constuirCard() {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<div class="card">
  <div class="productImg">
    <img src="${imagem}" alt="product">
  </div>
  <h2>${titulo}</h2>
  <div class="cardInfo">
    <p class="price">$ ${price.toFixed(2).replace('.', ',')}</p>
    <button><img src="./assets/Trash.svg"></img></button>
  </div>
</div>`;

  cardContainer.appendChild(card);
}