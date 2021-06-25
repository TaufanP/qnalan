const sendNotif = async ({ message }: { message: string }) => {
  const test = {
    to: "fK4bYSXMSDSIRgDw3t5kWd:APA91bE074gJwho-CPR0EiikNopmTUh5pRNxv8Pxg2ELa8wxMMBhqZKZ1_QvJXPWZ-K1TPpIjrQC0TZMX_d55VhX-pblp9DBlu3NuddLU1U6xc5MIrthntfM-Ia5v9w9150V6itMAbE3",
    notification: {
      body: "The first message from the React Native and Firebase",
      title: message,
      content_available: true,
      priority: "high",
    },
    data: {
      body: "The first message from the React Native and Firebase",
      title: "React Native Firebase",
      content_available: true,
      priority: "high",
    },
  };
  await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `key=`,
    },
    body: JSON.stringify(test),
  });
};

export default sendNotif;
