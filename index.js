/**
 * @format
 */
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';
import AuthApp from './AuthApp';
import { getDataForAsync } from './src/CommanFunctions/CommanFunction';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// AppRegistry.registerRunnable(appName, async initialProps => {
    
      
//         let loginStatus = await getDataForAsync('Login');
//             console.log('loginstatus----',loginStatus);
            
//         loginStatus ?
//             AppRegistry.registerComponent(appName, () => <>
//               <GestureHandlerRootView style={{ flex: 1 }}>
//     <App />
//   </GestureHandlerRootView>
//             </>)
//             :
//             AppRegistry.registerComponent(appName, () => AuthApp)

//         AppRegistry.runApplication(appName, initialProps);
    
// });

const RootComponent = () => (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
  AppRegistry.registerComponent(appName, () => RootComponent);


