FROM oven/bun:1 as base
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build
ENTRYPOINT [ "bun", "start" ]