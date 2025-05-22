# Dockerfile
FROM node:24

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml first (for caching)
COPY package.json pnpm-lock.yaml ./

ENV NODE_ENV=development

# Install deps with pnpm
RUN pnpm install

# Copy rest of the app
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the dev server
CMD ["pnpm", "run", "dev"]
