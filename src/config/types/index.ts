interface AddressProps {
  city?: string | null;
  country?: string | null;
  district?: string | null;
  name?: string | null;
  postalCode?: string | null;
  region?: string | null;
  street?: string | null;
  subregion?: string | null;
  address?: string | null;
}

interface AnimalProps {
  name: string;
  image: string;
  id: string | number;
}

interface FancyTypes {
  visible: boolean;
  type: string;
  msg: string;
}
interface FieldErrorProps {
  param: string;
  msg: string;
  value?: any;
}

interface HeaderState {
  isEnabled?: boolean;
  header?: () => JSX.Element;
}
interface LatLangProps {
  longitude: number;
  latitude: number;
}

interface LoginDataProps {
  username: string;
  password: string;
}

interface RegisterDataProps extends LoginDataProps {
  email: string;
  re_password: string;
}
interface ResultProps {
  [key: string]: any;
}

// REDUX
interface ReduxActionProps {
  type: string;
  payload: any;
}

interface ReduxLanguageActionProps {
  type: string;
}
interface ReduxLocationStateProps {
  latLang: LatLangProps;
  city?: string | null;
  country?: string | null;
  district?: string | null;
  name?: string | null;
  postalCode?: string | null;
  region?: string | null;
  street?: string | null;
  subregion?: string | null;
  address?: string;
}
interface ReduxLocationActionProps extends ReduxActionProps {
  payload: ReduxLocationStateProps;
}
interface ReduxSessionActionProps extends ReduxActionProps {
  payload: ReduxSessionStateProps;
}
interface ReduxSessionStateProps {
  isLoggedIn: boolean;
  userId: string;
  token: string;
}

export type {
  AddressProps,
  AnimalProps,
  FancyTypes,
  FieldErrorProps,
  HeaderState,
  LatLangProps,
  LoginDataProps,
  ReduxActionProps,
  ReduxLanguageActionProps,
  ReduxLocationStateProps,
  ReduxLocationActionProps,
  ReduxSessionStateProps,
  ReduxSessionActionProps,
  RegisterDataProps,
  ResultProps,
};
