import Toast, { ToastPosition } from "react-native-toast-message";

export const showToast = (
  type: string = "success",
  title: string,
  description: string,
  position: ToastPosition
) => {
  Toast.show({
    type: type,
    text1: title,
    text2: description,
    position: position,
    swipeable: true,
  });
};
