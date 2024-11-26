import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { Input } from '@rneui/base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { AppBar } from './src/components/AppBar';
import ProductItem from './src/components/ProductItem';

import { SaveData, LoadAllData } from './src/Data';
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
  const [itemsList, setItemsList] = useState<string[]>([]);
  const [itemsStates, setItemsStates] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await LoadAllData();
        if (data.length > 0) {
          const names: string[] = [];
          const states: string[] = [];

          data.forEach((item) => {
            const parsedItem = JSON.parse(item);
            names.push(parsedItem.name);
            states.push(parsedItem.state);
          });

          setItemsList(names);
          setItemsStates(states);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    loadData();
  }, []);

  const appendItem = (name: string) => {
    setItemsList((prev) => [...prev, name]);
    setItemsStates((prev) => [...prev, "waiting"]);
    showToast("success", "Item added", name, "bottom");

    SaveData(name, JSON.stringify({ name, state: "waiting" }));
  };

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <AppBar />
        <AddItem onAddItem={appendItem} />
        {itemsList.length === 0 ? (
          <Text style={{ textAlign: 'center', fontSize: 12 }}>
            There is nothing to see here yet. Begin by adding a new product above!
          </Text>
        ) : (
          itemsList.map((name, index) => (
            <ProductItem
              key={`${name}-${index}`} // Ensure the key is unique
              name={name}
              state={itemsStates[index]}
            />
          ))
        )}
        <StatusBar style="auto" />
      </View>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
