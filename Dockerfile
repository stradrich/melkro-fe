# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .
COPY server.js .


# Build the Vue.js application
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000


# Command to run the application
CMD ["npm", "run", "start"]
