const cardContainer = document.querySelector('.cardContainer');
const form = document.querySelector('.formulario');
const limparForm = document.querySelector('.buttonLimpar')

const nomeInput = document.getElementById('nome');
const valorInput = document.getElementById('valor');
const imagemInput = document.getElementById('imagem');

let titulo = '';
let price = '';
let imagem = '';

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
    card.innerHTML = `<section class="card" id="${dado.id}">
    <div class="productImg">
      <img src="${dado.imagem}" alt="product">
    </div>
    <h2>${dado.titulo}</h2>
    <div class="cardInfo">
      <p class="price">$ ${Number(dado.price.replace(',', '.')).toFixed(2).replace('.', ',')}</p>
      <button id="itemTrash"><img src="./assets/Trash.svg"></img></button>
    </div>
   </section>`;
    cardContainer.appendChild(card);
  });
}

constuirCard();

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  titulo = nomeInput.value;
  price = valorInput.value;
  imagem = imagemInput.value;

  const conexao = await fetch('http://localhost:3000/produtos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      titulo,
      price,
      imagem,
    }),
  });

  if (!conexao.ok) {
    throw new Error('Não foi possivel enviar o formulário');
  }
});

limparForm.addEventListener('click', () => {
  nomeInput.value = ''
  valorInput.value = ''
  imagemInput.value = ''
})

const deleteButtons = document.querySelectorAll('#itemTrash');
deleteButtons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    const productId = event.target.closest('section').getAttribute('id');
    await deleteProduct(productId);
  });
});

async function deleteProduct(id) {
  const conexao = await fetch(`http://localhost:3000/produtos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (!conexao.ok) {
    throw new Error('Não foi possivel deletar o produto');
  }
}
