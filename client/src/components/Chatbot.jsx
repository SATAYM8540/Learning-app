import { useState } from "react";
import api from "../api/axios";
import "./chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi, I'm CodingSikho AI Tutor. Ask any coding doubt!" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const { data } = await api.post("/chat/ask", { message: userMsg.text });

      const botMsg = { sender: "bot", text: data.message };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      setMessages(prev => [...prev, {
        sender: "bot",
        text: "⚠ Something went wrong. Try again later."
      }]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="chat-btn" onClick={() => setIsOpen(!isOpen)}>
        💬
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            CodingSikho AI
            <span className="close-btn" onClick={() => setIsOpen(false)}>✖</span>
          </div>

          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask your coding doubt..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
