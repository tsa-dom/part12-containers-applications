FROM node:16 as build

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm ci --only-production && \
    CI=true npm test && \
    npm run build

FROM nginx:1.20-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80