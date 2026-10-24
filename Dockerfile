# --- ЭТАП СБОРКИ ---
FROM node:20-alpine AS build

WORKDIR /app

# Копируем только файлы зависимостей (для кэширования слоев)
COPY package*.json ./
RUN npm ci

# Копируем исходники и собираем
COPY . .
RUN npm run build

# --- ЭТАП РАЗДАЧИ (NGINX) ---
FROM nginx:stable-alpine

# ВАЖНО: Если у тебя Vite, замени build на dist. 
# Если у тебя старый Create React App, оставь build.
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфиг (убедись, что файл nginx.conf лежит рядом с Dockerfile)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
