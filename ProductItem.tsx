import { useState } from "react";
import { Divider } from "react-native-paper";
import { ListItem } from "@rneui/themed";
import { Icon, Button } from "@rneui/base";
import { ChangeStylesOnThemeChange } from "./ThemeChanger";
import { showToast } from "./App";

const ProductItem = (props: { name: string }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const styles = ChangeStylesOnThemeChange()

  const DeleteItem = (name: string) => {
    setIsVisible(false);
    showToast("error", "Deleted Item", name)
  };

  if (!isVisible) {
    return <></>;
  }

  const CheckItem = (value: boolean) => {
    setIsChecked(value);
  };

  return (
    <>
      <ListItem.Swipeable
        disabled={isChecked}
        containerStyle={{ backgroundColor: styles.backgroundColor  }}
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
