from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Adicionar CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique a origem exata
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LinkRequest(BaseModel):
    url: str


VIRUSTOTAL_API_KEY = os.getenv("VT_API_KEY")
VT_API_URL = "https://www.virustotal.com/api/v3/urls"


def analisar_url_virustotal(url):
    headers_post = {"accept": "application/json", "x-apikey": VIRUSTOTAL_API_KEY}
    headers_get = {"accept": "application/json", "x-apikey": VIRUSTOTAL_API_KEY}

    # Envia a URL para análise
    response = requests.post(VT_API_URL, headers=headers_post, data={"url": url})

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code, detail="Erro ao enviar URL para análise."
        )

    url_id = response.json()["data"]["links"]["self"]

    # Consulta o resultado da análise
    result = requests.get(f"{url_id}", headers=headers_get)

    if result.status_code != 200:
        raise HTTPException(
            status_code=result.status_code, detail="Erro ao obter resultado da análise."
        )

    data = result.json()
    stats = data["data"]["attributes"]["stats"]["malicious"]

    print(stats)
    if stats != 0:
        return "malicious"
    else:
        return "safe"


@app.post("/validar_link")
def validar_link(link: LinkRequest):
    try:
        resultado = analisar_url_virustotal(link.url)
        return {"resultado": resultado, "status": "success"}
    except Exception as e:
        return {"resultado": "error", "status": "error", "message": str(e)}
