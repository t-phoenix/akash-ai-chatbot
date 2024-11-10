# Use an official Node.js runtime as a parent image
FROM node:20-alpine
# RUN apk add --no-cache python g++ make

# Set the working directory inside the container
WORKDIR /app

# Copy the application code to the working directory
COPY . .

# RUN apk --no-cache --virtual build-dependencies add \
#   python \
#   make \
#   g++

# Install project dependencies
RUN yarn install




# Expose the port if necessary (for example, if the bot has a web server or API)
# EXPOSE 3000 

# Define environment variables (optional, depending on the project setup)
# ENV BOT_ENV production

# Run the bot (you may need to replace 'npm start' with the actual command to start the bot)
CMD ["yarn", "start"]