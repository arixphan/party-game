type classNameType = string | Record<string, boolean>;

export const joinClasses = (...names: classNameType[]) => {
  return names
    .reduce((concatString: string[], name) => {
      if (typeof name === "string") {
        concatString.push(name);
      }
      if (typeof name === "object") {
        const entries = Object.entries(name);
        entries.forEach(([key, value]) => {
          if (value) {
            concatString.push(key);
          }
        });
      }
      return concatString;
    }, [])
    .join(" ");
};
