# Stage 1: Build the Vite frontend
FROM node:18 AS build
WORKDIR /app

# Copy only the inner actual frontend
COPY placementtracker_frontend/package*.json ./placementtracker_frontend/
WORKDIR /app/placementtracker_frontend

RUN npm install

COPY placementtracker_frontend/. ./   

RUN npm run build

# Stage 2: Serve the built app using nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
