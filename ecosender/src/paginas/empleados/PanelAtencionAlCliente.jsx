import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const PanelAtencionAlCliente = () => {
  const [clientsWithMessages, setClientsWithMessages] = useState([]);
  const [selectedClientMessages, setSelectedClientMessages] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("timestamp", "asc")),
      (snapshot) => {
        const clients = {};

        snapshot.forEach((messageDoc) => {
          const messageData = messageDoc.data();
          const clientId = messageData.clientId;

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

        const clientsArray = Object.values(clients);
        setClientsWithMessages(clientsArray);

        // Si hay un cliente seleccionado, actualiza sus mensajes ordenados
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

  const handleClientClick = (clientId) => {
    setSelectedClientId(clientId);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const messageData = {
        text: newMessage,
        timestamp: new Date(),
        clientId: selectedClientId,
        isWorker: true, // Indica que el mensaje es del trabajador
      };

      const docRef = await addDoc(collection(db, "messages"), messageData);
      console.log("Document written with ID: ", docRef.id);
      setNewMessage("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 h-screen bg-slate-300">
        <h1>Panel de Atención al Cliente</h1>
        {clientsWithMessages.map((client) => (
          <div key={client.id}>
            <button
              className="bg-slate-200 w-full p-4"
              onClick={() => handleClientClick(client.id)}
            >
              {client.id}
            </button>
          </div>
        ))}
      </div>

      <div className="w-3/4">
        <div className="flex flex-col gap-2 p-4 overflow-y-auto">
          {selectedClientMessages.map((message) => (
            <div
              key={message.id}
              className={`p-2 rounded-lg ${
                message.isWorker
                  ? 'bg-slate-400 self-end'
                  : 'bg-slate-600 self-start'
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs text-gray-500">
                {message.timestamp && new Date(message.timestamp.seconds * 1000).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between p-4">
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