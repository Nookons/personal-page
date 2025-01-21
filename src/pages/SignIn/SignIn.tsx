import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { SIGN_UP_ROUTE, HOME_ROUTE } from "../../utils/const";
import MyInput from "../../components/MyInput/MyInput";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { message } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Cookies from "js-cookie";
import {useAppDispatch} from "../../hooks/storeHooks";
import {IUser} from "../../types/User";
import {userEnter} from "../../store/reducers/User";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const authToken = Cookies.get("authToken");
        if (authToken) {
            message.success("user already logged to system")
            navigate(HOME_ROUTE);
        }
    }, [navigate]);

    const onSignInHandle = async () => {
        setLoading(true); // Показываем индикатор загрузки
        try {
            const auth = getAuth();

            // Аутентификация пользователя
            const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
            const user = userCredential.user;

            // Проверка, что пользователь существует
            if (!user || !user.uid) {
                throw new Error("Authentication failed: User not found");
            }

            // Получение токена для аутентификации
            const idToken = await user.getIdToken();

            // Сохранение токена в cookies
            Cookies.set("authToken", idToken, {
                secure: true,
                sameSite: "strict",
                expires: 7, // Срок действия 7 дней
            });

            // Загрузка данных пользователя из Firestore
            const userRef = doc(db, "accounts", user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const snap = docSnap.data() as IUser;

                // Успешный вход в систему
                message.success("Successfully signed in!");
                dispatch(userEnter(snap)); // Сохраняем данные пользователя в store
                navigate(HOME_ROUTE); // Перенаправляем на главную страницу
            } else {
                // Данные пользователя не найдены
                message.warning("No associated data found for the user.");
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            message.error("Failed to sign in. Please try again.");
        } finally {
            setLoading(false); // Скрываем индикатор загрузки
        }
    };

    const onSignUpHandle = () => {
        navigate(SIGN_UP_ROUTE);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center h-screen px-4 py-4 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img alt="Nookon Web" src={logo} className="mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <MyInput label="Email address" type="email" name="email" value={userData} change={setUserData} />
                    <MyInput label="Password" type="password" name="password" value={userData} change={setUserData} />
                    <button
                        onClick={onSignInHandle}
                        disabled={loading}
                        className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    If you don't have an account, no worries!{" "}
                    <a
                        onClick={onSignUpHandle}
                        className="font-semibold cursor-pointer text-indigo-600 hover:text-indigo-500"
                    >
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
