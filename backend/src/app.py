from   fastapi import  FastAPI , Request, Response
import os
from fastapi.middleware.cors import CORSMiddleware
from src.routers import challenge

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(challenge.router, prefix="/challenges")
