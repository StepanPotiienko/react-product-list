import React, { useState } from "react";
import { Divider } from "react-native-paper";
import { ListItem } from "@rneui/themed";
import { Icon, Button } from "@rneui/base";

const ProductItem = (props: { name: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  const deleteItem = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <ListItem.Swipeable
        leftContent={(reset) => (
          <Button
            title="Info"
            onPress={() => reset()}
            icon={{ name: 'info', color: 'white' }}
            buttonStyle={{ minHeight: '100%' }}
          />
        )}
        rightContent={(reset) => (
          <Button
            onPress={() => {
              deleteItem();
              reset();
            }}
            icon={{ name: 'check', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'green' }}
          />
        )}
      >
        <Icon name="shopping-cart" />
        <ListItem.Content>
          <ListItem.Title>{props.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
      <Divider />
    </>
  );
};

export default ProductItem;
