# Stage 1: Install dependencies
FROM node:20.15.0 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you use Yarn)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
# RUN npm run build

# Stage 2: Create production image
FROM node:20.15.0-alpine AS production

# Set working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app .

# Expose port (replace with the port your app uses, e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
