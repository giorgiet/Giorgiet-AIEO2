# Giorgiet-AIEO2 - Launch Guide

This is a full-stack LLM-powered application with a FastAPI backend and a Next.js frontend. This guide will help you get the application up and running.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Python 3.12+** (or `uv` package manager which will install it automatically)
- **Node.js** (v18 or higher) and **npm**
- **OpenAI API Key** - Get one from [OpenAI's website](https://platform.openai.com/api-keys)

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Giorgiet-AIEO2
```

### 2. Backend Setup

The backend is a FastAPI application located in the `/api` directory.

#### Install `uv` (Python Package Manager)

```bash
pip install uv
```

#### Install Backend Dependencies

From the project root directory:

```bash
uv sync
```

This will:
- Create a virtual environment (`.venv/`)
- Install Python 3.12 automatically if needed
- Install all required dependencies

#### Set Environment Variables

Set your OpenAI API key as an environment variable:

**On Windows (PowerShell):**
```powershell
$env:OPENAI_API_KEY="sk-your-api-key-here"
```

**On Windows (Command Prompt):**
```cmd
set OPENAI_API_KEY=sk-your-api-key-here
```

**On Mac/Linux:**
```bash
export OPENAI_API_KEY=sk-your-api-key-here
```

Alternatively, you can create a `.env` file in the project root:

```env
OPENAI_API_KEY=sk-your-api-key-here
```

#### Start the Backend Server

From the project root directory:

```bash
uv run uvicorn api.index:app --reload
```

The backend will be available at `http://localhost:8000`

- **API Documentation**: `http://localhost:8000/docs` (Swagger UI)
- **Alternative Docs**: `http://localhost:8000/redoc` (ReDoc)

### 3. Frontend Setup

The frontend is a Next.js application located in the `/frontend-giftwizard` directory.

#### Install Frontend Dependencies

```bash
cd frontend-giftwizard
npm install
```

#### Start the Frontend Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Running the Application

To run the complete application, you need **both servers running simultaneously**:

1. **Terminal 1 - Backend:**
   ```bash
   # From project root
   uv run uvicorn api.index:app --reload
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   # From frontend-giftwizard directory
   cd frontend-giftwizard
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
Giorgiet-AIEO2/
├── api/                 # FastAPI backend
│   ├── index.py        # Main backend application
│   └── README.md       # Backend-specific documentation
├── frontend-giftwizard/ # Next.js frontend
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   └── package.json    # Frontend dependencies
├── requirements.txt    # Python dependencies (legacy)
├── pyproject.toml      # Python project configuration
└── README.md          # This file
```

## API Endpoints

### Chat Endpoint
- **URL**: `POST /api/chat`
- **Request Body**:
  ```json
  {
    "message": "Your message here"
  }
  ```
- **Response**:
  ```json
  {
    "reply": "AI response here"
  }
  ```

### Health Check
- **URL**: `GET /`
- **Response**: `{"status": "ok"}`

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

**OpenAI API Key not found:**
- Make sure you've set the `OPENAI_API_KEY` environment variable
- Verify the key is valid and has sufficient credits

**Python version issues:**
- `uv` will automatically install Python 3.12 if needed
- If you prefer manual installation, ensure Python 3.12+ is installed

### Frontend Issues

**Port 3000 already in use:**
- The Next.js dev server will automatically try the next available port
- Or manually specify a port: `npm run dev -- -p 3001`

**Module not found errors:**
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Backend connection errors:**
- Ensure the backend is running on `http://localhost:8000`
- Check that CORS is properly configured (it should be by default)

## Development

### Backend Development
- The backend runs with `--reload` flag, so it will automatically restart on code changes
- Check `api/README.md` for more backend-specific documentation

### Frontend Development
- Next.js hot-reloads automatically when you make changes
- The frontend is built with TypeScript and Tailwind CSS

## Building for Production

### Backend
The backend can be deployed as-is with `uvicorn` or any ASGI-compatible server.

### Frontend
```bash
cd frontend-giftwizard
npm run build
npm start
```

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [uv Package Manager](https://github.com/astral-sh/uv)

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the backend-specific docs in `api/README.md`
3. Ensure all prerequisites are installed correctly
4. Verify your OpenAI API key is valid and has credits

---

Happy coding! 🚀
