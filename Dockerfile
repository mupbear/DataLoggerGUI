# set base image (host OS)
FROM python:3.11-slim

# expose the used ports
EXPOSE 8000
EXPOSE 8001

# set the working directory
WORKDIR /DataLoggerGUI

# install bash
RUN apt-get update \
&& apt-get upgrade \
&& apt-get install -y --no-install-recommends bash \
&& apt-get install -y --no-install-recommends git \
&& apt-get purge -y --auto-remove \
&& rm -rf /var/lib/apt/lists/*

# copy the content of the repo to our working directory
COPY . ./

# make entry script executable
RUN chmod +x ./scripts/entry.sh

# install dependencies
RUN pip install -e .

# create a non-root user and switch to it, for security.
RUN addgroup --system --gid 1001 "app-user"
RUN adduser --system --uid 1001 "app-user"
USER "app-user"

# Make git repo usable
RUN git config --global --add safe.directory $(pwd)

# command to run on container start
ENTRYPOINT ["/bin/sh", "-c"]
CMD ["./scripts/entry.sh"]