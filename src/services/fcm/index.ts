import { keys } from "../../config";

const notify = async ({
  title,
  body,
  to,
  linking,
}: {
  title: string;
  body: string;
  to: string;
  linking?: string;
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
      linking: `com.sbhumanbank://app/${linking || "room-list"}`,
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

export default notify;
