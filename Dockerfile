FROM node:21.6.1

WORKDIR /app

RUN npm install -g pnpm@8.15.3

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD pnpm run dev
