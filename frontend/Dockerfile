# ========== STAGE 1: Build ==========
FROM node:20-alpine AS build

# Set working directory for build stage
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy all the source code into the container
# Copy source - includes angular.json and projects/examples/standalone/
COPY . .

# Build the specific project. This creates /app/dist/examples/standalone
# Use npx to call ng directly since no npm script exists for example-standalone
RUN npx ng build example-standalone --configuration production

# ========== STAGE 2: Runtime ==========
FROM nginx:alpine

# Copy ONLY the built app from the correct path
#COPY --from=build /app/dist/examples/standalone /usr/share/nginx/html
COPY --from=build /app/dist/examples/standalone/browser/. /usr/share/nginx/html


# Copy nginx config for Angular SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80