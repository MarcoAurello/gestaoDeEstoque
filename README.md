# SENAC_TaskManager

sudo https://nodejs.org/download/release/v14.17.0/node-v14.17.0-linux-x64.tar.xz
sudo tar -C /usr/local --strip-components 1 -xvf node-v14.17.0-linux-x64.tar.xz





docker build --no-cache -t gestaodeestoque_app .
docker run --name gestaodeestoque -p 4003:4003 --restart always -d gestaodeestoque_app


