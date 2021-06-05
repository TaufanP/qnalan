import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import { CompositeNavigationProp } from "@react-navigation/core";
import moment from "moment";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Keyboard, ScrollView, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { useDispatch, useSelector } from "react-redux";
import {
  AppCanvas,
  Button,
  CheckBoxes,
  DefaultHeader,
  ProfilePhoto,
  Radio,
  TextField,
  TextItem,
} from "../components";
import { db, requestCameraPermission } from "../config";
import {
  FancyTypes,
  FieldErrorProps,
  StaticBottomSheetProps,
  UsersProps,
} from "../config/types";
import {
  colorsPalette as cp,
  fancyStates as fan,
  node as n,
  spacing as sp,
  strings as str,
} from "../constants";
import { HobbiesValue } from "../constants/defaultValue/local";
import AppState from "../redux";
import { updateProfile } from "../redux/actions";

const genderData = [
  { label: "Pria", value: 1 },
  { label: "Wanita", value: 2 },
];
interface ProfileScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}

interface ImageDataProps {
  uri: string;
  fileSize: number;
}

const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { defaultState, fancyType } = fan;

  const {
    sessionReducer: { uid },
  } = useSelector((state: AppState) => state);

  const [fancyBarState, setFancyBarState] = useState<FancyTypes>(defaultState);

  const [displayName, setDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [dob, setDob] = useState<string>("05/05/1991");
  const [staticType, setStaticType] = useState<string>("dob");

  const [gender, setGender] = useState<number>(0);
  const [hobbies, setHobbies] = useState<number[]>([]);

  const [imageData, setImageData] = useState<ImageDataProps>({
    uri: "",
    fileSize: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const [formError, setFormError] = useState<FieldErrorProps[]>([]);

  const isMounted = useRef(true);
  const dobRef = useRef("");

  const s = styles();

  const pickImage = () => {
    Keyboard.dismiss();
    setStaticType("picture");
    setVisible(true);
  };

  const imageCallback = (response: ImagePickerResponse) => {
    setVisible(false);
    if (response.didCancel) return;
    const image = response.assets[0];
    ImageResizer.createResizedImage(
      image.uri || "",
      900,
      900,
      "PNG",
      100,
      0,
      undefined,
      undefined
    )
      .then((resized) => {
        if (resized.size > 2000000) {
          setFancyBarState({
            visible: true,
            type: fancyType.failed,
            msg: "Foto profil tidak melebihi 2MB",
          });
          return;
        }
        setImageData({
          uri: resized.uri || "",
          fileSize: resized.size || 0,
        });
      })
      .catch((err) => {
        console.log(`ProfileScreen, imageCallback(), ${err}`);
        setFancyBarState({
          visible: true,
          type: fancyType.failed,
          msg: "Gagal mengambil foto profil",
        });
        return;
      });
  };

  const onImagePicking = async (isCamera: boolean = false) => {
    const options: ImageLibraryOptions = { mediaType: "photo" };
    if (!isCamera) {
      launchImageLibrary(options, imageCallback);
      return;
    }
    const isGranted = await requestCameraPermission();
    if (!isGranted) return;
    launchCamera(options, imageCallback);
  };

  const header = useCallback(
    () => <DefaultHeader title="Profil" onPress={() => navigation.goBack()} />,
    []
  );

  const updatingFireAuth = (photoURL: string) => {
    const newHobbies = HobbiesValue.map((hobby) => ({
      ...hobby,
      isSelected: hobbies.findIndex((item) => item == hobby.id) !== -1,
    }));
    auth()
      .currentUser?.updateProfile({ displayName, photoURL })
      .then(() =>
        dispatch(
          updateProfile({
            displayName,
            photoURL,
            hobbies: newHobbies,
            gender,
            dob,
          })
        )
      );
    db.ref(`${n.users}/${uid}`).update({
      bio,
      displayName,
      photoURL,
      hobbies: newHobbies,
      gender,
      dob,
    });
  };

  const fancySuccess = () =>
    setFancyBarState({
      visible: true,
      type: fancyType.success,
      msg: str.successProfile,
    });

  const submit = async () => {
    setIsLoading(true);
    try {
      if (imageData.uri == "" || imageData.uri.includes("https")) {
        updatingFireAuth(imageData.uri);
        fancySuccess();
        return;
      }
      storage()
        .ref(`sbhumanbank/users/${uid}`)
        .putFile(imageData.uri)
        .then(async () => {
          const photoURL = await storage()
            .ref(`sbhumanbank/users/${uid}`)
            .getDownloadURL();
          updatingFireAuth(photoURL);
          fancySuccess();
        })
        .catch((error) => {
          console.log(error);
          setFancyBarState({
            visible: true,
            type: fancyType.failed,
            msg: str.failedHappen,
          });
        });
    } catch (error) {
      console.log(error);
      setFancyBarState({
        visible: true,
        type: fancyType.failed,
        msg: str.failedHappen,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkForm = () => {
    if (displayName.length == 0)
      return setFormError((current) => [
        ...current,
        {
          msg: "Username tidak boleh kosong",
          param: "displayName",
          value: displayName,
        },
      ]);
    if (displayName.length < 6)
      return setFormError((current) => [
        ...current,
        {
          msg: "Username minimal 6 karakter",
          param: "displayName",
          value: displayName,
        },
      ]);
    submit();
  };

  const testError = (field: string) => {
    if (!formError) return false;

    const index = formError.findIndex(
      (error: FieldErrorProps) => error.param == field
    );

    if (index == -1) return false;

    return formError[index].msg;
  };

  const processForm = async () => {
    Keyboard.dismiss();
    setFormError([]);
    checkForm();
  };

  const fillForm = async () => {
    const profile = await db.ref(`${n.users}/${uid}`).once("value");
    const detail: UsersProps = profile.val();
    const currentHobbies = detail?.hobbies
      .filter((hobby) => hobby.isSelected)
      .map((hobby) => hobby.id);
    if (isMounted) {
      setDisplayName(detail?.displayName);
      setBio(detail?.bio);
      setImageData({ uri: detail?.photoURL, fileSize: 0 });
      setGender(detail?.gender);
      setHobbies(currentHobbies);
    }
  };

  const onPressHobbiesBox = (value: number) =>
    setHobbies((current) => {
      const isExist = current.findIndex((id) => id == value) !== -1;
      if (isExist) {
        return current.filter((id) => id !== value);
      }
      return [...current, value];
    });

  const customCompDob = () => (
    <DatePicker
      date={new Date()}
      onDateChange={(e) => (dobRef.current = moment(e).format("DD/MM/YYYY"))}
      mode="date"
    />
  );

  const statics: { [key: string]: StaticBottomSheetProps } = {
    dob: {
      visible,
      setVisible,
      customComp: customCompDob,
      action: true,
      onPress: () => {
        setDob(dobRef.current);
        setVisible(false);
      },
    },
    picture: {
      visible,
      setVisible,
      onPressRight: () => onImagePicking(false),
      onPressLeft: () => onImagePicking(true),
    },
  };

  const staticBottomSheetState: StaticBottomSheetProps = statics[staticType];

  useEffect(() => {
    fillForm();
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (visible) {
        setVisible(false);
        return true;
      }
      return isLoading;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  return (
    <AppCanvas
      {...{
        fancyBarState,
        setFancyBarState,
        header,
        staticBottomSheetState,
      }}
    >
      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ProfilePhoto onPress={pickImage} uri={imageData.uri} />
        <TextItem type="normal14Main">Nama Pengguna</TextItem>
        <TextField
          placeholder={str.username}
          containerStyle={s.field}
          onChangeText={(e) => setDisplayName(e)}
          warningText={testError("displayName")}
          isError={testError("displayName")}
          defaultValue={displayName}
          maxLength={25}
          withPadding={false}
        />
        <TextItem type="normal14Main">Bio</TextItem>
        <TextField
          placeholder={str.bio}
          containerStyle={s.field}
          onChangeText={(e) => setBio(e)}
          defaultValue={bio}
          maxLength={50}
          withPadding={false}
        />
        <TextItem type="normal14Main">Tanggal Lahir</TextItem>
        <Button
          style={[s.field, s.customTextField]}
          onPress={() => {
            setStaticType("dob");
            setVisible(true);
          }}
        >
          <TextItem>{dob}</TextItem>
        </Button>
        <TextItem type="normal14Main">Jenis Kelamin</TextItem>
        <Radio data={genderData} selected={gender} onPress={setGender} />
        <TextItem type="normal14Main">Hobi</TextItem>
        <CheckBoxes
          data={HobbiesValue.map((hobby) => ({
            label: hobby.label,
            value: hobby.id,
          }))}
          selected={hobbies.map((hobby) => hobby)}
          onPress={onPressHobbiesBox}
        />
        <Button
          style={s.button}
          onPress={processForm}
          isLoading={isLoading}
          defaultLoading
        >
          <TextItem type="bold16White">PERBARUI</TextItem>
        </Button>
      </ScrollView>
    </AppCanvas>
  );
};

const styles = () =>
  StyleSheet.create({
    customTextField: {
      height: 50,
      justifyContent: "center",
      paddingLeft: sp.ss,
      borderLeftWidth: 2,
      borderLeftColor: "transparent",
    },
    scroll: {
      // justifyContent: "center",
      // alignItems: "center",
      marginTop: sp.l,
      paddingBottom: 64,
      paddingHorizontal: sp.l,
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: cp.blue3,
      borderRadius: 8,
      height: 48,
      marginTop: sp.l,
    },
    field: {
      backgroundColor: "transparent",
      borderBottomWidth: 2,
      borderBottomColor: cp.blue1,
      marginBottom: sp.sm,
    },
  });

export default ProfileScreen;
