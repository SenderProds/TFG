import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import axios from "axios";

const PanelAtencionAlCliente = () => {
  const [clientsWithMessages, setClientsWithMessages] = useState([]);
  const [selectedClientMessages, setSelectedClientMessages] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [clientsData, setClientsData] = useState({});

  useEffect(() => {
    const fetchClientsData = async (clientIds) => {
      const data = {};
      for (const id of clientIds) {
        const datosCliente = await obtenerDatosUsuario(id);
        if (datosCliente) {
          data[id] = datosCliente;
        }
      }
      setClientsData(data);
    };

    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("timestamp", "asc")),
      (snapshot) => {
        const clients = {};
        const clientIds = new Set();

        snapshot.forEach((messageDoc) => {
          const messageData = messageDoc.data();
          const clientId = messageData.clientId;

          clientIds.add(clientId);

          if (!clients[clientId]) {
            clients[clientId] = {
              id: clientId,
              messages: [],
            };
          }

          clients[clientId].messages.push({
            id: messageDoc.id,
            ...messageData,
          });
        });

        fetchClientsData(Array.from(clientIds));

        const clientsArray = Object.values(clients);
        setClientsWithMessages(clientsArray);

        if (selectedClientId) {
          const selectedClient = clientsArray.find(
            (client) => client.id === selectedClientId
          );
          if (selectedClient) {
            const sortedMessages = selectedClient.messages.sort(
              (a, b) => a.timestamp - b.timestamp
            );
            setSelectedClientMessages(sortedMessages);
          }
        }
      }
    );

    return () => unsubscribe();
  }, [selectedClientId]);

  const obtenerDatosUsuario = async (idCliente) => {
    const url = `https://ecosender.es/api2/public/api/v1/obtenerDatosUsuario?id=${idCliente}`;

    try {
      const respuesta = await axios.get(url);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al obtener los datos del usuario ${idCliente}:`, error);
      return null;
    }
  };

  const handleClientClick = (clientId) => {
    setSelectedClientId(clientId);
  };

  const handleCloseChat = () => {
    setSelectedClientId(null);
    setSelectedClientMessages([]);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !selectedClientId) return;

    try {
      const messageData = {
        text: newMessage,
        timestamp: new Date(),
        clientId: selectedClientId,
        isWorker: true,
      };

      const docRef = await addDoc(collection(db, "messages"), messageData);

      setNewMessage("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/4 h-full bg-slate-300 overflow-y-auto">
        <h1 className="p-4 text-lg font-bold">Panel de Atención al Cliente</h1>
        {clientsWithMessages.map((client) => (
          <div key={client.id}>
            <button
              className={`bg-slate-200 w-full p-4 ${
                selectedClientId === client.id ? "bg-gray-300" : ""
              }`}
              onClick={() => handleClientClick(client.id)}
            >
              <div className="flex items-center gap-4">
                {clientsData[client.id]?.imagen && (
                  <img
                    src={clientsData[client.id].imagen}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <span>{clientsData[client.id]?.nombreUsuario || client.id}</span>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="w-full md:w-3/4 h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {clientsData[selectedClientId]?.imagen && (
              <img
                src={clientsData[selectedClientId].imagen}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
            )}
            <h2 className="text-xl font-semibold">
              {clientsData[selectedClientId]?.nombreUsuario || "Selecciona un cliente"}
            </h2>
          </div>
          {selectedClientId && (
            <button
              onClick={handleCloseChat}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Cerrar Chat
            </button>
          )}
        </div>
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
          {selectedClientMessages.map((message) => (
            <div
              key={message.id}
              className={`p-2 rounded-lg ${
                message.isWorker ? "bg-slate-400 self-end" : "bg-slate-600 self-start"
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs text-gray-500">
                {message.timestamp &&
                  new Date(message.timestamp.seconds * 1000).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between p-4 border-t border-gray-200">
          <input
            type="text"
            className="flex-1 mr-2 p-2 border border-gray-300 rounded-md"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSendMessage}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanelAtencionAlCliente;
