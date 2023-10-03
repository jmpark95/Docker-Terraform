FROM node:18-alpine as base
WORKDIR /usr/src/app/backend
EXPOSE 3000

FROM base as development
COPY package*.json ./
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
# USER node
COPY . .
CMD npm run dev

FROM base as production
ENV NODE_ENV production
COPY package*.json ./
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
# USER node
COPY . .
CMD node index.js
