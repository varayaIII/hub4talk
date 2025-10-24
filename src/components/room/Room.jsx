import React, { useEffect } from "react";
import { joinAgora, leaveAgora } from "../services/agora";

const appId = "TU_APP_ID";
const token = "TU_TOKEN_TEMPORAL";
const channel = "testroom";

export default function Room() {
  useEffect(() => {
    joinAgora(appId, channel, token, null);
    return () => leaveAgora();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Sala de conversación</h1>
      <p>Conectado a Agora - Canal: {channel}</p>
      <div id="local-player" className="mt-4"></div>
    </div>
  );
}
