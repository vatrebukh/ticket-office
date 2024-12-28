# Stage 1: Build the React app
FROM node:19-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm test || exit 1
RUN npm run build || exit 1

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]