FROM ghcr.io/hugomods/hugo:latest AS builder

WORKDIR /app

COPY . .

RUN hugo --gc --minify

# --------------------------------------------

FROM nginx

COPY --from=builder /app/public /usr/share/nginx/html

EXPOSE 80