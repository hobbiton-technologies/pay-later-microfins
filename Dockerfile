# Fetching the latest node image on apline linux
FROM node:lts-alpine3.17 AS builder

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package.json ./
RUN yarn

# Copying all the files in our project
COPY . .

# Building our application
RUN yarn build

# Fetching the latest nginx image
FROM nginx:stable as runtime

# Copying built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
