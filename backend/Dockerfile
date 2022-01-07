# Pull Docker Hub base image
ARG name=node:16.13-alpine3.14
FROM ${name}
# Set working directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
COPY .env ./ 
RUN npm install
# Copy app to container
EXPOSE 5000
# Run the "dev" script in package.json
CMD ["npm", "run", "dev"]