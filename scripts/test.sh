#!/usr/bin/env bash  

# ensures errors have high visibility
set -o errexit 
set -o pipefail 
set -o nounset  

# starts Starlite application  
echo Starting Starlite Testing App on port 8001... 
uvicorn --host 0.0.0.0 --port 8001 app.app:app