import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductItem from './ProductItem';


const AppTitle: string = "Product List"


const showToast = (text1: string, text2: string) => {
  Toast.show({type: 'success', text1: text1, text2: text2})
}


const AppBar = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title={AppTitle} />
      <Appbar.Action icon="dots-vertical" onPress={() => showToast("Opened settings", "Not yet implemented D:")} />
    </Appbar.Header>
  )
}

const App = () => {
  return (
    <SafeAreaProvider>
      <View>
        <View>
          <AppBar />
        </View>
        <ProductItem name='Eggs' />
        <ProductItem name='Milk' />
        <StatusBar style="auto" />
        <Toast />
      </View>
    </SafeAreaProvider>
  );
}


export default App
