FROM python:3.11-slim-bookworm AS builder

WORKDIR /app

RUN pip install --upgrade pip

COPY ./requirements.txt .

RUN pip install --no-cache-dir --target="/app/deps" -r requirements.txt

FROM gcr.io/distroless/python3-debian12

WORKDIR /app

ENV PYTHONPATH=/app:/app/deps

COPY --from=builder /app/deps ./deps

COPY . .

EXPOSE 8080

CMD ["/app/deps/bin/uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8080"]