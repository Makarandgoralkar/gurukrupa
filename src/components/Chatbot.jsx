import { useState, useRef, useEffect } from "react";
import { getBotReply } from "../ai/chatbot";
import "../styles/chatbot.css";
import { FaTimes } from "react-icons/fa";

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hi! Ask me anything about construction." }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const question = input;
    setInput("");
    setLoading(true);

    const reply = await getBotReply(question);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: reply }
      ]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="chat-overlay">
      <div className="chat-window">

        {/* HEADER */}
        <div className="chat-header">
          🤖 AI Assistant
          <FaTimes onClick={onClose} className="close-icon" />
        </div>

        {/* MESSAGES */}
        <div className="chat-body" ref={chatRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {m.text}
            </div>
          ))}

          {loading && <div className="msg bot">Typing...</div>}
        </div>

        {/* INPUT */}
        <div className="chat-footer">
          <input
            value={input}
            placeholder="Ask anything..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>

      </div>
    </div>
  );
}