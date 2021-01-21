# [Choice] Node.js version: 14, 12, 10
ARG VARIANT="14-buster"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# Install Docker CLI / Docker-Compose and create '/usr/local/share/docker-init.sh' to proxy the
# docker socket.  (We retrieve the script from the 'docker-from-docker' dev container template)
RUN mkdir /tmp/library-scripts \
    && curl -o /tmp/library-scripts/docker-debian.sh -sS https://raw.githubusercontent.com/microsoft/vscode-dev-containers/c3214ad7fcf5086e898e3941a36e0171959a48ca/containers/azure-ansible/.devcontainer/library-scripts/docker-debian.sh \
    && /bin/bash /tmp/library-scripts/docker-debian.sh "${ENABLE_NONROOT_DOCKER}" "${SOURCE_SOCKET}" "${TARGET_SOCKET}" "node" \
    && rm -rf /tmp/library-scripts/

# [Optional] Uncomment this section to install additional OS packages.  Base image includes the following:
#
#    node:   eslint (global), node/npm, nvm, yarn, zsh (+ oh-my-zsh)
#    debian: curl, g++, git, make, procps, python, wget
#
# (See https://github.com/microsoft/vscode-dev-containers/tree/master/containers/javascript-node/.devcontainer)
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends \
#         <your-package-list-here>

# Cleanup after apt-get install:
# RUN apt-get autoremove -y \
#     && apt-get clean -y \
#     && rm -rf /var/lib/apt/lists/*
    
# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# Update NPM to the latest version and install 'yo' and 'rush' globally for convenience.
RUN sudo -u node npm install -g npm yo @microsoft/rush

# https://github.com/yeoman/yo/issues/348
RUN sed -i -e '/rootCheck/d' "/usr/local/share/npm-global/lib/node_modules/yo/lib/cli.js"

# Install our custom .bashrc for colorized prompt and 'ls'
COPY ./.bashrc /root
