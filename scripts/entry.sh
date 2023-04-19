#!/usr/bin/env bash  

# ensures errors have high visibility
set -o errexit 
set -o pipefail 
set -o nounset  

# starts Starlite application  
echo Starting Starlite App... 
uvicorn app.app:app