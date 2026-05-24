import { useState } from "react";
import "./Chatbot.css";
import chatbotIcon from "../assets/chatbot-icon.png";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I’m your AI Zakat Assistant 🤖. I can analyze your zakat and give recommendations.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

 const getBotReply = (msg) => {
  msg = msg.toLowerCase();

  if (msg.includes("zakat"))
    return "Zakat is an obligation for Muslims who meet the nisab.";

  if (msg.includes("nisab"))
    return "Nisab is the minimum wealth required before zakat is due.";

  if (msg.includes("2.5"))
    return "Zakat rate is typically 2.5% of eligible wealth.";

  if (msg.includes("profit"))
    return "Zakat is calculated based on net profit or working capital.";

  if (msg.includes("how"))
    return "You can calculate zakat using the calculator in this system.";

  return "I'm your AI Zakat Assistant 🤖. Try asking about zakat, nisab, or calculation.";
};

  const sendMessage = () => {
    if (!input) return;

    const userMsg = { text: input, sender: "user" };
    const botMsg = { text: getBotReply(input), sender: "bot" };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* 🔥 FLOATING ICON */}
      {!isOpen && (
        <div className="chatbot-floating" onClick={() => setIsOpen(true)}>
          <img src={chatbotIcon} alt="chatbot" />
        </div>
      )}

      {/* 🔥 CHAT WINDOW */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            Zakat Assistant
            <span onClick={() => setIsOpen(false)}>✖</span>
          </div>

          <div className="chatbot-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about zakat..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;