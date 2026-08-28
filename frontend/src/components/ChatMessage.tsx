import Logo from "../assets/logo.png"
import { Chat } from "../types/Chat";

type ChatMessageProps = {
    chat: Chat;
};

const ChatMessage = ({chat}: ChatMessageProps) => {
    return (
        !chat.hideInChat && (
        <div className={`message ${chat.role === "assistant" ? 'bot' : 'user'}-message`}>
            {chat.role === "assistant" && (<img src={Logo} alt="" />)}
            <p className="message-text">{chat.text}</p>
        </div>
        )
    );
};

export default ChatMessage;