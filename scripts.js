// scripts.js

// Função para verificar se o usuário está logado
function checkLoginStatus() {
  fetch("check_session.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.logged_in) {
        // Usuário está logado, mostrar conteúdo principal
        showMainContent();
      } else {
        // Usuário não está logado, mostrar página de login
        showLoginPage();
      }
    })
    .catch((error) => {
      console.error("Erro ao verificar status de login:", error);
      // Em caso de erro, mostrar página de login
      showLoginPage();
    });
}

// Função para mostrar a página de login
function showLoginPage() {
  document.getElementById("auth-container").style.display = "block";
  document.getElementById("page-content").style.display = "none";
  document.querySelector(".login-container").style.display = "block";
  document.querySelector(".register-container").style.display = "none";
  document.querySelector(".password-recovery-container").style.display = "none";
  document.querySelector(".navbar").style.display = "none";
  document.querySelector(".header").style.display = "none";
}

// Função para mostrar a página de registro
function showRegisterPage() {
  document.getElementById("auth-container").style.display = "block";
  document.getElementById("page-content").style.display = "none";
  document.querySelector(".login-container").style.display = "none";
  document.querySelector(".register-container").style.display = "block";
  document.querySelector(".password-recovery-container").style.display = "none";
  document.querySelector(".navbar").style.display = "none";
  document.querySelector(".header").style.display = "none";
}

// Função para mostrar a página de recuperação de senha
function showPasswordRecoveryPage() {
  document.getElementById("auth-container").style.display = "block";
  document.getElementById("page-content").style.display = "none";
  document.querySelector(".login-container").style.display = "none";
  document.querySelector(".register-container").style.display = "none";
  document.querySelector(".password-recovery-container").style.display =
    "block";
  document.querySelector(".navbar").style.display = "none";
  document.querySelector(".header").style.display = "none";
}

// Função para mostrar o conteúdo principal
function showMainContent() {
  document.getElementById("auth-container").style.display = "none";
  document.querySelector(".navbar").style.display = "flex";
  document.querySelector(".header").style.display = "block";
  document.getElementById("page-content").style.display = "block";
  showInitialPage();
}

// Adicionar event listeners para os formulários
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Obter dados do formulário
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Enviar requisição de login para o servidor
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    fetch("login.php", {
      method: "POST",
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Login bem-sucedido, mostrar conteúdo principal
          showMainContent();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Erro durante o login:", error);
        alert("Ocorreu um erro ao fazer login.");
      });
  });

document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Obter dados do formulário
    const email = document.getElementById("new-email").value;
    const password = document.getElementById("new-password").value;

    // Enviar requisição de registro para o servidor
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    fetch("register.php", {
      method: "POST",
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Usuário registrado com sucesso. Faça login para continuar.");
          showLoginPage();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Erro durante o registro:", error);
        alert("Ocorreu um erro ao registrar.");
      });
  });

document
  .getElementById("recovery-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Obter dados do formulário
    const email = document.getElementById("recovery-email").value;

    // Enviar requisição de recuperação de senha para o servidor
    const params = new URLSearchParams();
    params.append("email", email);

    fetch("recover_password.php", {
      method: "POST",
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        if (data.status === "success") {
          showLoginPage();
        }
      })
      .catch((error) => {
        console.error("Erro durante a recuperação de senha:", error);
        alert("Ocorreu um erro ao recuperar a senha.");
      });
  });

// Funções para mostrar diferentes páginas
let currentPage = "initial";

// Função para exibir a página inicial
function showInitialPage() {
  currentPage = "initial";
  updateBackButton();
  document.getElementById("page-content").innerHTML = `
        <div class="cards">
            <div class="card">
                <img src="https://img.icons8.com/ios-filled/100/3498db/box.png" alt="Produto">
                <h3>Cadastro de Produtos</h3>
                <p>Registre novos produtos e gerencie todas as informações necessárias.</p>
                <a href="#" onclick="showCreatePage()">Cadastrar</a>
            </div>
            <div class="card">
                <img src="https://img.icons8.com/ios-filled/100/3498db/search--v1.png" alt="Consultar">
                <h3>Consulta de Produtos</h3>
                <p>Pesquise e visualize as informações de produtos existentes no sistema.</p>
                <a href="#" onclick="showConsultPage()">Consultar</a>
            </div>
            <div class="card">
                <img src="https://img.icons8.com/ios-filled/100/3498db/warehouse.png" alt="Estoque">
                <h3>Controle de Estoque</h3>
                <p>Mantenha o controle do estoque para garantir que nenhum produto falte nas prateleiras.</p>
                <a href="#" onclick="showStockPage()">Ver Estoque</a>
            </div>
            <div class="card">
                <img src="https://img.icons8.com/ios-filled/100/3498db/edit-property.png" alt="Atualização">
                <h3>Atualização de Cadastro</h3>
                <p>Atualize informações de produtos já cadastrados no sistema.</p>
                <a href="#" onclick="showUpdatePage()">Atualizar</a>
            </div>
            <div class="card">
                <img src="https://img.icons8.com/ios-filled/100/3498db/calendar--v1.png" alt="Validade">
                <h3>Controle de Validade</h3>
                <p>Monitore a validade dos produtos no estoque e evite desperdícios.</p>
                <a href="#" onclick="showValidityPage()">Ver Validade</a>
            </div>
        </div>
    `;
}

// Função para atualizar a visibilidade do botão "Voltar"
function updateBackButton() {
  const backButton = document.querySelector(".back-button");
  backButton.style.display = currentPage === "initial" ? "none" : "block";
}

// Função para voltar à página anterior
function goBack() {
  switch (currentPage) {
    case "updateForm":
      showUpdatePage();
      break;
    default:
      showInitialPage();
      break;
  }
}

// Função para exibir a página de criação de produto
function showCreatePage() {
  currentPage = "create";
  updateBackButton();
  document.getElementById("page-content").innerHTML = `
        <h1>Criar Novo Produto</h1>
        <form id="create-form">
            <label for="descricao">Descrição do Produto:</label>
            <input type="text" id="descricao" name="descricao" required>
            <label for="codigoBarra">Código de Barra:</label>
            <input type="text" id="codigoBarra" name="codigoBarra" required>
            <label for="custo">Custo do Produto:</label>
            <input type="number" id="custo" name="custo" step="0.01" required>
            <label for="precoVenda">Preço de Venda:</label>
            <input type="number" id="precoVenda" name="precoVenda" step="0.01" required>
            <label for="estoque">Estoque do Produto:</label>
            <input type="number" id="estoque" name="estoque" required>
            <label for="validade">Validade do Produto:</label>
            <input type="date" id="validade" name="validade" required>
            <button type="submit">Criar Produto</button>
        </form>
    `;

  document
    .getElementById("create-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const descricao = document.getElementById("descricao").value;
      const codigoBarra = document.getElementById("codigoBarra").value;
      const custo = document.getElementById("custo").value;
      const precoVenda = document.getElementById("precoVenda").value;
      const estoque = document.getElementById("estoque").value;
      const validade = document.getElementById("validade").value;

      const product = {
        descricao,
        codigoBarra,
        custo,
        precoVenda,
        estoque,
        validade,
      };
      createProduct(product);
    });
}

// Função para criar produto usando Fetch API
function createProduct(product) {
  const params = new URLSearchParams();
  for (const key in product) {
    params.append(key, product[key]);
  }

  fetch("create.php", {
    method: "POST",
    body: params,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
        showConsultPage();
      } else {
        alert(data.message);
        if (data.message === "Acesso negado. Faça login para continuar.") {
          showLoginPage();
        }
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao comunicar com o servidor.");
    });
}

// Função para exibir a página de consulta de produtos
function showConsultPage() {
  currentPage = "consult";
  updateBackButton();
  document.getElementById("page-content").innerHTML = `
        <h1>Relatório de Produtos</h1>
        <div class="search-container">
            <input type="text" id="search-input" placeholder="Buscar produto...">
            <button id="search-button">Pesquisar</button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Código de Barra</th>
                        <th>Custo</th>
                        <th>Preço de Venda</th>
                        <th>Margem de Lucro</th>
                        <th>Estoque</th>
                        <th>Validade</th>
                        <th>Produto Vencido</th>
                    </tr>
                </thead>
                <tbody id="product-table-body">
                    <!-- Os produtos serão inseridos aqui -->
                </tbody>
            </table>
        </div>
    `;

  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      filterProducts();
    });

  // Carregar todos os produtos ao abrir a página
  filterProducts();
}

// Função para obter produtos via Fetch API
function getProducts(callback) {
  fetch("read.php")
    .then((response) => response.json())
    .then((data) => {
      if (
        data.status === "error" &&
        data.message === "Acesso negado. Faça login para continuar."
      ) {
        showLoginPage();
      } else {
        callback(data);
      }
    })
    .catch((error) => console.error("Erro:", error));
}

// Função para exibir os produtos na tabela
function displayProducts(products) {
  const tableBody = document.getElementById("product-table-body");
  tableBody.innerHTML = "";
  products.forEach((product) => {
    const margemLucro =
      ((product.precoVenda - product.custo) / product.custo) * 100;
    const isExpired = new Date(product.validade) < new Date();
    tableBody.innerHTML += `
            <tr>
                <td>${escapeHTML(product.descricao)}</td>
                <td>${escapeHTML(product.codigoBarra)}</td>
                <td>R$ ${parseFloat(product.custo).toFixed(2)}</td>
                <td>R$ ${parseFloat(product.precoVenda).toFixed(2)}</td>
                <td>${margemLucro.toFixed(2)}%</td>
                <td>${product.estoque}</td>
                <td>${formatDate(product.validade)}</td>
                <td>${isExpired ? "Sim" : "Não"}</td>
            </tr>
        `;
  });
}

// Função para filtrar os produtos com base na entrada do usuário
function filterProducts() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();

  fetch(`search.php?query=${encodeURIComponent(searchInput)}`)
    .then((response) => response.json())
    .then((data) => {
      if (
        data.status === "error" &&
        data.message === "Acesso negado. Faça login para continuar."
      ) {
        showLoginPage();
      } else {
        displayProducts(data);
      }
    })
    .catch((error) => console.error("Erro:", error));
}

// Função para formatar datas
function formatDate(dateStr) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", options);
}

// Função para escapar HTML e evitar XSS
function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/[&<>'"]/g, function (tag) {
    const charsToReplace = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return charsToReplace[tag] || tag;
  });
}

// Funções para navegação
function showRegister() {
  showRegisterPage();
}

function showLogin() {
  showLoginPage();
}

function showPasswordRecovery() {
  showPasswordRecoveryPage();
}

// Função para lidar com logout
function logout() {
  fetch("logout.php")
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      showLoginPage();
    })
    .catch((error) => {
      console.error("Erro durante o logout:", error);
      alert("Ocorreu um erro ao sair.");
    });
}

// Função para exibir a página de atualização de cadastro
function showUpdatePage() {
  currentPage = "update";
  updateBackButton();
  document.getElementById("page-content").innerHTML = `
        <h1>Atualização de Cadastro</h1>
        <div class="search-container">
            <input type="text" id="search-input" placeholder="Buscar produto...">
            <button id="search-button">Pesquisar</button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Código de Barra</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="product-table-body">
                    <!-- Os produtos serão inseridos aqui -->
                </tbody>
            </table>
        </div>
    `;
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      filterUpdateProducts();
    });
  // Carregar todos os produtos ao abrir a página
  filterUpdateProducts();
}

function filterUpdateProducts() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();

  fetch(`search.php?query=${encodeURIComponent(searchInput)}`)
    .then((response) => response.json())
    .then((data) => {
      if (
        data.status === "error" &&
        data.message === "Acesso negado. Faça login para continuar."
      ) {
        showLoginPage();
      } else {
        displayUpdateProducts(data);
      }
    })
    .catch((error) => console.error("Erro:", error));
}

function displayUpdateProducts(products) {
  const tableBody = document.getElementById("product-table-body");
  tableBody.innerHTML = "";
  products.forEach((product) => {
    tableBody.innerHTML += `
            <tr>
                <td>${escapeHTML(product.descricao)}</td>
                <td>${escapeHTML(product.codigoBarra)}</td>
                <td>${product.estoque}</td>
                <td>
                    <button class="adjust-stock-btn" onclick="showUpdateForm(${
                      product.id
                    })">Editar</button>
                    <button class="adjust-stock-btn" onclick="deleteProduct(${
                      product.id
                    })">Excluir</button>
                </td>
            </tr>
        `;
  });
}

function deleteProduct(id) {
  if (confirm("Tem certeza de que deseja excluir este produto?")) {
    const params = new URLSearchParams();
    params.append("id", id);

    fetch("delete.php", {
      method: "POST",
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert(data.message);
          // Atualizar a lista de produtos
          filterUpdateProducts();
        } else {
          alert(data.message);
          if (data.message === "Acesso negado. Faça login para continuar.") {
            showLoginPage();
          }
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao excluir o produto.");
      });
  }
}

function showUpdateForm(id) {
  currentPage = "updateForm";
  updateBackButton();
  // Buscar os detalhes do produto
  fetch(`get_product.php?id=${id}`)
    .then((response) => response.json())
    .then((product) => {
      if (product.status === "error") {
        alert(product.message);
        if (product.message === "Acesso negado. Faça login para continuar.") {
          showLoginPage();
        }
      } else {
        document.getElementById("page-content").innerHTML = `
                    <h1>Atualizar Produto</h1>
                    <form id="update-form">
                        <input type="hidden" id="product-id" value="${
                          product.id
                        }">
                        <label for="descricao">Descrição do Produto:</label>
                        <input type="text" id="descricao" name="descricao" value="${escapeHTML(
                          product.descricao
                        )}" required>
                        <label for="codigoBarra">Código de Barra:</label>
                        <input type="text" id="codigoBarra" name="codigoBarra" value="${escapeHTML(
                          product.codigoBarra
                        )}" required>
                        <label for="custo">Custo do Produto:</label>
                        <input type="number" id="custo" name="custo" step="0.01" value="${
                          product.custo
                        }" required>
                        <label for="precoVenda">Preço de Venda:</label>
                        <input type="number" id="precoVenda" name="precoVenda" step="0.01" value="${
                          product.precoVenda
                        }" required>
                        <label for="estoque">Estoque do Produto:</label>
                        <input type="number" id="estoque" name="estoque" value="${
                          product.estoque
                        }" required>
                        <label for="validade">Validade do Produto:</label>
                        <input type="date" id="validade" name="validade" value="${
                          product.validade
                        }" required>
                        <button type="submit">Atualizar Produto</button>
                    </form>
                `;
        document
          .getElementById("update-form")
          .addEventListener("submit", function (e) {
            e.preventDefault();
            const id = document.getElementById("product-id").value;
            const descricao = document.getElementById("descricao").value;
            const codigoBarra = document.getElementById("codigoBarra").value;
            const custo = document.getElementById("custo").value;
            const precoVenda = document.getElementById("precoVenda").value;
            const estoque = document.getElementById("estoque").value;
            const validade = document.getElementById("validade").value;

            const product = {
              id,
              descricao,
              codigoBarra,
              custo,
              precoVenda,
              estoque,
              validade,
            };
            updateProduct(product);
          });
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao buscar detalhes do produto.");
    });
}

function updateProduct(product) {
  const params = new URLSearchParams();
  for (const key in product) {
    params.append(key, product[key]);
  }

  fetch("update.php", {
    method: "POST",
    body: params,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
        showUpdatePage();
      } else {
        alert(data.message);
        if (data.message === "Acesso negado. Faça login para continuar.") {
          showLoginPage();
        }
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao comunicar com o servidor.");
    });
}

// Função para exibir a página de controle de estoque
function showStockPage() {
  currentPage = "stock";
  updateBackButton();
  document.getElementById("page-content").innerHTML = `
        <h1>Controle de Estoque</h1>
        <div class="search-container">
            <input type="text" id="search-input" placeholder="Buscar produto...">
            <button id="search-button">Pesquisar</button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Código de Barra</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="product-table-body">
                    <!-- Os produtos serão inseridos aqui -->
                </tbody>
            </table>
        </div>
    `;
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      filterStockProducts();
    });
  // Carregar todos os produtos ao abrir a página
  filterStockProducts();
}

function filterStockProducts() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();

  fetch(`search.php?query=${encodeURIComponent(searchInput)}`)
    .then((response) => response.json())
    .then((data) => {
      if (
        data.status === "error" &&
        data.message === "Acesso negado. Faça login para continuar."
      ) {
        showLoginPage();
      } else {
        displayStockProducts(data);
      }
    })
    .catch((error) => console.error("Erro:", error));
}

function displayStockProducts(products) {
  const tableBody = document.getElementById("product-table-body");
  tableBody.innerHTML = "";
  products.forEach((product) => {
    tableBody.innerHTML += `
      <tr>
        <td>${escapeHTML(product.descricao)}</td>
        <td>${escapeHTML(product.codigoBarra)}</td>
        <td>${product.estoque}</td>
        <td><button class="adjust-stock-btn" onclick="adjustStock(${product.id})">Ajustar Estoque</button></td>
      </tr>
    `;
  });
}

function adjustStock(id) {
  // Buscar os detalhes do produto
  fetch(`get_product.php?id=${id}`)
    .then((response) => response.json())
    .then((product) => {
      if (product.status === "error") {
        alert(product.message);
        if (product.message === "Acesso negado. Faça login para continuar.") {
          showLoginPage();
        }
      } else {
        const newStock = prompt(
          "Informe a nova quantidade em estoque:",
          product.estoque
        );
        if (newStock !== null) {
          updateStock(id, newStock);
        }
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao buscar detalhes do produto.");
    });
}

function updateStock(id, newStock) {
  const params = new URLSearchParams();
  params.append("id", id);
  params.append("estoque", newStock);

  fetch("update_stock.php", {
    method: "POST",
    body: params,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
        showStockPage();
      } else {
        alert(data.message);
        if (data.message === "Acesso negado. Faça login para continuar.") {
          showLoginPage();
        }
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao atualizar estoque.");
    });
}

// Função para exibir a página de controle de validade
function showValidityPage() {
  currentPage = "validity";
  updateBackButton();
  document.getElementById("page-content").innerHTML = `
        <h1>Controle de Validade</h1>
        <div class="search-container">
            <input type="text" id="search-input" placeholder="Buscar produto...">
            <button id="search-button">Pesquisar</button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Código de Barra</th>
                        <th>Validade</th>
                        <th>Vencido</th>
                    </tr>
                </thead>
                <tbody id="product-table-body">
                    <!-- Os produtos serão inseridos aqui -->
                </tbody>
            </table>
        </div>
    `;
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      filterValidityProducts();
    });
  // Carregar todos os produtos ao abrir a página
  filterValidityProducts();
}

function filterValidityProducts() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();

  fetch(`search.php?query=${encodeURIComponent(searchInput)}`)
    .then((response) => response.json())
    .then((data) => {
      if (
        data.status === "error" &&
        data.message === "Acesso negado. Faça login para continuar."
      ) {
        showLoginPage();
      } else {
        displayValidityProducts(data);
      }
    })
    .catch((error) => console.error("Erro:", error));
}

function displayValidityProducts(products) {
  const tableBody = document.getElementById("product-table-body");
  tableBody.innerHTML = "";
  products.forEach((product) => {
    const isExpired = new Date(product.validade) < new Date();
    tableBody.innerHTML += `
            <tr>
                <td>${escapeHTML(product.descricao)}</td>
                <td>${escapeHTML(product.codigoBarra)}</td>
                <td>${formatDate(product.validade)}</td>
                <td>${isExpired ? "Sim" : "Não"}</td>
            </tr>
        `;
  });
}

// Verificar status de login ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  checkLoginStatus();
});
