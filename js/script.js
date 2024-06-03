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
      <p class="price">$ ${dado.price.toFixed(2).replace('.', ',')}</p>
      <button><img src="./assets/Trash.svg"></img></button>
    </div>
   </div>`;
    cardContainer.appendChild(card);
  });
}

constuirCard();
