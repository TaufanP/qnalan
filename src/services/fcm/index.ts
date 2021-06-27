import { keys } from "../../config";

const notify = async ({
  title,
  body,
  to,
  uri,
  partnerId,
  roomId,
  messageId,
}: {
  title: string;
  body: string;
  to: string;
  linking?: string;
  uri?: string;
  partnerId: string;
  roomId: string;
  messageId: string;
}) => {
  const payload = {
    to,
    notification: {
      body,
      title,
      content_available: true,
      priority: "high",
    },
    data: {
      body,
      title,
      linking: `com.sbhumanbank://app/room-chat/${partnerId}/${roomId}/${messageId}`,
      content_available: true,
      priority: "high",
      uri: uri || "",
      partnerId,
      roomId,
      messageId,
    },
  };
  await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `key=${keys.googleApi}`,
    },
    body: JSON.stringify(payload),
  });
};

export default notify;
