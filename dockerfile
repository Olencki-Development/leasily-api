# Pull in the latest image for node
FROM node:12.14.0

# Define the working directory
WORKDIR /usr/app

# Copy package and package lock
COPY package*.json ./

# Install node dependencies
RUN npm install

# Build typescript to javascript
RUN npm run build

# Put all files in the current directory into the workdir of the image
COPY . .

# The command the container will run
CMD npm start
