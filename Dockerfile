# ---------------------
# Build Stage
# ---------------------
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the Vite app
RUN npm run build
    
    
# ---------------------
# Production Stage
# ---------------------
FROM nginx:stable-alpine AS production

# Copy build output (Vite = dist/, CRA = build/)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config (optional, only if you have one)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
