# Use an official Node.js runtime as a parent image
FROM node:16-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Puppeteer setup: Install the necessary dependencies for running headless Chromium
RUN apt-get update && apt-get install -y \
  wget \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get clean

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
