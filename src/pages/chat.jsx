import { useState } from "react";
import { useParams } from "react-router-dom";

function Chat() {
  const { username } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    setMessages([
      ...messages,
      {
        sender: "You",
        text: input,
      },
    ]);

    setInput("");
  };

  return (
    <div>
      <h1>Chat with {username}</h1>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;