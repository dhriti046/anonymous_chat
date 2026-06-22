import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";

const socket = io("http://localhost:3001");

function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );
  console.log("Current User:", currentUser);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    const messageData = {
      sender: currentUser.username,
      text: input,
    };

    socket.emit("send_message", messageData);

    setInput("");
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    if (currentUser?._id) {
      console.log("Registering:", currentUser._id);

      socket.emit("register", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <div>
      <h1>Chat</h1>

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