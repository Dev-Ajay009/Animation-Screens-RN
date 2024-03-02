import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, TouchableHighlight } from "react-native";
import SQLite from 'react-native-sqlite-storage';
import React from "react";
export function removeItem(key) {
  return AsyncStorage.removeItem(key);
}
export function clearAsyncStorage() {
  return AsyncStorage.clear();
}

export function setDataInAsync(key, data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem(key, data);
}
export async function getDataForAsync(key) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key).then(data => {
      resolve(JSON.parse(data));
    });
  });


}


export const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

export const  executeSql = async (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (_, resultSet) => resolve(resultSet),
        (_, error) => reject(error)
      );
    });
  });
};