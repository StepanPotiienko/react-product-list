import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductItem from './ProductItem';
import { Input } from '@rneui/base';

const AppTitle: string = "Product List";

const showToast = (text1: string, text2: string) => {
  Toast.show({ type: 'success', text1: text1, text2: text2 });
};

const AppBar = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title={AppTitle} />
      <Appbar.Action icon="dots-vertical" onPress={() => showToast("Opened settings", "Not yet implemented D:")} />
    </Appbar.Header>
  );
};

const App = () => {
  const [itemsList, setItemsList] = useState<string[]>(["Eggs"]);

  const appendItem = (name: string) => {
    setItemsList([...itemsList, name]);
    showToast("Item added", name);
  };

  return (
    <SafeAreaProvider>
      <View>
        <View>
          <AppBar />
        </View>
        <AddItem onAddItem={appendItem} />
        {itemsList.map(name => (
          <ProductItem key={name} name={name} />
        ))}
        <StatusBar style="auto" />
        <Toast />
      </View>
    </SafeAreaProvider>
  );
};

const AddItem = ({ onAddItem }: { onAddItem: (name: string) => void }) => {
  const [name, setName] = useState("");

  const handleAddItem = () => {
    if (name.trim()) {
      onAddItem(name);
      setName("");
    } else {
      showToast("Error", "Please enter a valid item");
    }
  };

  return (
    <Input
      value={name}
      placeholder="Buy eggs"
      onChangeText={setName}
      onSubmitEditing={handleAddItem}
    />
  );
};

export default App;
