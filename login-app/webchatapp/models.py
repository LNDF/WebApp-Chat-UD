from pydantic import BaseModel
from datetime import datetime

class RegisterData(BaseModel):
    username: str
    password: str

class RegisterResponse(BaseModel):
    username: str
    created_at: datetime

class LoginResponse(BaseModel):
    access_token: str
    token_type: str

class GetUsernameResponse(BaseModel):
    username: str
