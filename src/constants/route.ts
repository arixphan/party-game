export namespace AppRoute {
  export const ROOT = "/";
  export const TRUTH_OR_DARE = {
    INDEX: "/truthordare",
    CUSTOM: "/truthordare/custom",
    PLAY: "/truthordare/play",
  };
  export const AUTH = {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGET_PASSWORD: "/forget-password",
  };
  export const RANDOM = {
    RANDOM_PICKER: "/random-picker",
  };
}

export const AuthRoutes = [
  AppRoute.TRUTH_OR_DARE.CUSTOM,
  AppRoute.TRUTH_OR_DARE.PLAY,
];
