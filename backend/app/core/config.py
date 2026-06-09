from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "mysql+pymysql://root:root123@localhost:3306/travel_content_db"

    JWT_SECRET_KEY: str = "change-this-secret"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"

    MOCK_MODE: bool = True
    FRONTEND_URL: str = "http://localhost:5173"

    APP_ENV: str = "local"
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173,https://travel-content-automation-agent.onrender.com"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()