FROM node:23-alpine AS node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM httpd:2.4
COPY --from=node /app/dist/crud_beadando/browser /usr/local/apache2/htdocs
