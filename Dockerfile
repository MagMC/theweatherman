# Use an official Node runtime as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose a port (if your app runs on a specific port)
EXPOSE 3000

# Define the command to run your app using npm start or the command that starts your app
CMD ["npm", "start"]
