import Picker from "@gregfrench/react-native-wheel-picker";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import { CompositeNavigationProp } from "@react-navigation/core";
import moment from "moment";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Keyboard, ScrollView } from "react-native";
import DatePicker from "react-native-date-picker";
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  AppCanvas,
  Button,
  DefaultHeader,
  ProfilePhoto,
  Radio,
  TextField,
  TextItem,
  ToggleButtons,
} from "../../components";
import { db, requestCameraPermission } from "../../config";
import {
  FancyTypes,
  FieldErrorProps,
  StaticBottomSheetProps,
  UsersProps,
} from "../../config/types";
import {
  fancyStates as fan,
  node as n,
  spacing,
  strings as str,
} from "../../constants";
import {
  batchValue,
  genderValue,
  HobbiesValue,
  majorValue,
} from "../../constants/defaultValue/local";
import AppState from "../../redux";
import { updateProfile } from "../../redux/actions";
import { imageResizer, pickerGenerator } from "./helper";
import styles from "./styles";
interface ProfileProps {
  navigation: CompositeNavigationProp<any, any>;
}

interface ImageDataProps {
  uri: string;
  fileSize: number;
}

const PickerItem = Picker.Item;

const Profile: FC<ProfileProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { defaultState, fancyType } = fan;

  const {
    sessionReducer: { uid },
  } = useSelector((state: AppState) => state);

  const [fancyBarState, setFancyBarState] = useState<FancyTypes>(defaultState);

  const [batch, setBatch] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [dob, setDob] = useState<string>("DD/MM/YYYY");
  const [major, setMajor] = useState<string>("");
  const [staticType, setStaticType] = useState<string>("picture");

  const [gender, setGender] = useState<number>(0);

  const [imageData, setImageData] = useState<ImageDataProps>({
    uri: "",
    fileSize: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const [formError, setFormError] = useState<FieldErrorProps[]>([]);
  const [hobbies, setHobbies] = useState<number[]>([]);

  const isMounted = useRef(true);
  const dobRef = useRef(0);

  const s = styles();

  const pickImage = () => {
    Keyboard.dismiss();
    setStaticType("picture");
    setVisible(true);
  };

  const fancySuccess = () =>
    setFancyBarState({
      visible: true,
      type: fancyType.success,
      msg: str.successProfile,
    });

  const fancyFail = () =>
    setFancyBarState({
      visible: true,
      type: fancyType.failed,
      msg: str.failedHappen,
    });

  const imageCallbackThen = (resized: any) => {
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
  };

  const imageCallbackCatch = (err: any) => {
    console.log(`Profile, imageCallback(), ${err.message}`);
    setFancyBarState({
      visible: true,
      type: fancyType.failed,
      msg: "Gagal mengambil foto profil",
    });
  };

  const imageCallback = (response: ImagePickerResponse) => {
    setVisible(false);
    if (response.didCancel) return;
    const image = response.assets[0];
    imageResizer(image.uri || "", imageCallbackThen, imageCallbackCatch);
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

  const updatingFireAuth = (photoURL: string) => {
    const newHobbies = HobbiesValue.map((hobby) => ({
      ...hobby,
      isSelected: hobbies.findIndex((item) => item == hobby.id) !== -1,
    }));
    const profileData = {
      displayName,
      photoURL,
      hobbies: newHobbies,
      gender,
      dob,
      batch,
      major,
    };
    auth()
      .currentUser?.updateProfile({ displayName, photoURL })
      .then(() => dispatch(updateProfile(profileData)));
    db.ref(`${n.users}/${uid}`).update(profileData);
  };

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
          console.log(`Profile, submit(), ${error}`);
          fancyFail();
        });
    } catch (error) {
      console.log(`Profile, submit(), ${error}`);
      fancyFail();
    } finally {
      setIsLoading(false);
    }
  };

  const checkForm = () => {
    const errorCondition = displayName.length == 0 || displayName.length < 6;
    if (errorCondition) {
      const emptyUsername = displayName.length == 0 ? str.usernameEmpty : "";
      const lessUsername = displayName.length < 6 ? str.usernameSixChar : "";
      setFormError((current) => [
        ...current,
        {
          msg: emptyUsername || lessUsername,
          param: "displayName",
          value: displayName,
        },
      ]);
      return;
    }
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
    const currentHobbies =
      detail?.hobbies !== undefined &&
      detail?.hobbies
        .filter((hobby) => hobby.isSelected)
        .map((hobby) => hobby.id);
    if (isMounted.current) {
      setDisplayName(detail?.displayName);
      setBio(detail?.bio || "");
      setImageData({ uri: detail?.photoURL || "", fileSize: 0 });
      setGender(detail?.gender || 0);
      setHobbies(currentHobbies || []);
      setDob(detail?.dob || "DD/MM/YYYY");
      setMajor(detail?.major || "");
      setBatch(detail?.batch || "");
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

  const dobSheetPress = () => {
    setVisible(false);
    const age = moment().diff(dobRef.current, "years");
    if (age < 16) {
      setFancyBarState({
        visible: true,
        type: fancyType.failed,
        msg: str.minAge,
      });
      return;
    }
    setDob(moment(dobRef.current).format("DD/MM/YYYY"));
  };

  const header = useCallback(
    () => (
      <DefaultHeader title={str.profil} onPress={() => navigation.goBack()} />
    ),
    []
  );

  const customCompDob = () => (
    <DatePicker
      date={new Date()}
      onDateChange={(e) => (dobRef.current = e.getTime())}
      mode="date"
    />
  );

  const customCompBatch = () =>
    pickerGenerator(
      batchValue.map((item) => item.label),
      setBatch,
      batchValue.findIndex((item) => item.label == batch),
      24
    );

  const staticPress = () => {
    setVisible(false);
    setTimeout(() => {
      setStaticType("picture");
    }, 800);
  };

  const customCompMajor = () =>
    pickerGenerator(
      majorValue,
      setMajor,
      majorValue.findIndex((item) => item == major),
      16
    );

  const staticPattern = {
    action: true,
    onPress: staticPress,
    setVisible: staticPress,
    visible,
  };

  const statics: { [key: string]: StaticBottomSheetProps } = {
    batch: {
      customComp: customCompBatch,
      ...staticPattern,
    },
    dob: {
      customComp: customCompDob,
      ...staticPattern,
      onPress: dobSheetPress,
    },
    major: {
      customComp: customCompMajor,
      ...staticPattern,
    },
    picture: {
      onPressLeft: () => onImagePicking(true),
      onPressRight: () => onImagePicking(false),
      setVisible,
      visible,
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
    if (!visible && isMounted.current) {
      setTimeout(() => {
        setStaticType("picture");
      }, 800);
    }
    return () => {
      isMounted.current = false;
    };
  }, [visible]);

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

  const onChangeUsername = (e: string) => setDisplayName(e);
  const onChangeBio = (e: string) => setBio(e);
  const onPressDob = useCallback(() => {
    setStaticType("dob");
    setVisible(true);
  }, []);
  const onPressBatch = useCallback(() => {
    setStaticType("batch");
    setVisible(true);
  }, []);
  const onPressMajor = useCallback(() => {
    setStaticType("major");
    setTimeout(() => {
      setVisible(true);
    }, 200);
  }, []);

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
          mainStyle={{ marginBottom: spacing.sm }}
          containerStyle={s.field}
          onChangeText={onChangeUsername}
          warningText={testError("displayName")}
          isError={testError("displayName")}
          defaultValue={displayName}
          maxLength={25}
          withPadding={false}
        />
        <TextItem type="normal14Main">Bio</TextItem>
        <TextField
          placeholder={str.bio}
          mainStyle={{ marginBottom: spacing.sm }}
          containerStyle={s.field}
          onChangeText={onChangeBio}
          defaultValue={bio}
          maxLength={50}
          withPadding={false}
        />
        <TextItem type="normal14Main">Tanggal Lahir</TextItem>
        <Button style={[s.field, s.customTextField]} onPress={onPressDob}>
          <TextItem>{dob}</TextItem>
        </Button>
        <TextItem type="normal14Main">Angkatan</TextItem>
        <Button style={[s.field, s.customTextField]} onPress={onPressBatch}>
          <TextItem>{batch}</TextItem>
        </Button>
        <TextItem type="normal14Main">Jurusan</TextItem>
        <Button style={[s.field, s.customTextField]} onPress={onPressMajor}>
          <TextItem>{major}</TextItem>
        </Button>
        <TextItem type="normal14Main">Jenis Kelamin</TextItem>
        <Radio data={genderValue} selected={gender} onPress={setGender} />
        <TextItem type="normal14Main">Hobi</TextItem>
        <ToggleButtons
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

export default Profile;
