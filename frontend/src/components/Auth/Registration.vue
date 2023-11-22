<template>
    <v-container class="mt-10 mb-10">
        <v-row>
            <v-col cols="12" md="6" class="text-center mt-6 mb-10">
                <h1 class="display-2 mb-6">ДОБРО ПОЖАЛОВАТЬ!</h1>
                <p class="subtitle-1">
                    Введите имя, фамилию, электронный адрес и пароль для регистрации. Если у вас уже есть аккаунт, введите
                    свой электронный адрес и пароль.
                </p>
            </v-col>

            <v-col cols="12" md="6">
                <v-col cols="auto">
                    <v-img src="../../../public/image/login.jpg" max-height="220" max-width="220"></v-img>
                </v-col>
                <v-form ref="form" @submit.prevent="submitForm">
                    <v-text-field v-model="first_name" :rules="nameRules" label="Введите имя пользователя"></v-text-field>
                    <v-text-field v-model="last_name" :rules="nameRules"
                        label="Введите фамилию пользователя"></v-text-field>
                    <v-text-field v-model="email" :rules="emailRules" label="Введите электронный адрес"></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" type="password"
                        label="Введите пароль"></v-text-field>
                    <v-text-field v-model="confirmPassword" :rules="confirmPasswordRules" type="password"
                        label="Подтвердите пароль"></v-text-field>
                    <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" type="submit">Зарегистрироваться</v-btn>
                    <p class="mt-5">Уже есть аккаунт? <a href="/login" class="login">Войдите.</a></p>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import { setMyCookie } from "@/plugins/cookie";
// import { baseURL } from 'config';
export default {
    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    },
    computed: {
        nameRules() {
            return [
                v => !!v || 'Поле должно быть заполнено',
                v => (v && v.length >= 2) || 'Имя должно содержать не менее 2 символов',
            ];
        },
        emailRules() {
            return [
                v => !!v || 'Поле должно быть заполнено',
                v => /.+@.+\..+/.test(v) || 'Введите действительный адрес электронной почты',
            ];
        },
        passwordRules() {
            return [
                v => !!v || 'Поле должно быть заполнено',
                v => (v && v.length >= 6) || 'Пароль должен содержать не менее 6 символов',
            ];
        },
        confirmPasswordRules() {
            return [
                v => !!v || 'Поле должно быть заполнено',
                v => v === this.password || 'Пароли не совпадают',
            ];
        },
    },
    methods: {
        async submitForm() {
            if (this.$refs.form.validate()) {
                try {
                    // Отправка данных на сервер и получение токена
                    const response = await axios.post(`${process.env.VUE_APP_BASEURL}/api/user/registration`, {
                        email: this.email,
                        password: this.password,
                        first_name: this.first_name,
                        last_name: this.last_name,
                    });

                    if (response.data.accessToken) {
                        setMyCookie(response.data.accessToken)
                        // Перенаправление на страницу пользователя
                        this.$router.push({ name: 'profile' });
                    } else {
                        console.log('Регистрация не удалась');
                    }
                } catch (error) {
                    // Обработка ошибок
                    // ...
                }
            }
        },
    },
};
</script>

<style>
a.login {
    color: #497DDD;
    text-decoration: none;
}
</style>