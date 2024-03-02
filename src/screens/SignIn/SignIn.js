import {View, Text, TextInput, Platform, Button} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {
  db,
  executeSql,
  getDataForAsync,
  setDataInAsync,
} from '../../CommanFunctions/CommanFunction';
import {useState} from 'react';

import CustomInput from '../../components/CustomInput';
import Toast from 'react-native-simple-toast';
import ImageCropPicker from 'react-native-image-crop-picker';
const SignIn = ({navigation}) => {

  const [data, setData] = useState({
    mail: '',
    password: '',
  });
  const handler = (v, i) => {
    setData(e => ({...e, [i]: v}));
  };
  let uniqId=Math.floor(Math.random() * 100)
  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, uniqid TEXT NOT NULL)',
        [],
        (_, resultSet) => {
          console.log('Table created/already exists:', resultSet);
        },
        (_, error) => {
          console.error('Error creating table:', error);
        }
      );
    });
  };
  const registerUser = async (username,uniqid) => {
    try {
      const result = await executeSql(
        'INSERT INTO users (username, uniqid) VALUES (?, ?)',
        [username, uniqid]
      );
  
      console.log('User registered successfully:-------', result);
  
      return result.rowsAffected > 0;
    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
  };
  const Click=()=>{
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  }
  const loginUser = async (username) => {
    try {
      getAllUsers()
      .then((users) => {
        console.log('All users:---', users);
      })
      .catch((error) => {
        console.error('Error getting all users:', error);
      });
      const result = await executeSql(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );
  
      if (result.rows.length > 0) {
        const user = result.rows.item(0); // Get the first user (assuming usernames are unique)
        console.log('User logged in successfully:', user);
        (() => {
          setDataInAsync('LoginId', user?.uniqid);
        })();
        (() => {
          setDataInAsync('Login', true);
        })();
        navigation.replace('DrawbleStack');
        Toast.show('Logging successfully.', Toast.SHORT);
      } else {
        console.log('User not found for login:', result.rows.item(0));
        alert('User not loging.');
        return { success: false, user: null };
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      return false;
    }
  };
  const getAllUsers = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users',
          [],
          (_, resultSet) => {
            const users = [];
            for (let i = 0; i < resultSet.rows.length; i++) {
              users.push(resultSet.rows.item(i));
            }
            resolve(users);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
  
  useEffect(()=>{
    createTable()
  },[])

  return (
    <View
      style={{
        padding: 20,
      }}>
      <CustomInput
        Placeholder={'Enter mail'}
        Value={data?.mail}
        attrName={'mail'}
        updateMasterState={handler}
      />
      <CustomInput
        Placeholder={'Enter password'}
        Value={data?.password}
        attrName={'password'}
        updateMasterState={handler}

      />
      <View
        style={{
          marginTop: 20,
        }}>
        <Button
          onPress={() => {
          
              
           registerUser(data?.mail,uniqId)
          loginUser(data?.mail,uniqId)
            
            // Click()

          }}
          title="Sign In"
        />
      </View>
    </View>
  );
};

export default SignIn;
