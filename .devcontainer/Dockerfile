# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.134.1/containers/typescript-node/.devcontainer/base.Dockerfile
ARG VARIANT="12"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

RUN sudo -u node npm install -g npm yo @microsoft/rush

# https://github.com/yeoman/yo/issues/348
RUN sed -i -e '/rootCheck/d' "/usr/local/share/npm-global/lib/node_modules/yo/lib/cli.js"
