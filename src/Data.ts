import AsyncStorage from "@react-native-async-storage/async-storage";

export async function SaveData(key: string, data: string) {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.log("Could not store the data. Error:", error);
  }
}

export async function LoadData(key: string) {
  try {
    return AsyncStorage.getItem(key);
  } catch (error) {
    console.log("Could not load the data. Error:", error);
  }
}

export async function LoadAllData(): Promise<string[]> {
  let data: string[] = [];
  try {
    const keys = await AsyncStorage.getAllKeys();
    const keyValuePairs = await AsyncStorage.multiGet(keys);

    data = keyValuePairs.map(([key, value]) => value ?? "");
  } catch (error) {
    console.log("Could not load the data. Error:", error);
  }

  return data;
}
