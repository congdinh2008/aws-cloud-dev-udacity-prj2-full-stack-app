# Use the official Node.js image as the base image
FROM node:18-alpine as build-stage

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

FROM node:18-alpine as prod-stage
# Copy node modules and build directory
COPY --from=build-stage ./node_modules ./node_modules
COPY --from=build-stage /dist /dist
RUN ls
# Install pm2 package
RUN npm install pm2 -g

# Expose the port your Node.js application listens on
EXPOSE 3000
CMD ["pm2-runtime","dist/app.js"]