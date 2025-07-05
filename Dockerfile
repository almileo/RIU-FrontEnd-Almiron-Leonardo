# Etapa 1: build Angular
FROM node:20-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Nginx para servir el build
FROM nginx:alpine as production-stage

# Copiar archivos generados (HTML, JS, CSS) al servidor
COPY --from=build-stage /app/dist/RIU-Frontend-Almiron-Leonardo/browser /usr/share/nginx/html

# Copiar configuración de rutas amigables
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
