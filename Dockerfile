# Stage 1: Build Stage
FROM node:18-alpine AS build

WORKDIR /src/

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production Stage
FROM node:18-alpine

# Install `serve` globally
RUN yarn global add serve

# Create a directory for the application
WORKDIR /app

# Copy the build files from the build stage
COPY --from=build /src/build /app/build

# Expose port 3000
EXPOSE 3000

# Serve the build files
CMD ["serve", "-s", "build", "-l", "3000"]
