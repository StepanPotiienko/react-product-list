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

export function LoadAllData() {
  try {
    throw new Error("Not yet implemented.");
  } catch (error) {
    console.log("Could not load the data. Error:", error);
  }
}
