"use client";
import { Container, Heading, Box, Flex } from "@radix-ui/themes";
import { FullPageChat } from "flowise-embed-react";

const Chatbot = () => {
  return (
    <Container>
      <Flex
        display={{ initial: "none", sm: "flex" }}
        className="min-h-screen"
        justify="center"
        align="center"
      >
        <Heading align="center">
          This page is not available on laptop and larger devices
        </Heading>
      </Flex>
      <Flex
        className="mb-[-80px] mt-[-60px] py-3 min-h-screen"
        display={{ sm: "none" }}
      >
        <FullPageChat
          className="border-2 border-slate-600 max-w-[400px] max-h-[90vh] rounded-md mx-auto"
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
                backgroundColor: "#fff",
                textColor: "#000",
                sendButtonColor: "#3B81F6",
              },
            },
          }}
        />
      </Flex>
    </Container>
  );
};

export default Chatbot;
