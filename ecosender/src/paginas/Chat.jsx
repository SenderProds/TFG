import { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { obtenerIdCliente } from "../utilidades/cliente";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [clientId, setClientId] = useState(null); // Estado para almacenar el ID del cliente
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!clientId) return;

    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("timestamp", "asc")),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    );

    return () => unsubscribe();
  }, [clientId]);

  useEffect(() => {
    const obtenerId = async () => {
      let sesion = localStorage.getItem("sesion");
      const idCliente = await obtenerIdCliente(sesion);
      setClientId(idCliente); // Guarda el ID del cliente en el estado local
    };

    obtenerId();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "" || !clientId) return;

    await addDoc(collection(db, "messages"), {
      clientId: clientId,
      text: newMessage,
      timestamp: serverTimestamp(),
      isWorker: false, // Indica que el mensaje es del cliente
    });

    setNewMessage("");
  };

  // Función para formatear la hora
  const formatTime = (timestamp) => {
    if (!timestamp || !timestamp.seconds) {
      return ""; // Retorna una cadena vacía si no hay timestamp o si no tiene la propiedad seconds
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
      <form onSubmit={handleSendMessage} className="p-4">
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
