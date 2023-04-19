# set base image (host OS)
FROM python:3.11-slim

# set the working directory in the container
WORKDIR /DataLoggerGUI

# copy the content of the repo to our working directory
COPY . ./

# install bash
RUN apt-get update && apt-get upgrade && apt-get install bash

# make entry script executable
RUN chmod +x ./scripts/entry.sh

# install dependencies
RUN pip install -e .

# create a non-root user and switch to it, for security.
RUN addgroup --system --gid 1001 "app-user"
RUN adduser --system --uid 1001 "app-user"
USER "app-user"

# command to run on container start
ENTRYPOINT ["/bin/sh", "-c"]
CMD ["./scripts/entry.sh"]