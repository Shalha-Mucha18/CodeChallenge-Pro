if __package__ is None or __package__ == "":
    import sys
    from pathlib import Path

    # Allow running this file directly from the src directory.
    sys.path.append(str(Path(__file__).resolve().parents[1]))

from src.app import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
