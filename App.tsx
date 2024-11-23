import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { Input } from '@rneui/base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { AppBar } from './src/components/AppBar'
import ProductItem from './src/components/ProductItem';

import { SaveData, LoadData } from './src/Data';
import { showToast } from './src/Toast';

const AddItem = ({ onAddItem }: { onAddItem: (name: string) => void }) => {
  const [name, setName] = useState("");

  const ValidateItemInput = () => {
    if (name.trim()) {
      onAddItem(name);
      setName("");
    } else {
      showToast("error", "Error", "Item name cannot be empty.", "bottom");
    }
  };

  return (
    <Input
      value={name}
      placeholder="Buy eggs"
      onChangeText={setName}
      onSubmitEditing={ValidateItemInput}
    />
  );
};

const App = () => {
  // TODO: Implement saving and loading data from AsyncStorage.
  const [itemsList, setItemsList] = useState<string[]>([])

  const appendItem = (name: string) => {
    setItemsList([...itemsList, name])
    showToast("success", "Item added", name, "bottom")
    SaveData(name, "waiting")
  };

  return (
    <SafeAreaProvider>
      <View style={{flex: 1}}>
        <AppBar />
        <AddItem onAddItem={appendItem} />
        {itemsList.length === 0 ? (
          <Text style={{ textAlign: 'center', fontSize: 12 }}>
            There is nothing to see here yet. Begin by adding a new product above!
          </Text>
        ) : (
          itemsList.map((name) => <ProductItem key={name} name={name} />)
        )}
        <StatusBar style="auto" />
      </View>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
