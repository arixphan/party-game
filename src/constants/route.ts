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
  };
}

export const AuthRoutes = [
  AppRoute.TRUTH_OR_DARE.CUSTOM,
  AppRoute.TRUTH_OR_DARE.PLAY,
];
