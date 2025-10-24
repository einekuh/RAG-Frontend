from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import List
from pathlib import Path
import shutil

# uvicorn backend.app:app --reload --port 8000
# .\.venv\Scripts\Activate.ps1



# Zielordner = Projektverzeichnis / "uploads" (sauber getrennt)
BASE_DIR = Path(__file__).resolve().parent.parent  # .../project/
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

app = FastAPI()

# CORS für dein Frontend (5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dateien statisch ausliefern (Download/Ansehen)
app.mount("/files", StaticFiles(directory=str(UPLOAD_DIR)), name="files")

@app.post("/api/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    saved = []
    for f in files:
        dest = UPLOAD_DIR / f.filename
        with dest.open("wb") as buffer:
            shutil.copyfileobj(f.file, buffer)
        saved.append(f.filename)
    return {"saved": saved}

@app.get("/api/files")
def list_files():
    items = []
    for p in sorted(UPLOAD_DIR.iterdir()):
        if p.is_file():
            items.append({"name": p.name, "size": p.stat().st_size, "url": f"/files/{p.name}"})
    return {"files": items}
