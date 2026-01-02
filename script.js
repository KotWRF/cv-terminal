// Функция для копирования почты
function copyEmail() {
    const emailText = document.getElementById('myEmail').innerText;
    navigator.clipboard.writeText(emailText).then(() => {
        const status = document.getElementById('copyStatus');
        status.style.opacity = '1';
        setTimeout(() => { status.style.opacity = '0'; }, 2000);
    });
}

// Функция для копирования телеграма
function copyTelegram() {
    const tgText = document.getElementById('myTelegram').innerText;
    navigator.clipboard.writeText(tgText).then(() => {
        const status = document.getElementById('copyStatusTG');
        status.style.opacity = '1';
        setTimeout(() => { status.style.opacity = '0'; }, 2000);
    });
}

// Эффект "Фонарика" за мышкой
window.addEventListener('mousemove', e => {
    document.body.style.setProperty('--x', e.clientX + 'px');
    document.body.style.setProperty('--y', e.clientY + 'px');
});



// Матрица
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let frameCount = 0; // Счётчик кадров

let fontSize = 75;
let columns = 0;
let drops = [];

function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100; // Разброс, чтобы не все сразу летели сверху
    }
}

const symbols = "  あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ  アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ  0  1  2  3  4  5  6  7  8  9 ABCDEFGHIJKLMNOPQRSTUVWXYZ ";

function draw() {
    frameCount++;

    // Каждые 60 кадров (примерно раз в секунду-полторы)
    // Мы полностью "моем" экран черным цветом без прозрачности
    if (frameCount % 100 === 0) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#1a1a1a"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        frameCount = 0; // Сбрасываем, чтобы не росло до бесконечности
    } else {
        // В остальное время — обычный шлейф
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(26, 26, 26, 0.15)"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }


    ctx.fillStyle = "#5777b3ff"; // Цвет
    ctx.font = "bold " + fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
    let text;
    const isGold = Math.floor(Math.random() * 200) === 1;
    const isRed = Math.floor(Math.random() * 200) === 2;

    if (isGold) {
        // Золотой символ: пусть это будет "A" или твои "KotWRF"
        const goldSymbols = "KotWRF"; 
        text = goldSymbols.charAt(Math.floor(Math.random() * goldSymbols.length));
        
        ctx.fillStyle = "#FFD700";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#FFD700";
    } else if (isRed) {
        // Красный символ: знаки опасности
        const dangerSymbols = "☠⚠☣☢✖✕";
        text = dangerSymbols.charAt(Math.floor(Math.random() * dangerSymbols.length));
        
        ctx.fillStyle = "#ff0000";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff0000";
    } else {
        // Обычный синий фон
        text = symbols.charAt(Math.floor(Math.random() * symbols.length));
        ctx.fillStyle = "#569cd6";
        ctx.shadowBlur = 0;
    }

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Возврат колонки наверх
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
        drops[i] = 0;
    }
    drops[i]++;
}

}


// Инициализация и запуск
initMatrix();
setInterval(draw, 75);

// Исправляем ресайз: теперь матрица всегда на весь экран
window.addEventListener('resize', () => {
    initMatrix();
});


// LVL
function updateAge() {
    const birthDate = new Date('1997-08-25');
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Проверяем, был ли уже день рождения в этом году
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    const ageElement = document.getElementById('age-comment');
    if (ageElement) {
        // Обновляем текст, сохраняя твой стиль комментария
        ageElement.innerText = `// (${age}LvL)`;
    }
}

// Запускаем сразу при загрузке страницы
updateAge();




async function animateTyping() {
    const lines = document.querySelectorAll('.line');
    
    // НАСТРОЙКИ СКОРОСТИ (в миллисекундах)
    const speeds = {
        code: 2,       // Скорость печати кода
        comment: 10,    // Комментарии пишутся медленнее
        linePause: 10  // Пауза между строками
    };

    for (let line of lines) {
        if (line.classList.contains('i1') || line.classList.contains('i2') || line.classList.contains('i4')) {
            const fullContent = line.innerHTML;
            line.innerHTML = ''; 
            line.style.opacity = '1';

            let isInsideTag = false;
            let isInsideComment = false;

            for (let i = 0; i <= fullContent.length; i++) {
                const currentChar = fullContent[i];

                // Проверка: не зашли ли мы в тег или комментарий
                if (currentChar === '<') isInsideTag = true;
                if (fullContent.substring(i, i + 22).includes('class="comment"')) isInsideComment = true;

                if (isInsideTag) {
                    if (currentChar === '>') isInsideTag = false;
                    continue; // Теги проглатываем мгновенно, чтобы не ломать верстку
                }

                line.innerHTML = fullContent.substring(0, i) + '<span class="cursor">|</span>';

                // РЕГУЛИРОВКА СКОРОСТИ:
                let currentDelay = isInsideComment ? speeds.comment : speeds.code;
                
                // Рандомный "человеческий" фактор (±5мс к скорости)
                const humanFactor = Math.random() * 3; 
                
                await new Promise(res => setTimeout(res, currentDelay + humanFactor));
            }

            line.innerHTML = fullContent; 
            await new Promise(res => setTimeout(res, speeds.linePause));
        } else {
            // Строки i3, i4, i5 просто плавно проявляются
            line.style.opacity = '1';
        }
    }
}

animateTyping()
