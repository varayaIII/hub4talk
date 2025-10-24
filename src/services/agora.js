import AgoraRTC from "agora-rtc-sdk-ng";

let client;
let localAudioTrack, localVideoTrack;

export async function joinAgora(appId, channel, token, uid) {
  client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  await client.join(appId, channel, token, uid);

  // Crear pistas de audio y video
  localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  localVideoTrack = await AgoraRTC.createCameraVideoTrack();

  // Publicar pistas al canal
  await client.publish([localAudioTrack, localVideoTrack]);

  console.log("🎤 Publicado en canal:", channel);
}

export async function leaveAgora() {
  localAudioTrack?.close();
  localVideoTrack?.close();
  await client?.leave();
  console.log("👋 Saliste del canal");
}
