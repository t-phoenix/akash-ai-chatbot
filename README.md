# 🤖Akash AI Chatbot

## 🚀Introduction
Akash AI is an innovative, interactive chatbot application built with React and powered by the Akash Chat API. Designed with a user-centric approach, it provides a seamless experience across mobile and desktop devices. Akash AI integrates advanced language models to deliver human-like conversations, enabling users to ask questions, seek information, and engage in dynamic discussions on a wide array of topics.

## 🌈Key Features

1.	Smooth API Integration: Utilizing the Akash Chat API, Akash AI is capable of responding intelligently to a wide range of inquiries. The API integration ensures high-quality responses and a dynamic conversational flow. Users can also opt out from the given AI Models from Akash chat API:
    - Meta-Llama-3-1-8B-Instruct-FP8
    - Meta-Llama-3-1-405B-Instruct-FP8
    - Meta-Llama-3-2-3B-Instruct
    - nvidia-Llama-3-1-Nemotron-70B-Instruct-HF
2.	Responsive Mobile-First Design: Optimized for mobile screens, Akash AI provides a clean and engaging user interface, centered for optimal readability and accessibility.
3.	Saved Conversations: Users can save multiple chat sessions on their devices locally, allowing for quick retrieval and continuity.
4.	Dynamic Chat Interface: The ChatBoxPage component houses the core chat interface, where users can interact with the chatbot. Users can choose from their saved chat helping with quick responses, smooth updates, and a more personalized feel for each conversation.


## 🔗Links
Akash Deployment Link
```
```

Vercel Deployment
```
https://akash-ai-chatbot.vercel.app/
```

Video Link
```
```



## 🏃‍♂️How to Start 

1. Clone the repository
```
git clone https://github.com/t-phoenix/akash-ai-chatbot.git
```

2. Install node dependencies
```
yarn install
```

3. Start the frontend server
```
yarn start
```

4. Open the url in your browser, if it dosen't itself. Usually
```
http://localhost:3000/
```


## 🐳Docker

Build Image
`docker build --pull --rm -f "Dockerfile" -t akashaichatbot:latest "." --platform linux/amd64`

push image
`docker image push docker.io/abhinil/akashaichatbot:latest `

deploying on Akash

