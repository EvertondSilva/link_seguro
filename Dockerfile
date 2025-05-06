FROM python:3.10-slim

# Define diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY ./app /app/app
COPY requirements.txt .
COPY .env .

# Instala dependências
RUN pip install --no-cache-dir -r requirements.txt

# Expõe porta
EXPOSE 8001

# Comando para rodar a API
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
