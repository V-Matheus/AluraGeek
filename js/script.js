const cardContainer = document.querySelector('.cardContainer');

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
