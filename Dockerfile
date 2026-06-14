# Gunakan Python langsung (React sudah di-build di lokal)
FROM python:3.11-slim
WORKDIR /app/backend

# Install libgomp1 yang dibutuhkan oleh scikit-learn
RUN apt-get update && apt-get install -y libgomp1 && rm -rf /var/lib/apt/lists/*

# Copy dataset
COPY Steel_industry.csv /app/

# Install dependensi backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code backend
COPY backend/ ./

# Copy hasil build React dari lokal (sudah di-build di komputer Anda)
COPY dashboard/dist ./static

# Expose port untuk Cloud Run
ENV PORT=8080
EXPOSE $PORT

# Jalankan Uvicorn
CMD sh -c "uvicorn main:app --host 0.0.0.0 --port $PORT"
