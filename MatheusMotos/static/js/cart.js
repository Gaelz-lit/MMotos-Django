// ===== CARRINHO DE COMPRAS =====

// Estado do carrinho (pode ser substituído por backend Django)
let cart = JSON.parse(localStorage.getItem('mmotos_cart')) || [];

// Funções auxiliares
function formatPrice(cents) {
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function saveCart() {
  localStorage.setItem('mmotos_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countElements = document.querySelectorAll('.cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  countElements.forEach(el => {
    el.textContent = totalItems;
    el.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

// Adicionar ao carrinho
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id && item.type === product.type);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
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

// Limpar carrinho
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

// Calcular totais
function getCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 1500 : 0; // R$ 15,00 de frete
  const total = subtotal + shipping;
  
  return { subtotal, shipping, total };
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
        <div class="cart-item-price">${formatPrice(item.price)} cada</div>
        <div class="cart-item-actions">
          <button class="quantity-btn" onclick="updateQuantity('${item.id}', '${item.type}', -1)">−</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity('${item.id}', '${item.type}', 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart('${item.id}', '${item.type}')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width:20px;height:20px">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div class="cart-item-total">
        <strong>${formatPrice(item.price * item.quantity)}</strong>
      </div>
    </div>
  `).join('');
  
  // Renderizar resumo
  if (cartSummaryContainer) {
    cartSummaryContainer.style.display = 'block';
    const totals = getCartTotals();
    
    cartSummaryContainer.innerHTML = `
      <h3>Resumo do Pedido</h3>
      <div class="summary-row">
        <span>Subtotal</span>
        <span>${formatPrice(totals.subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>Frete</span>
        <span>${formatPrice(totals.shipping)}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>${formatPrice(totals.total)}</span>
      </div>
      <button class="btn btn-primary btn-lg" style="width:100%;margin-top:1.5rem" onclick="checkout()">
        Finalizar Compra
      </button>
      <button class="btn btn-secondary" style="width:100%;margin-top:0.5rem" onclick="clearCart()">
        Limpar Carrinho
      </button>
    `;
  }
}

// Checkout (integrar com Django/Stripe)
function checkout() {
  if (cart.length === 0) {
    showNotification('Seu carrinho está vazio!', 'error');
    return;
  }
  
  // Aqui você pode fazer um POST para seu backend Django
  // que criará a sessão do Stripe
  
  // Exemplo de integração com Django:
  /*
  fetch('/api/checkout/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify({ items: cart })
  })
  .then(response => response.json())
  .then(data => {
    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    }
  });
  */
  
  // Por enquanto, apenas simula
  alert('Redirecionando para o checkout...\n\nIntegre com seu backend Django para processar o pagamento.');
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
  
  // Se estiver na página do carrinho, renderizar
  if (document.getElementById('cart-items')) {
    renderCart();
  }
});

const cbBtn = document.getElementById('chat-bot-btn');
const cbBox = document.getElementById('chat-bot-box'); 

cbBtn.addEventListener('click', () => {
  if (cbBox.style.display === 'flex') {
    cbBox.style.display = "none";
  } else {
    cbBox.style.display = "flex";
  }
});

function responder(opcao) {
  const chat = document.getElementById('cbMsg');

  let resposta = '';

  switch(opcao) {
    case 'horario':
      resposta = 'Estamos abertos de segunda a sexta, das 8h às 18h, e aos sábados, das 9h às 14h.';
      break;
    case 'produtos':
      resposta = 'Oferecemos uma variedade de peças e acessórios para motos. Visite nossa seção de produtos para mais detalhes!';
      break;
    case 'servicos':
      resposta = 'Realizamos manutenção, revisão e personalização de motos. Confira nossos serviços para mais informações!';
      break;
    case 'contato':
      resposta = 'Você pode nos contatar pelo telefone (11) 9999-9999 ou pelo email contato@mmotos.com.br';
      break;
  }

  chat.innerHTML += `<div class="bot-msg">${resposta}</div>`;
}