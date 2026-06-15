    const chatBox = document.getElementById("chat-bot-box");
    const chatBtn = document.getElementById("chat-bot-btn");
    const chatArea = document.getElementById("cbMsg");

    console.log("Chat bot script loaded");

    function atualizarChat(html) {
        chatArea.style.opacity = "0";

        setTimeout(() => {
            chatArea.innerHTML = html;

            chatArea.style.animation = "none";
            chatArea.offsetHeight;
            chatArea.style.animation = "chatFade .3s ease";
            chatArea.style.opacity = "1";
        }, 100);
    }

    chatBtn.addEventListener("click", () => {
        chatBox.classList.toggle("active");
    });

    function addBot(text) {
        chatArea.innerHTML += `
            <div class="bot-message">
                ${text}
            </div>
        `;

        chatArea.scrollTop = chatArea.scrollHeight;
    }

    function addUser(text) {
        chatArea.innerHTML += `
            <div class="user-message">
                ${text}
            </div>
        `;

        chatArea.scrollTop = chatArea.scrollHeight;
    }

    function menuInicial() {
        atualizarChat(`
            <div class="bot-message">
                Olá! Como posso ajudar?
            </div>

            <button class="chat-option" onclick="produtos()">
                Produtos
            </button>

            <button class="chat-option" onclick="servicos()">
                Serviços
            </button>

            <button class="chat-option" onclick="horario()">
                Horário
            </button>

            <button class="chat-option" onclick="contato()">
                Contato
            </button>
        `);
    }

    function produtos() {
        addUser("Produtos");

        atualizarChat(`
            <div class="bot-message">
                Qual categoria deseja visualizar?
            </div>

            <button class="chat-option" onclick="detalheFrete()">
                Frete
            </button>

            <button class="chat-option" onclick="mostrarPneus()">
                Pneus
            </button>

            <button class="chat-option" onclick="mostrarOleos()">
                Óleos
            </button>

            <button class="chat-option" onclick="menuInicial()">
                Voltar
            </button>
        `);
    }

    function detalheFrete() {
        atualizarChat(`
            <div class="bot-message">
                O frete é fixo, ou seja, independete da distancia da entrega o valor é de R$ 15,00.<br>OBS:Entregamos apenas para a região de Recife e proximidades.
                <BR>NÃO RESERVAMOS PRODUTOS
                
            </div>

            <button class="chat-option" onclick="menuInicial()">
                Voltar
            </button>

            `);
    }

    function mostrarPneus() {
        atualizarChat(`
            <div class="bot-message">
                Temos pneus para diversas motos.
            </div>

            <button class="chat-option"
                onclick="window.location.href='/produtos/'">
                Ver produtos
            </button>

            <button class="chat-option"
                onclick="produtos()">
                Voltar
            </button>
        `);
    }

    function mostrarOleos() {
        atualizarChat(`
            <div class="bot-message">
                Trabalhamos com óleos Mobil e Lubrax.
            </div>

            <button class="chat-option"
                onclick="window.location.href='/produtos/'">
                Ver produtos
            </button>

            <button class="chat-option"
                onclick="produtos()">
                Voltar
            </button>
        `);
    }

    function servicos() {
        atualizarChat(`
            <div class="bot-message">
                Realizamos:
                <br>• Troca de óleo
                <br>• Revisão
                <br>• Manutenção geral
                <BR>• Entre muito mais!
                <br>OBS:agendamentos também podem ser feitos por telefone ou presencialmente.
                <br>Atendimento por ondem de chegada.
            </div>

            <button class="chat-option"
                onclick="window.location.href='/servicos/'">
                Ver serviços
            </button>

            <button class="chat-option"
                onclick="menuInicial()">
                Voltar
            </button>
        `);
    }

    function horario() {
        atualizarChat(`
            <div class="bot-message">
                Segunda a Sexta: 8h às 18h
                <br>
                Sábado: 8h às 14h
                <br>
                Domingo e Feriados: Fechado
                <br>
                Atendimento por ondem de chegada.

            </div>

            <button class="chat-option"
                onclick="menuInicial()">
                Voltar
            </button>
        `);
    }

    function contato() {
        atualizarChat(`
            <div class="bot-message">
                📞 (11) 99999-9999
                <br>
                ✉️ contato@mmotos.com.br
            </div>

            <button class="chat-option"
                onclick="menuInicial()">
                Voltar
            </button>
        `);
    }

    menuInicial();