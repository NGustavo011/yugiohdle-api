FROM oven/bun:1 as base
WORKDIR /app
COPY . .
RUN bun install --production
RUN bun run build
ENTRYPOINT [ "bun", "start:migration" ]