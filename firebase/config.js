import AsyncStorage from "@react-native-async-storage/async-storage";

// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';

// Функція для підключення авторизації в проект
import { getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";

// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";

// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import "firebase/auth"
import "firebase/storage";
import "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDbRm9BTQpNxF11UKetrv8TbGqdvNUhPoA",
  authDomain: "mynewproject-2b31c.firebaseapp.com",
  projectId: "mynewproject-2b31c",
  storageBucket: "mynewproject-2b31c.appspot.com",
  messagingSenderId: "801322699517",
  appId: "1:801322699517:web:b448768c112a2b37358c94"
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
