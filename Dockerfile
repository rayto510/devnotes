FROM node:20

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy everything else
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Run dev server
CMD ["pnpm", "dev"]
