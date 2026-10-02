# Step 1: Build the React app using Node.js
# Terminal command: npm run build
FROM node:22-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install frontend dependencies
# Docker automatically runs: npm install
RUN npm install

# Step 5: Copy the frontend source code
COPY . .

# Step 6: Create the production build
# Docker automatically runs: npm run build
RUN npm run build


# Step 7: Start a new lightweight stage using Nginx
FROM nginx:alpine

# Step 8: Copy the React production build to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Nginx uses port 80
EXPOSE 80

# Step 10: Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]


# ------------------------------------------------
# AFTER SAVING THIS FILE:
#
# Build the image:
# docker build -t task-manager-frontend .
#
# Check the image:
# docker images
#
# Run the container:
# docker run -p 3000:80 task-manager-frontend
#
# Open in browser:
# http://localhost:3000
# ------------------------------------------------