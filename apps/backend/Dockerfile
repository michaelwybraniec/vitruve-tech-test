# Stage 1: Build the app
FROM node:18.18.0 AS builder

WORKDIR /app

# Copy only the files needed for installing dependencies
COPY package.json yarn.lock ./
COPY nx.json tsconfig.base.json ./
COPY apps/backend/prisma ./prisma

# Copy the entire monorepo but ignore unnecessary files with .dockerignore
COPY . .

# Install dependencies without running post-install scripts
RUN yarn install --frozen-lockfile --network-timeout 600000 --ignore-scripts

# Generate Prisma client
RUN yarn prisma generate --schema=./prisma/schema.prisma

# Build the backend app
RUN yarn nx build backend --prod

# Stage 2: Run the app
FROM node:18.18.0-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl postgresql-client 

# Copy necessary files from builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/apps/backend ./apps/backend
COPY --from=builder /app/dist ./dist

# Set environment variables for production
ENV NODE_ENV=production

# Add ARG for DATABASE_URL
ARG DATABASE_URL
# Set the DATABASE_URL as an environment variable for the container
ENV DATABASE_URL=${DATABASE_URL}

# Expose the port the app runs on
EXPOSE 3000

# Start the backend
CMD ["node", "dist/apps/backend/main.js"]