let pagina = 0;
const porPagina = 9;
let listaTrajes = [];

async function carregarTrajes() {
  try {
    if (listaTrajes.length === 0) {
      const resposta = await fetch('dados/trajes-infantis.json');
      listaTrajes = await resposta.json();
    }

    const container = document.getElementById('container-trajes-infantil');
    const inicio = pagina * porPagina;
    const fim = inicio + porPagina;
    const grupo = listaTrajes.slice(inicio, fim);

    grupo.forEach(item => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="card border-0 shadow-sm">
          <img src="${item.imagem}" class="card-img-top" alt="${item.titulo}" style="height: 350px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${item.titulo}</h5>
            <p class="card-text">${item.descricao}</p>
          </div>
        </div>
      `;
      container.appendChild(col);
    });

    pagina++;
    const botao = document.getElementById('btnVerMais');
    if (pagina * porPagina >= listaTrajes.length) {
      botao.classList.add('d-none');
    } else {
      botao.classList.remove('d-none');
    }

  } catch (erro) {
    console.error('Erro ao carregar os trajes:', erro);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarTrajes();

  const botao = document.getElementById('btnVerMais');
  if (botao) {
    botao.addEventListener('click', carregarTrajes);
  }
});
