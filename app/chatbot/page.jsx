"use client";
import { Container, Heading, Box } from "@radix-ui/themes";
import { FullPageChat } from "flowise-embed-react";

const Chatbot = () => {
  return (
    <Container>
      <Box display={{ initial: "none", sm: "initial" }}>
        <Heading align="center">
          This page is not available on laptop and larger devices
        </Heading>
      </Box>
      <Box
        className="mb-[-80px] mt-[-60px] border-2 border-blue-400 m-auto rounded-md py-3"
        maxWidth="80%"
        display={{ sm: "" }}
      >
        <FullPageChat
          className="h-80"
          chatflowid="c49b9f05-6716-4008-be59-d4a567931b35"
          apiHost="https://flowise-7kb5.onrender.com"
          theme={{
            button: {
              backgroundColor: "none",
              right: 20,
              bottom: 20,
              size: "medium",
              iconColor: "#fff",
              customIconSrc:
                "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
            },
            chatWindow: {
              welcomeMessage: "Hello! How can I assist you today?",
              backgroundColor: "none",
              fontSize: 16,
              poweredByTextColor: "#000000",
              botMessage: {
                backgroundColor: "#ffffff",
                textColor: "#303235",
                showAvatar: true,
                avatarSrc:
                  "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png",
              },
              userMessage: {
                backgroundColor: "#3B81F6",
                textColor: "#ffffff",
                showAvatar: true,
                avatarSrc:
                  "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
              },
              textInput: {
                placeholder: "Type your question",
                backgroundColor: "#000000",
                textColor: "#ffffff",
                sendButtonColor: "#3B81F6",
              },
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default Chatbot;
