import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductItem from './ProductItem';
import { Input } from '@rneui/base';
import { ChangeStylesOnThemeChange } from './ThemeChanger';

const AppTitle: string = "Product List";
const themeStyles = ChangeStylesOnThemeChange();

export const showToast = (type: string = 'success', title: string, description: string) => {
  Toast.show({ type: type, text1: title, text2: description, position: "bottom", swipeable: true });
};

const AppBar = () => {
  return (
    <Appbar.Header style={{ backgroundColor: themeStyles.backgroundColor }}>
      <Appbar.Content
        title={AppTitle}
        titleStyle={{ color: themeStyles.color }}
      />
      <Appbar.Action
        icon="dots-vertical"
        onPress={() =>
          showToast("error", "Opened settings", "Not yet implemented D:")
        }
      />
    </Appbar.Header>
  );
};

const App = () => {
  const [itemsList, setItemsList] = useState<string[]>([]);

  const appendItem = (name: string) => {
    setItemsList([...itemsList, name]);
    showToast("success", "Item added", name);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View>
          <AppBar />
        </View>
        <AddItem onAddItem={appendItem} />

        {itemsList.length === 0 ? (
          <Text style={{ textAlign: 'center', fontSize: 12 }}>There is nothing to see here yet. Begin by adding a new product above!</Text>
        ) : (
          itemsList.map((name) => <ProductItem key={name} name={name} />)
        )}

        <StatusBar style="auto" />
      </View>
      <Toast />
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
      showToast("error", "Error", "Item name cannot be empty.");
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

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes the full screen height
  },
});

export default App;
