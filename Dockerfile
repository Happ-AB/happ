# Step 1: Use a Node.js base image
FROM node:18-alpine AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project to the container
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Serve the frontend with a lightweight web server (optional)
# We'll use nginx here, but you could also use something like serve if preferred.

# Step 8: Use an nginx base image to serve the build (only for production)
FROM nginx:alpine

# Copy the build output to nginx’s default html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to allow external access to the container
EXPOSE 80

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]

