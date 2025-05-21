document.getElementById('linkForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const link = document.getElementById('linkInput').value;
    const resultado = document.getElementById('resultado');
    const t = i18n[idiomaAtual];
  
    resultado.classList.remove('oculto');
    resultado.textContent = t.validando;
    resultado.className = "resultado";
  
    // Fazer requisição para o backend
    fetch('/api/validar_link', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: link })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            if (data.resultado === 'safe') {
                resultado.textContent = t.sucesso;
                resultado.className = "resultado sucesso";
            } else {
                resultado.textContent = t.erro;
                resultado.className = "resultado erro";
            }
        } else {
            resultado.textContent = t.erro_api;
            resultado.className = "resultado erro";
            console.error('Erro na API:', data.message);
        }
    })
    .catch(error => {
        resultado.textContent = t.erro_conexao;
        resultado.className = "resultado erro";
        console.error('Erro:', error);
    });
});
  
// i18n (expandido)
const i18n = {
    pt: {
        sucesso: "✅ Link seguro!",
        erro: "🚫 Link suspeito.",
        validando: "⏳ Validando link...",
        erro_api: "❌ Erro ao validar o link.",
        erro_conexao: "❌ Erro de conexão com o servidor."
    },
    en: {
        sucesso: "✅ Safe link!",
        erro: "🚫 Suspicious link.",
        validando: "⏳ Validating link...",
        erro_api: "❌ Error validating the link.",
        erro_conexao: "❌ Server connection error."
    },
};
  
let idiomaAtual = "pt";
  
document.getElementById('langToggle').addEventListener('click', () => {
    idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
    document.getElementById('langToggle').textContent =
      idiomaAtual === "pt" ? "🌎 Mudar para inglês" : "🌎 Switch to Portuguese";
});