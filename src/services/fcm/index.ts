import { keys } from "../../config";

const sendNotif = async ({
  title,
  body,
  to,
}: {
  title: string;
  body: string;
  to: string;
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
      content_available: true,
      priority: "high",
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

export default sendNotif;
