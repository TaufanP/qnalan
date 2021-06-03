import { PermissionsAndroid } from "react-native";

interface ResultProps {
  [key: string]: any;
}

const requestCameraPermission = async () => {
  const isGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.CAMERA
  );
  return new Promise<ResultProps>(async (resolve, reject) => {
    if (!isGranted) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve({ isGranted: true });
          console.log("You can use the camera", { granted });
        } else {
          reject({ isGranted: false });
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
        reject({ isGranted: false });
      }
    }
    resolve({ isGranted: true });
  });
};

export { requestCameraPermission };
