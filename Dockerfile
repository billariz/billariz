# Base image avec Node.js
FROM node:18.18.2-slim

# Définir l'environnement de travail
WORKDIR /usr/src/app

# Installer les dépendances système requises par Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copier les fichiers de dépendances Node.js
COPY package*.json ./

# Installer les dépendances Node.js
RUN npm install

RUN npm cache clean --force

# Copier le reste du code de l'application
COPY . .

# Pour Puppeteer : variable d’environnement requise dans certains environnements
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false
ENV OPENSSL_CONF=/opt/openssl.cnf

# Ouvrir le port d'écoute (à adapter selon ton app)
EXPOSE 8080

# Lancement de l'application
CMD ["node", "index.js"]