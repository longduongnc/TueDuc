# server/Dockerfile
# Use Node.js base image for the backend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the backend source code
COPY . .

# Expose port 5000 for the Express server
EXPOSE 5000

# Start the Express server
CMD ["npm", "start"]
