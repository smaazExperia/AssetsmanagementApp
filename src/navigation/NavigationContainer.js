// Import React
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import all the screens needed
import GoogleLoginScreen from './../auth/GoogleLoginScreen';
import HomeScreen from './../HomeScreen';
import GDUploadFileScreen from './../googleDriveScreens/GDUploadFileScreen';
import GDFilesListingScreen from './../googleDriveScreens/GDFilesListingScreen';
import GDSingleFileScreen from './../googleDriveScreens/GDSingleFileScreen';
import GDDeleteFileScreen from './../googleDriveScreens/GDDeleteFileScreen';
import GDDownloadFileScreen from './../googleDriveScreens/GDDownloadFileScreen';
import GoogleSheets from '../GoogleSheets';

const Stack = createStackNavigator();

const Navigator = () => {
return (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="GoogleLoginScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="GoogleLoginScreen"
        component={GoogleLoginScreen}
        // Hiding header
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Google Drive Example'}}
      />
      <Stack.Screen
        name="GDUploadFileScreen"
        component={GDUploadFileScreen}
        options={{title: 'Upload File'}}
      />
      <Stack.Screen
        name="GDFilesListingScreen"
        component={GDFilesListingScreen}
        options={{title: 'Files'}}
      />
      <Stack.Screen
        name="GDSingleFileScreen"
        component={GDSingleFileScreen}
        options={{title: 'File Content'}}
      />
      <Stack.Screen
        name="GDDeleteFileScreen"
        component={GDDeleteFileScreen}
        options={{title: 'Delete File'}}
      />
      <Stack.Screen
        name="GDDownloadFileScreen"
        component={GDDownloadFileScreen}
        options={{title: 'Download File'}}
      />
      <Stack.Screen
        name="GoogleSheets"
        component={GoogleSheets}
        options={{title: 'Google Sheets Example'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
}

export default Navigator;