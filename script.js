document.addEventListener('DOMContentLoaded', function() {
    const simBtn = document.getElementById('sim-btn');
    const naoBtn = document.getElementById('nao-btn');
    const celebration = document.getElementById('celebration');
    const closeBtn = document.getElementById('close-btn');
    
    let naoClickCount = 0;
    let isNaoMoving = false; // Flag para controlar quando o botão está se movendo
    
    const naoTexts = [
        'NÃO 😢',
        'Tem certeza? 🤔',
        'Pensa melhor! 😅',
        'Vai, aceita! 😊',
        'Última chance! 😘',
        'Impossível! 💕'
    ];

    // Configurar o botão "NÃO" para fugir do mouse/toque
    naoBtn.addEventListener('mouseover', function() {
        if (!isNaoMoving) {
            moveNaoButton();
        }
    });
    
    // Para dispositivos touch (celular/tablet)
    naoBtn.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Previne o comportamento padrão
        if (!isNaoMoving) {
            moveNaoButton();
        }
    });
    
    // Adiciona evento de mouse down para celulares que simulam mouse
    naoBtn.addEventListener('mousedown', function(e) {
        e.preventDefault();
        if (!isNaoMoving) {
            moveNaoButton();
        }
    });
    
    // Se conseguirem clicar no "NÃO"
    naoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        naoClickCount++;
        
        if (naoClickCount < naoTexts.length) {
            naoBtn.textContent = naoTexts[naoClickCount];
        }
        
        moveNaoButton();
        
        // Adiciona um pequeno tremor no botão
        naoBtn.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            naoBtn.style.animation = '';
        }, 500);
    });

    function moveNaoButton() {
        isNaoMoving = true;
        
        // Se o botão ainda não está em posição fixa, torna ele fixo primeiro
        if (naoBtn.style.position !== 'fixed') {
            naoBtn.style.position = 'fixed';
            naoBtn.style.zIndex = '1000';
        }
        
        // Pega as dimensões atuais do card e do botão
        const card = document.querySelector('.card');
        const cardRect = card.getBoundingClientRect();
        const btnRect = naoBtn.getBoundingClientRect();
        
        // Ajusta margem baseada no tamanho da tela (menor para celular)
        const isMobile = window.innerWidth < 600;
        const margin = isMobile ? 10 : 15;
        const topOffset = isMobile ? 80 : 100; // Menos espaço no topo para celular
        
        // Calcula os limites DENTRO do card
        const minX = cardRect.left + margin;
        const maxX = cardRect.right - btnRect.width - margin;
        const minY = cardRect.top + margin + topOffset;
        const maxY = cardRect.bottom - btnRect.height - margin;
        
        // Garante que os valores sejam válidos (caso o card seja muito pequeno)
        const safeMinX = Math.max(minX, cardRect.left + 5);
        const safeMaxX = Math.max(safeMinX + (isMobile ? 30 : 50), maxX);
        const safeMinY = Math.max(minY, cardRect.top + (isMobile ? 100 : 120));
        const safeMaxY = Math.max(safeMinY + 20, maxY);
        
        // Gera posição aleatória DENTRO desses limites
        const randomX = safeMinX + Math.random() * (safeMaxX - safeMinX);
        const randomY = safeMinY + Math.random() * (safeMaxY - safeMinY);
        
        // Move o botão para a nova posição
        naoBtn.style.left = randomX + 'px';
        naoBtn.style.top = randomY + 'px';
        
        // Adiciona uma pequena rotação aleatória (menor em celular)
        const maxRotation = isMobile ? 10 : 15;
        const rotation = (Math.random() - 0.5) * maxRotation;
        naoBtn.style.transform = `rotate(${rotation}deg)`;
        
        // Libera a flag após um pequeno delay (mais rápido no celular)
        setTimeout(() => {
            isNaoMoving = false;
        }, isMobile ? 200 : 300);
    }

    // Quando clicar no "SIM"
    simBtn.addEventListener('click', function() {
        celebration.classList.remove('hidden');
        
        // Cria confetes
        createConfetti();
        
        // Adiciona efeito de zoom no card
        document.querySelector('.card').style.transform = 'scale(0.8)';
        document.querySelector('.card').style.opacity = '0.3';
    });

    // Fechar o modal
    closeBtn.addEventListener('click', function() {
        celebration.classList.add('hidden');
        
        // Restaura o card
        document.querySelector('.card').style.transform = 'scale(1)';
        document.querySelector('.card').style.opacity = '1';
        
        // Restaura o botão NÃO para a posição original
        naoBtn.style.position = 'static';
        naoBtn.style.left = 'auto';
        naoBtn.style.top = 'auto';
        naoBtn.style.transform = 'none';
        naoBtn.style.zIndex = 'auto';
        naoBtn.textContent = 'NÃO 😢';
        naoClickCount = 0;
        isNaoMoving = false;
    });

    // Função para criar confetes
    function createConfetti() {
        const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 30);
        }
    }

    function createConfettiPiece(color) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 8 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '999';
        confetti.style.opacity = '0.8';
        
        document.body.appendChild(confetti);
        
        // Animação de queda
        const fallSpeed = Math.random() * 3 + 2;
        const swayAmount = Math.random() * 100 + 50;
        const rotationSpeed = Math.random() * 360;
        
        let pos = -10;
        let sway = 0;
        let rotation = 0;
        
        const animation = setInterval(() => {
            pos += fallSpeed;
            sway += 0.1;
            rotation += rotationSpeed * 0.01;
            
            confetti.style.top = pos + 'px';
            confetti.style.left = (parseFloat(confetti.style.left) + Math.sin(sway) * 2) + 'px';
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            if (pos > window.innerHeight + 20) {
                clearInterval(animation);
                confetti.remove();
            }
        }, 16);
    }

    // Adiciona CSS para animação de tremor e transições
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(-5px) rotate(-5deg); }
            75% { transform: translateX(5px) rotate(5deg); }
        }
        
        #nao-btn {
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        #nao-btn:hover {
            transition: all 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Easter egg: se clicar 10 vezes no título
    let titleClickCount = 0;
    document.querySelector('h1').addEventListener('click', function() {
        titleClickCount++;
        if (titleClickCount >= 10) {
            alert('🎉 Easter Egg! Você descobriu o segredo! Lucia é muito especial! 🎉');
            titleClickCount = 0;
        }
    });
});
