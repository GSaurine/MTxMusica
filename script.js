// Acessibilidade: alto contraste e tamanho da fonte (usado em todas as páginas)
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
    const isContrast = document.body.classList.contains('high-contrast');
    try { localStorage.setItem('highContrast', isContrast); } catch (e) {}
}

function changeFontSize(action) {
    const body = document.body;
    if (action === 'increase') {
        if (body.classList.contains('font-large')) {
            body.classList.remove('font-large');
            body.classList.add('font-xlarge');
        } else if (!body.classList.contains('font-xlarge')) {
            body.classList.add('font-large');
        }
    } else {
        if (body.classList.contains('font-xlarge')) {
            body.classList.remove('font-xlarge');
            body.classList.add('font-large');
        } else {
            body.classList.remove('font-large');
        }
    }
}

try {
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
} catch (e) {}

// Páginas das músicas: botão "Compartilhar" (usa o menu do celular; no computador, copia o link)
document.querySelectorAll('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', function () {
        const data = { title: document.title, url: location.href };
        if (navigator.share) {
            navigator.share(data).catch(function () {});
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(location.href).then(function () {
                const label = btn.querySelector('span');
                const original = label.textContent;
                label.textContent = 'Link copiado!';
                setTimeout(function () { label.textContent = original; }, 2000);
            });
        }
    });
});
