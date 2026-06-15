// ===== CARRINHO DE COMPRAS =====

// Estado do carrinho (pode ser substituído por backend Django)
let cart = JSON.parse(localStorage.getItem('mmotos_cart')) || [];

// Variável global para o produto atual no modal
let produtoAtual = null;

// Funções auxiliares
function formatPrice(cents) {
  const reais = cents / 100;
  return reais.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function saveCart() {
  localStorage.setItem('mmotos_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countElements = document.querySelectorAll('.cart-count');
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1),0);
  
  countElements.forEach(el => {
    el.textContent = totalItems;
    el.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

// Adicionar ao carrinho
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id && item.type === product.type);
  
  if (existingItem) {

        if (product.type === 'produto') {
            existingItem.quantity += product.quantity || 1;

        } else {
            showNotification('Este serviço já está no carrinho.', 'error');
            return;
        }
    } else {
        if (product.type === 'servico') {
            cart.push({
                ...product,
                data: ''
            });
        } else {
            cart.push({
                ...product,
                quantity: product.quantity || 1
            });
        }
    }

    saveCart();

    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Remover do carrinho
function removeFromCart(productId, type) {
  cart = cart.filter(item => !(item.id === productId && item.type === type));
  saveCart();
  renderCart();
}

// Atualizar quantidade
function updateQuantity(productId, type, delta) {
  const item = cart.find(item => item.id === productId && item.type === type);
  
  if (item) {
    item.quantity += delta;
    
    if (item.quantity <= 0) {
      removeFromCart(productId, type);
    } else {
      saveCart();
      renderCart();
    }
  }
}

//atualizar data do serviço
function updateServiceDate(servicoId, data) {

    const item = cart.find(
        item => item.id == servicoId && item.type === 'servico'
    );

    if (!item) return;

    if (new Date(data + 'T00:00:00').getDay() === 0) {showNotification('A oficina não funciona aos domingos', 'error'); item.data = '';

    saveCart();
    renderCart();

    return;
}

    item.data = data;

    saveCart();
}

// Limpar carrinho
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

// Calcular totais
function getCartTotals() {
  const produtos = cart.filter(item => item.type === 'produto');
  const servicos = cart.filter(item => item.type === 'servico');

  const subtotalProdutos = produtos.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotalProdutos > 0 ? 1500 : 0;
  const totalProdutos = subtotalProdutos + shipping;

  const subtotalServicos = servicos.reduce((sum, item) => sum + item.price, 0);

  return {
    subtotalProdutos,
    shipping,
    totalProdutos,
    subtotalServicos,
    temProdutos: produtos.length > 0,
    temServicos: servicos.length > 0
  };
}

// Renderizar carrinho
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSummaryContainer = document.getElementById('cart-summary');
  
  if (!cartItemsContainer) return;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h3>Seu carrinho está vazio</h3>
        <p>Adicione produtos ou serviços para continuar</p>
        <a href="${produtosUrl}" class="btn btn-primary">Ver Produtos</a>
      </div>
    `;
    
    if (cartSummaryContainer) {
      cartSummaryContainer.style.display = 'none';
    }
    return;
  }
  
  // Renderizar itens
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item animate-in">
      <div class="cart-item-image">
        ${item.image 
          ? `<img src="${item.image}" alt="${item.name}">` 
          : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width:32px;height:32px;color:#9ca3af">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>`
        }
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price"> ${item.type === 'servico' ? formatPrice(item.price) : `${formatPrice(item.price)} cada`}
</div>
        
        ${
        item.type === 'servico'
        ? `
            <div class="service-schedule">
                <label><strong>Dia do serviço:</strong></label>

                <input
                    type="date"
                    min="${new Date().toISOString().split('T')[0]}"
                    value="${item.data || ''}"
                    onchange="updateServiceDate('${item.id}', this.value)"
                  
                >

                <button class="remove-btn"
                    onclick="removeFromCart('${item.id}', '${item.type}')">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor"
                        style="width:20px;height:20px">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>

                </button>
            </div>
        `
        : `
            <div class="cart-item-actions">

                <button class="quantity-btn"
                    onclick="updateQuantity('${item.id}', '${item.type}', -1)">−</button>

                <span class="quantity-value">${item.quantity}</span>

                <button class="quantity-btn"
                    onclick="updateQuantity('${item.id}', '${item.type}', 1)">+</button>

                <button class="remove-btn"
                    onclick="removeFromCart('${item.id}', '${item.type}')">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor"
                        style="width:20px;height:20px">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        `
    }
</div>
      <div class="cart-item-total">
        <strong>${formatPrice(item.price * (item.quantity || 1))}</strong>
      </div>
    </div>
  `).join('');
  
  // Renderizar resumo
  if (cartSummaryContainer) {
    cartSummaryContainer.style.display = 'block';
    const totals = getCartTotals();

    let summaryHTML = '<h3>Resumo do Pedido</h3>';

    // Seção de Produtos
    if (totals.temProdutos) {
      summaryHTML += `
        <div style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e5e7eb;">
          <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 1rem; color: var(--primary);">Produtos</h4>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(totals.subtotalProdutos)}</span>
          </div>
          <div class="summary-row">
            <span>Frete</span>
            <span>${formatPrice(totals.shipping)}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>${formatPrice(totals.totalProdutos)}</span>
          </div>
          <button class="btn btn-primary btn-lg" style="width:100%;margin-top:1rem" onclick="checkoutProdutos()">
            Comprar Produtos
          </button>
        </div>
      `;
    }

    // Seção de Serviços
    if (totals.temServicos) {
      summaryHTML += `
        <div style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e5e7eb;">
          <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 1rem; color: var(--primary);">Serviços</h4>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(totals.subtotalServicos)}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>${formatPrice(totals.subtotalServicos)}</span>
          </div>
          <button class="btn btn-primary btn-lg" style="width:100%;margin-top:1rem" onclick="checkoutServicos()">
            Confirmar Reservas
          </button>
        </div>
      `;
    }

    // Botão Limpar Carrinho
    summaryHTML += `
      <button class="btn btn-secondary" style="width:100%;margin-top:0.5rem" onclick="clearCart()">
        Limpar Carrinho
      </button>
    `;

    cartSummaryContainer.innerHTML = summaryHTML;
  }
}

// Checkout de Produtos
function checkoutProdutos() {
  const produtos = cart.filter(item => item.type === 'produto');

  if (produtos.length === 0) {
    showNotification('Nenhum produto no carrinho!', 'error');
    return;
  }

  abrirCheckoutModal();
}

// Checkout de Serviços
async function checkoutServicos() {
  const servicos = cart.filter(item => item.type === 'servico');

  if (servicos.length === 0) {
    showNotification('Nenhum serviço no carrinho!', 'error');
    return;
  }

  // Verificar se todos os serviços possuem uma data escolhida
  const servicosSemData = servicos.some(item => !item.data);
  if (servicosSemData) {
    showNotification('Escolha a data de todos os serviços.', 'error');
    return;
  }

  let sucessos = 0;
  let erros = [];

  // Enviar cada serviço para o backend e aguardar resposta
  for (const servico of servicos) {
    const formData = new FormData();
    formData.append('servico_id', servico.id);
    formData.append('data_agendada', servico.data);

    try {
      const response = await fetch('/confirmar-reserva/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      });

      const data = await response.json();

      if (response.ok && data.sucesso) {
        sucessos++;
      } else {
        erros.push(data.erro || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro:', error);
      erros.push('Erro de conexão ao processar reserva');
    }
  }

  if (erros.length > 0) {
    showNotification('Erro: ' + erros[0], 'error');
  } else {
    showNotification(`${sucessos} reserva(s) confirmada(s) com sucesso!`, 'success');
    clearCart();
  }
}

// Função para pegar CSRF token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Notificação
function showNotification(message, type = 'success') {
  // Remove notificações existentes
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Menu mobile
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('mobile-open');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initializeModal();
  initializeCheckoutModal();

  // Se estiver na página do carrinho, renderizar
  if (document.getElementById('cart-items')) {
    renderCart();
  }
});

// ===== MODAL DE PRODUTOS =====

function initializeModal() {
  if (!document.getElementById('modal-produto')) {
    const modalHTML = `
      <div id="modal-produto" class="modal">
        <div class="modal-card">
          <span id="fechar-modal" style="cursor:pointer;">&times;</span>
          <img id="modal-img" class="modal-img" src="" alt="Produto">
          <div class="modal-info">
            <h2 id="modal-nome"></h2>
            <p id="modal-desc"></p>
            <h3 id="modal-preco"></h3>
            <div class="qtd-box">
              <button id="menos">-</button>
              <input type="number" id="quantidade" value="1" min="1">
              <button id="mais">+</button>
            </div>
            <button id="btn-comprar" class="btn btn-primary">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Fechar modal ao clicar no X
  const fecharModalBtn = document.getElementById('fechar-modal');
  if (fecharModalBtn) {
    fecharModalBtn.addEventListener('click', () => {
      document.getElementById('modal-produto').style.display = 'none';
    });
  }

  // Botão de aumentar quantidade
  const maisBtn = document.getElementById('mais');
  if (maisBtn) {
    maisBtn.addEventListener('click', () => {
      const qtd = document.getElementById('quantidade');
      qtd.value = parseInt(qtd.value) + 1;
    });
  }

  // Botão de diminuir quantidade
  const menosBtn = document.getElementById('menos');
  if (menosBtn) {
    menosBtn.addEventListener('click', () => {
      const qtd = document.getElementById('quantidade');
      if (qtd.value > 1) {
        qtd.value = parseInt(qtd.value) - 1;
      }
    });
  }

  // Botão de comprar
  const btnComprar = document.getElementById('btn-comprar');
  if (btnComprar) {
    btnComprar.addEventListener('click', () => {
      const qtd = parseInt(document.getElementById('quantidade').value);
      addToCart({
        ...produtoAtual,
        quantity: qtd
      });
      document.getElementById('modal-produto').style.display = 'none';
    });
  }

  // Fechar modal ao clicar fora
  const modal = document.getElementById('modal-produto');
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
}

function abrirModal(produto) {
  produtoAtual = produto;

  const modal = document.getElementById('modal-produto');
  if (!modal) initializeModal();

  document.getElementById('modal-img').src = produto.image;
  document.getElementById('modal-nome').textContent = produto.name;
  document.getElementById('modal-desc').textContent = produto.desc;
  document.getElementById('modal-preco').textContent = formatPrice(produto.price);
  document.getElementById('quantidade').value = 1;
  document.getElementById('modal-produto').style.display = 'flex';
}

// ===== MODAL DE CHECKOUT =====

function initializeCheckoutModal() {
  if (!document.getElementById('checkout-modal-container')) {
    const checkoutHTML = `
      <div id="checkout-modal-container" class="checkout-modal">
        <div class="checkout-card">
          <h2 id="checkout-title">Finalizar Compra</h2>
          <div id="checkout-error" class="checkout-error"></div>

          <!-- STEP 1: Informações de Entrega -->
          <div id="checkout-step-1" class="checkout-step">
            <div class="checkout-section-title">Seus Dados</div>

            <div class="checkout-info">
              <div class="checkout-info-row">
                <span class="checkout-info-label">Usuário:</span>
                <span class="checkout-info-value" id="checkout-username">-</span>
              </div>
              <div class="checkout-info-row">
                <span class="checkout-info-label">Email:</span>
                <span class="checkout-info-value" id="checkout-email">-</span>
              </div>
            </div>

            <div class="checkout-section-title">Informações de Entrega</div>

            <div class="checkout-field">
              <label>CEP</label>
              <input type="text" id="checkout-cep" placeholder="Exemplo: 01310-100" maxlength="8">
            </div>

            <div class="checkout-field">
              <label>Telefone</label>
              <input type="text" id="checkout-phone" placeholder="Exemplo: (11) 99999-9999">
            </div>

            <div class="checkout-section-title">Resumo da Compra</div>

            <div class="checkout-info">
              <div class="checkout-info-row">
                <span class="checkout-info-label">Subtotal:</span>
                <span class="checkout-info-value" id="checkout-subtotal">R$ 0,00</span>
              </div>
              <div class="checkout-info-row">
                <span class="checkout-info-label">Frete:</span>
                <span class="checkout-info-value" id="checkout-shipping">R$ 0,00</span>
              </div>
              <div class="checkout-info-row" style="font-size: 1rem; padding-top: 0.5rem; border-top: 1px solid rgba(0,0,0,0.1);">
                <span class="checkout-info-label">Total:</span>
                <span class="checkout-info-value" style="font-size: 1.25rem; color: var(--primary);" id="checkout-total">R$ 0,00</span>
              </div>
            </div>

            <div class="checkout-payment">
              <div class="checkout-payment-method">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h10m4 0a1 1 0 11-2 0m2 0a1 1 0 10-2 0m-6-4h.01M9 15a1 1 0 11-2 0m2 0a1 1 0 10-2 0" />
                </svg>
                Pagar com PIX
              </div>
            </div>

            <div class="checkout-actions">
              <button class="btn btn-primary" id="btn-checkout-confirm" onclick="confirmarCheckout()">Confirmar Pedido</button>
              <button class="btn-checkout-cancel" onclick="fecharCheckoutModal()">Cancelar</button>
            </div>
          </div>

          <!-- STEP 2: QR Code -->
          <div id="checkout-step-2" class="checkout-step hidden">
            <div style="text-align: center; margin-bottom: 1.5rem;">
              <h3 style="font-size: 1.125rem; margin-bottom: 0.5rem;">Escaneie para Pagar</h3>
              <p style="color: var(--text-muted); font-size: 0.875rem;">Use o seu app bancário para escanear o QR code</p>
            </div>

            <div class="checkout-qrcode">
              <img src="/static/img/qrcode-pix.png" alt="QR Code PIX" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22><rect fill=%22%23f0f0f0%22 width=%22200%22 height=%22200%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2214%22 fill=%22%23999%22>QR Code</text></svg>'">
            </div>

            <div class="checkout-info">
              <div class="checkout-info-row">
                <span class="checkout-info-label">Total a Pagar:</span>
                <span class="checkout-info-value" id="checkout-qr-total">R$ 0,00</span>
              </div>
            </div>

            <div class="checkout-actions">
              <button class="btn btn-primary" onclick="confirmarPagamento()">Confirmar Pagamento</button>
              <button class="btn-checkout-cancel" onclick="fecharCheckoutModal()">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', checkoutHTML);
  }

  // Fechar ao clicar fora
  const modal = document.getElementById('checkout-modal-container');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        fecharCheckoutModal();
      }
    });
  }
}

function abrirCheckoutModal() {
  const checkoutModal = document.getElementById('checkout-modal-container');
  if (!checkoutModal) {
    initializeCheckoutModal();
  }

  // Preencher dados do usuário
  const userSpan = document.querySelector('.userBtn');
  const username = userSpan ? userSpan.textContent.trim() : 'Usuário';

  document.getElementById('checkout-username').textContent = username || 'Usuário';
  document.getElementById('checkout-email').textContent = document.getElementById('checkout-email').textContent || 'email@exemplo.com';

  // Calcular totais
  const totals = getCartTotals();
  document.getElementById('checkout-subtotal').textContent = formatPrice(totals.subtotalProdutos);
  document.getElementById('checkout-shipping').textContent = formatPrice(totals.shipping);
  document.getElementById('checkout-total').textContent = formatPrice(totals.totalProdutos);
  document.getElementById('checkout-qr-total').textContent = formatPrice(totals.totalProdutos);

  // Mostrar step 1
  document.getElementById('checkout-step-1').classList.remove('hidden');
  document.getElementById('checkout-step-2').classList.add('hidden');
  document.getElementById('checkout-error').classList.remove('show');
  document.getElementById('checkout-error').textContent = '';

  // Limpar campos
  document.getElementById('checkout-cep').value = '';
  document.getElementById('checkout-phone').value = '';

  // Abrir modal
  document.getElementById('checkout-modal-container').classList.add('active');
}

function fecharCheckoutModal() {
  document.getElementById('checkout-modal-container').classList.remove('active');
}

function confirmarCheckout() {
  const cep = document.getElementById('checkout-cep').value.trim();
  const phone = document.getElementById('checkout-phone').value.trim();
  const errorEl = document.getElementById('checkout-error');

  // Validar CEP
  if (!cep || cep.length < 5) {
    errorEl.textContent = '❌ Por favor, insira um CEP válido';
    errorEl.classList.add('show');
    return;
  }

  // Validar Telefone
  if (!phone || phone.length < 10) {
    errorEl.textContent = '❌ Por favor, insira um telefone válido';
    errorEl.classList.add('show');
    return;
  }

  // Ocultar erro
  errorEl.classList.remove('show');

  // Mostrar step 2
  document.getElementById('checkout-step-1').classList.add('hidden');
  document.getElementById('checkout-step-2').classList.remove('hidden');
}

function confirmarPagamento() {
  showNotification('Pedido confirmado! Verificaremos o pagamento em breve.', 'success');
  fecharCheckoutModal();
  clearCart();
}