import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { message } from "antd";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ISignUp } from "../../pages/SignUp/SignUpForm";
import dayjs from "dayjs";

export const userCreateAccount = async (formData: ISignUp) => {
    const auth = getAuth();

    try {
        // Создаем нового пользователя в Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Сохраняем данные пользователя в Firestore
        await setDoc(doc(db, "accounts", user.uid), {
            ...formData,
            password: "####", // Никогда не сохраняйте реальные пароли в базе данных
            check_password: "####",
            uid: user.uid,
            last_signIn: dayjs().valueOf(),
        });

        // Возвращаем объект userCredential или хотя бы user
        return user; // Теперь функция возвращает пользователя
    } catch (error) {
        // Обработка ошибок, если что-то пошло не так
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        message.error(errorMessage);
        return false;
    }
};
