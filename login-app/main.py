from webchatapp.main import app
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=4000, reload=False)
