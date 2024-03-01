# Use an official Node.js image as a base
FROM node:18.13

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY src/main/java/nl/han/oose/project/presentation/frontend-app ./

# Install Angular CLI globally
RUN npm install -g @angular/cli@16.2

# Install Angular dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY src/main/java/nl/han/oose/project/presentation/frontend-app ./

# Expose the port on which the app will run
EXPOSE 4200

# Start the Angular development server
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
