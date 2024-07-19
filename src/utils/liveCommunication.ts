import * as signalR from "@microsoft/signalr";

import { characterTrackUrl } from "../constants/api";

export const connection = new signalR.HubConnectionBuilder()
  .withUrl(characterTrackUrl, {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
    logger: signalR.LogLevel.Information,
  })
  .build();

connection.onclose(async event => {
  // TODO:
  console.log("onclose", event);
});

export async function start() {
  if (connection.state === signalR.HubConnectionState.Connected) {
    return;
  }

  try {
    await connection.start();
    console.log("SignalR Connected.");
  } catch (err) {
    console.log("error onstart", err);
  }
}
