# Base image
FROM node:lts-alpine

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Start the application
CMD [ "node", "app.js" ]