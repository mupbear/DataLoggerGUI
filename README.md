# DataLoggerGUI
Ensure your git config is set to LF line endings before cloning this repo:
```
git config --global core.autocrlf false
git config --global core.eol lf
```

Composing this Docker dev enviorenment:
```
docker compose up
```

Building the Docker image:
```
docker build -t web-server-racing-data-analysis .
```

Running the Docker container through terminal:
```
docker run -it -p 8000-8001:8000-8001 web-server-racing-data-analysis
```