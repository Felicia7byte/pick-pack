import { useRef } from "react";
import { FiArrowUp } from 'react-icons/fi'
import { Chat } from "../types/Chat";

type ChatFormProps = {
  setChatHistory: React.Dispatch<React.SetStateAction<Chat[]>>;
  generateBotResponse: (message: string) => void;
};

const ChatForm = ({setChatHistory, generateBotResponse}: ChatFormProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userMessage = inputRef.current!.value.trim();
        if(!userMessage) return;
        if (inputRef.current) {
            inputRef.current.value = "";
        }

        setChatHistory((history) => [...history, { role : "user", text: userMessage }]);

        setTimeout(() => {
            setChatHistory((history) => [...history, { role : "assistant", text: "。。。" }]);
            generateBotResponse(userMessage);
        }, 300);
    }

    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required/>
            <button className="icon-arrow">< FiArrowUp /></button>
          </form>
    )
}

export default ChatForm;