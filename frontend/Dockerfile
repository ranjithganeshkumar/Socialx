# syntax=docker/dockerfile:1

# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# Runtime stage: Nginx
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

# Remove default content and copy build
RUN rm -rf ./*
COPY --from=build /app/dist .

# Copy custom nginx config for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


