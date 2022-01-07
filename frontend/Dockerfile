# Pull Docker Hub base image
FROM node:16.7-alpine3.14
# Set working directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Copy app to container
EXPOSE 3000
# Run the "dev" script in package.json
CMD ["npm", "start"]