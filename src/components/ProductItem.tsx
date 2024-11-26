import { useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import { ListItem } from "@rneui/themed";
import { Icon, Button } from "@rneui/base";
import { ChangeStylesOnThemeChange } from "../ThemeChanger";
import { showToast } from "../Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductItem = (props: { name: string; state: string }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (props.state === "waiting") {
      CheckItem(false);
    } else {
      CheckItem(true);
    }
  }, [props.state]);

  const styles = ChangeStylesOnThemeChange();

  const DeleteItem = (name: string) => {
    setIsVisible(false);
    AsyncStorage.removeItem(name);
    showToast("error", "Deleted Item", name, "bottom");
  };

  const CheckItem = async (value: boolean) => {
    setIsChecked(value);

    const itemData = { name: props.name, state: value ? "checked" : "waiting" };

    try {
      await AsyncStorage.setItem(props.name, JSON.stringify(itemData));
      showToast("success", value ? "Item Checked" : "Item Unchecked", props.name, "bottom");
    } catch (error) {
      console.error("Error saving to AsyncStorage", error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <ListItem.Swipeable
        disabled={isChecked}
        containerStyle={{ backgroundColor: styles.backgroundColor }}
        leftContent={(reset) => (
          <Button
            title="Delete"
            onPress={() => {
              DeleteItem(props.name);
              reset();
            }}
            icon={{ name: "delete", color: "white" }}
            buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
          />
        )}
        rightContent={(reset) => (
          <Button
            title="Check"
            onPress={() => {
              CheckItem(true);
            }}
            disabled={isChecked}
            icon={{ name: "check", color: "white" }}
            buttonStyle={{ minHeight: "100%", backgroundColor: "green" }}
          />
        )}
      >
        {isChecked ? <Icon name="check" color={"green"} /> : <Icon name="shopping-cart" />}
        <ListItem.Content>
          <ListItem.Title style={{ color: styles.color }}>{props.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
      <Divider />
    </>
  );
};

export default ProductItem;
