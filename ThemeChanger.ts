import { Appearance } from "react-native";

export const ChangeStylesOnThemeChange = () => {
  const colorScheme = Appearance.getColorScheme();
  return {
    backgroundColor: colorScheme === "dark" ? "black" : "white",
    color: colorScheme === "dark" ? "white" : "black",
  };
};
