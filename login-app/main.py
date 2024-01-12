from webchatapp.main import app
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import logging

logging.getLogger('passlib').setLevel(logging.ERROR)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000, reload=False)
