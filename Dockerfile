# Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev"]
