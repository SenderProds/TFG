import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [clientId, setClientId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const obtenerIdCliente = async () => {
      const url = "https://ecosender.es/api2/public/api/v1/obtenerIdUsuario";
      const jwt = localStorage.getItem("sesion");
      const googleId = localStorage.getItem("googleId");

      let data = {};
      if (jwt) {
        data = {
          jwt: jwt,
        };
      } else if (googleId) {
        data = {
          googleId: googleId,
        };
      }

      try {
        const response = await axios.post(url, data);
        return response.data;
      } catch (error) {
        console.error("Error al obtener el ID del cliente:", error);
        return null;
      }
    };

    const obtenerId = async () => {
      const idCliente = await obtenerIdCliente();
      setClientId(idCliente);
    };

    obtenerId();
  }, []);

  useEffect(() => {
    if (!clientId) return;

    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("timestamp", "asc")),
      (snapshot) => {
        const allMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredMessages = allMessages.filter(
          (message) => message.clientId === clientId
        );
        setMessages(filteredMessages);
      }
    );

    return () => unsubscribe();
  }, [clientId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "" || !clientId) return;

    try {
      await addDoc(collection(db, "messages"), {
        clientId: clientId,
        text: newMessage,
        timestamp: serverTimestamp(),
        isWorker: false,
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp || !timestamp.seconds) {
      return "";
    }

    const date = new Date(timestamp.seconds * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    return formattedTime;
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-gray-100">
      <div className="overflow-y-auto flex-grow px-4 py-8">
        <div className="flex flex-col space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-xs rounded-lg shadow-md p-3 ${
                message.isWorker ? "bg-gray-200" : "bg-blue-200"
              } ${message.isWorker ? "self-start" : "self-end"}`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs text-gray-500">
                {formatTime(message.timestamp)}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-gray-100 sticky bottom-0 w-full"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
