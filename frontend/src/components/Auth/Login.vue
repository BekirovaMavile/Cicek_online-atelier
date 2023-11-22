<template>
    <v-container class="mt-10 mb-10">
        <v-row>
            <v-col cols="12" md="6" class="text-center mt-6 mb-10">
                <h1 class="display-2 mb-6">ДОБРО ПОЖАЛОВАТЬ!</h1>
                <p class="subtitle-1">
                    Введите свой электронный адрес и пароль для входа в свой профиль. Если вы еще не зарегистрированы,
                    пожалуйста, пройдите процесс регистрации.
                </p>
            </v-col>
<!--  -->
            <v-col cols="12" md="6">
                <v-col cols="auto">
                    <v-img src="../../../public/image/login.jpg" max-height="220" max-width="220"></v-img>
                </v-col>
                <v-form ref="form" @submit.prevent="login">
                    <v-text-field v-model="email" :rules="emailRules" label="Электронный адрес"></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" type="password" label="Пароль"></v-text-field>
                    <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" type="submit">Войти</v-btn>
                    <p class="mt-5">Еще нет аккаунта? <a href="/registration" class="login">Зарегистрируйтесь.</a></p>
                    <p class="mt-5"><a href="/admin" class="login">Вход</a> для администратора</p>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import { setMyCookie } from "@/plugins/cookie";
import { baseURL } from 'config';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    computed: {
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
    },
    methods: {
        async login() {
            if (this.$refs.form.validate()) {
                try {
                    const response = await axios.post(`${baseURL}/api/user/auth`, {
                        email: this.email,
                        password: this.password,
                    });

                    // Проверка успешного входа
                    if (response.data.accessToken) {
                        console.log(response.data.accessToken);
                        setMyCookie(response.data.accessToken)
                        // Перенаправление на страницу пользователя
                        this.$router.push({ name: 'profile' });
                    } else {
                        console.log('Вход не удался');
                    }
                } catch (error) {
                    console.error('Произошла ошибка при входе:', error);
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
