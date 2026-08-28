import { useEffect, useState, useRef } from "react";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { IoMdChatbubbles } from 'react-icons/io'
import { Chat } from "../types/Chat";
import Logo from "../assets/logo.png"

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [showChatbot, setShowChatBot] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const generateBotResponse = async (message: string) => {
    const updateHistory = (text: string) => {
      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== "。。。"),
        {
          role: "assistant",
          text
        }
      ]);
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message
            })
        }
      );

      const data = await response.json();
      console.log(data);
      
      if (!response.ok) {
        throw new Error(data.message || "Server error");
      }

      updateHistory(data.answer);

    } catch(error) {
      if(error instanceof Error) {
        updateHistory(error.message);
      }
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button className="icon-button" onClick={() => setShowChatBot(prev => !prev)} id="chatbot-toggler">
        < IoMdChatbubbles />
      </button>

      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            {/* <ChatbotIcon /> */}
            <img src={Logo} alt="" />
            <h2 className="logo-text">ChatBot</h2>
          </div>
        </div>

        {/* Chatbot Body */}
        <div className="chat-body" ref={chatBodyRef}>
          <div className="message bot-message">
          </div>

          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key = {index} chat = {chat}/>
          ))}
        </div>

        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>
      </div>
    </div>
  )
}

export default Chatbot;