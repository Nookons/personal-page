// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // если используете аутентификацию
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация сервисов Firebase
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);

// Экспорт для использования в других частях проекта
export { app, auth, database, db };
