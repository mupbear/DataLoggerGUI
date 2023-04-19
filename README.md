# DataLoggerGUI
Ensure your git config is set to LF line endings:
```
git config --global core.autocrlf false
git config --global core.eol lf
```

Building the Docker image:
```
docker build -t web-server-racing-data-analysis .
```
Running the Docker container through terminal:
```
docker run -it -p 8000:8000 web-server-racing-data-analysis
```