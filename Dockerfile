FROM node:24.11-alpine
RUN npm update -g npm

WORKDIR /home/node/app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
USER node
EXPOSE 3000
CMD ["npm", "start"]
