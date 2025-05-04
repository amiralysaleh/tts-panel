import os

def ensure_downloads_folder():
    os.makedirs("downloads", exist_ok=True)
