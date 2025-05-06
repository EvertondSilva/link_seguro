document.getElementById('linkForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const link = document.getElementById('linkInput').value;
    const resultado = document.getElementById('resultado');
    const t = i18n[idiomaAtual];
  
    resultado.classList.remove('oculto');
    resultado.textContent = t.validando;
    resultado.className = "resultado";
  
    // Simulação de validação local
    setTimeout(() => {
      if (link.includes("seguro")) {
        resultado.textContent = t.sucesso;
        resultado.className = "resultado sucesso";
      } else {
        resultado.textContent = t.erro;
        resultado.className = "resultado erro";
      }
    }, 1000);
  });
  
  // i18n (mantido)
  const i18n = {
    pt: {
      sucesso: "✅ Link seguro!",
      erro: "🚫 Link suspeito.",
      validando: "⏳ Validando link..."
    },
    en: {
      sucesso: "✅ Safe link!",
      erro: "🚫 Suspicious link.",
      validando: "⏳ Validating link..."
    },
  };
  
  let idiomaAtual = "pt";
  
  document.getElementById('langToggle').addEventListener('click', () => {
    idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
    document.getElementById('langToggle').textContent =
      idiomaAtual === "pt" ? "🌎 Mudar para inglês" : "🌎 Switch to Portuguese";
  });