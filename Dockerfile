FROM ghcr.io/hugomods/hugo:latest AS builder

WORKDIR /app

COPY . .

RUN hugo --gc --minify

# --------------------------------------------

FROM caddy:latest

COPY --from=builder /app/public /usr/share/caddy

EXPOSE 80