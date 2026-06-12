const API_QUARTO = "http://localhost:3000/quarto";
const API_RESERVA = "http://localhost:3000/reserva";

const params = new URLSearchParams(window.location.search);
const quartoId = params.get("id");

async function listarQuartos() {
  const lista = document.getElementById("listaQuartos");
  if (!lista) return;

  try {
    const response = await fetch(`${API_QUARTO}/listar`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const quartos = await response.json();

    lista.innerHTML = "";

    if (!Array.isArray(quartos) || quartos.length === 0) {
      lista.innerHTML =
        "<tr><td colspan='3'>Nenhum quarto cadastrado</td></tr>";
      return;
    }

    quartos.forEach((q) => {
      lista.innerHTML += `
        <tr>
          <td>${q.numero ?? q.numeroQuarto ?? ""}</td>
          <td>${q.tipo ?? q.tipoQuarto ?? ""}</td>
          <td>
            <button class="btn-ver" onclick="irParaReservas(${q.id})">
              Ver Reservas
            </button>
            <button class="btn-excluir" onclick="excluirQuarto(${q.id})">
              Excluir
            </button>
          </td>
        </tr>
      `;
    });
  } catch (erro) {
    console.error("Erro ao listar quartos:", erro);
    lista.innerHTML =
      "<tr><td colspan='3'>Erro ao carregar quartos</td></tr>";
  }
}

function abrirCadastroQuarto() {
  const modal = document.getElementById("modalQuarto");
  if (modal) modal.style.display = "flex";
}

function fecharModalQuarto() {
  const modal = document.getElementById("modalQuarto");
  if (modal) modal.style.display = "none";
}

async function cadastrarQuarto() {
  const numero = document.getElementById("numero")?.value.trim();
  const tipo = document.getElementById("tipo")?.value.trim();

  if (!numero) {
    alert("Informe o número do quarto");
    return;
  }

  try {
    const response = await fetch(`${API_QUARTO}/cadastrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        numeroQuarto: numero,
        tipoQuarto: tipo
      })
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    fecharModalQuarto();
    await listarQuartos();

    document.getElementById("numero").value = "";
    document.getElementById("tipo").value = "";
  } catch (erro) {
    console.error("Erro ao cadastrar quarto:", erro);
    alert("Erro ao cadastrar quarto");
  }
}

async function excluirQuarto(id) {
  if (!confirm("Deseja excluir este quarto?")) return;

  try {
    const response = await fetch(`${API_QUARTO}/excluir/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    await listarQuartos();
  } catch (erro) {
    console.error("Erro ao excluir quarto:", erro);
    alert("Erro ao excluir quarto");
  }
}

function irParaReservas(id) {
  window.location.href = `reservas.html?id=${id}`;
}

async function listarReservas() {
  if (!quartoId) return;

  const lista = document.getElementById("listaReservas");

  try {
    const quartoResponse = await fetch(
      `${API_QUARTO}/buscar/${quartoId}`
    );

    if (!quartoResponse.ok) {
      throw new Error("Quarto não encontrado");
    }

    const quarto = await quartoResponse.json();

    const numero = quarto.numero ?? quarto.numeroQuarto ?? "";
    const tipo = quarto.tipo ?? quarto.tipoQuarto ?? "";

    const titulo = document.getElementById("tituloQuarto");
    const tipoElemento = document.getElementById("tipoQuarto");
    const info = document.getElementById("infoQuarto");

    if (titulo)
      titulo.textContent = `Reservas do Quarto ${numero}`;

    if (tipoElemento)
      tipoElemento.textContent = `Tipo: ${tipo}`;

    if (info)
      info.textContent = `${numero} - ${tipo}`;

    const reservasResponse = await fetch(
      `${API_RESERVA}/listar`
    );

    if (!reservasResponse.ok) {
      throw new Error("Erro ao carregar reservas");
    }

    const reservas = await reservasResponse.json();

    lista.innerHTML = "";

    const reservasDoQuarto = reservas.filter(
      (r) => Number(r.quartoId) === Number(quartoId)
    );

    if (reservasDoQuarto.length === 0) {
      lista.innerHTML =
        "<tr><td colspan='5'>Nenhuma reserva cadastrada</td></tr>";
      return;
    }

    reservasDoQuarto.forEach((r) => {
      lista.innerHTML += `
        <tr>
          <td>${r.id ?? ""}</td>
          <td>${r.hospede ?? r.nome ?? ""}</td>
          <td>${r.dataEntrada ?? r.entrada ?? ""}</td>
          <td>${r.dataSaida ?? r.saida ?? ""}</td>
          <td>
            <button class="btn-excluir"
              onclick="excluirReserva(${r.id})">
              Excluir
            </button>
          </td>
        </tr>
      `;
    });
  } catch (erro) {
    console.error("Erro ao listar reservas:", erro);

    if (lista) {
      lista.innerHTML =
        "<tr><td colspan='5'>Erro ao carregar reservas</td></tr>";
    }
  }
}

function abrirCadastroReserva() {
  const modal = document.getElementById("modalReserva");
  if (modal) modal.style.display = "flex";
}

function fecharModalReserva() {
  const modal = document.getElementById("modalReserva");
  if (modal) modal.style.display = "none";
}

async function cadastrarReserva() {
  const hospede = document.getElementById("hospede")?.value.trim();
  const entrada = document.getElementById("entrada")?.value;
  const saida = document.getElementById("saida")?.value;

  if (!hospede || !entrada || !saida || !quartoId) {
    alert("Preencha todos os campos");
    return;

  }

  try {
    const response = await fetch(`${API_RESERVA}/cadastrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        hospede,
        dataEntrada: entrada,
        dataSaida: saida,
        quartoId: Number(quartoId)
      })
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    fecharModalReserva();
    await listarReservas();

    document.getElementById("hospede").value = "";
    document.getElementById("entrada").value = "";
    document.getElementById("saida").value = "";
  } catch (erro) {
    console.error("Erro ao cadastrar reserva:", erro);
    alert("Erro ao cadastrar reserva");
  }
}

async function excluirReserva(id) {
  if (!confirm("Deseja excluir esta reserva?")) return;

  try {
    const response = await fetch(
      `${API_RESERVA}/excluir/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    await listarReservas();
  } catch (erro) {
    console.error("Erro ao excluir reserva:", erro);
    alert("Erro ao excluir reserva");
  }
}

function voltarQuartos() {
  window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("listaQuartos")) {
    listarQuartos();
  }

  if (document.getElementById("listaReservas")) {
    listarReservas();
  }
});