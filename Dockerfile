# Stage 1: Build the React application
FROM node:18-alpine AS frontend-build
WORKDIR /app/dashboard
COPY dashboard/package*.json ./
RUN npm install
COPY dashboard/ ./
RUN npm run build

# Stage 2: Setup FastAPI backend and serve static files
FROM python:3.11-slim
WORKDIR /app/backend

# Copy the dataset to the parent directory (as expected by ml_models.py)
COPY Steel_industry.csv /app/

# Install python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ ./

# Copy built frontend static files from Stage 1 into the backend/static folder
COPY --from=frontend-build /app/dashboard/dist ./static

# Cloud Run sets the PORT environment variable
ENV PORT=8080
EXPOSE $PORT

# Start server
CMD sh -c "uvicorn main:app --host 0.0.0.0 --port $PORT"
