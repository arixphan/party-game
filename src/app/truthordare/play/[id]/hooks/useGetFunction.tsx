import { useGetCustom } from "./useGetCustom";
import { useGetDefault } from "./useGetDefault";

export const useGetFunction = (id: string) => {
  if (!id) {
    return {
      handleGetTruth: () => undefined,
      handleGetDare: () => undefined,
    };
  }

  let getHook = useGetCustom;
  if (["common", "adult", "couple"].includes(id)) {
    getHook = useGetDefault;
  }
  return getHook(id);
};
