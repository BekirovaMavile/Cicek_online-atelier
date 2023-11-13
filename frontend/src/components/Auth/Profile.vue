<template>
    <v-container class="profile-page">
        <v-row>
            <v-col cols="12" md="4">
                <!-- Блок с информацией о пользователе -->
                <v-card class="user-info-card">
                    <v-img src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light" class="avatar"></v-img>
                    <v-card-title class="text-center" v-if="!loadingUser">{{ this.user.first_name }}</v-card-title>
                    <v-card-subtitle class="text-center" v-if="!loadingUser">{{ this.user.email }}</v-card-subtitle>
                    <v-card-text>
                        <v-list>
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-account</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Имя:</v-list-item-title>
                                    <v-list-item-subtitle v-if="!loadingUser">{{ this.user.first_name
                                        }}</v-list-item-subtitle>
                                    <v-list-item-title>Фамилия:</v-list-item-title>
                                    <v-list-item-subtitle v-if="!loadingUser">{{ this.user.last_name
                                        }}</v-list-item-subtitle>
                                    <v-list-item-title>Адресс:</v-list-item-title>
                                    <v-list-item-subtitle v-if="!loadingUser">{{ this.user.address || "Отсутсвует"
                                        }}</v-list-item-subtitle>
                                    <v-list-item-title>Номер телефона:</v-list-item-title>
                                    <v-list-item-subtitle v-if="!loadingUser">{{ this.user.phone_number || "Отсутсвует"
                                        }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-btn rounded="" color="blue-grey-lighten-3">Изменить данные</v-btn>
                    <br>
                    <br>
                    <v-btn rounded="" @click="logout" color="blue-grey-lighten-3">Выйти</v-btn>
                </v-card>
            </v-col>
            <v-col cols="12" md="8">
                <!-- Блок с заказами пользователя -->
                <v-card class="orders-card">
                    <v-card-title>Мои заказы</v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="order in this.orders" :key="order.id">
                                <v-list-item-content>
                                    <v-list-item-title v-if="!loadingOrder">Заказ №{{ order.id }}</v-list-item-title>
                                    <v-list-item-subtitle v-if="!loadingOrder">Статус: {{ order.status
                                        }}</v-list-item-subtitle>
                                    <v-list-item-subtitle v-if="!loadingOrder">Дата создания: {{ order.createdAt
                                        }}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn rounded="" color="blue-grey-lighten-3" class="mt-3">Подробнее</v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    </template>
    
    <script>
    import axios from 'axios';
    import {getMyCookie } from '@/plugins/cookie'
    
    export default {
        data() {
            return {
                user: null,
                orders: null,
                loadingUser: true,
                loadingOrder: true,
                // first_name: "JohnDoe",
                // last_name: "JohnDoe",
                // email: "johndoe@example.com",
                // name: "John Doe",
                // birthdate: "-",
            };
        },
        mounted() {
            this.infoUserOrder();
            this.infoUser();
        },
        methods: {
            logout() {
                // Удаляем JWT-токен из localStorage
                localStorage.removeItem('accessToken');
    
                // Далее можно добавить запрос на сервер для удаления refreshToken,
                // если это необходимо
                // axios.post('http://localhost:3000/api/user/logout').then(response => {
                //     if (response.status === 204) {
                //         localStorage.removeItem('accessToken'); // Удаляем JWT-токен
                //         this.$router.push({ name: 'login' }); // Перенаправляем на страницу входа
                //     }
                // }).catch(error => {
                //     console.error('Ошибка при выходе:', error);
                // });
                this.$router.push({
                    name: 'login'
                }); // Перенаправляем на страницу входа
            },
    
            infoUser() {
                let token = getMyCookie()
                axios.get('http://localhost:3000/api/user/myprofile', {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(response => {
                        this.user = response.data;
                        this.loadingUser = false;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
    
            infoUserOrder() {
                let token = getMyCookie()
                axios.get('http://localhost:3000/api/orders/user', {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(response => {
                        this.orders = response.data;
                        this.loadingOrder = false;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
    };
    </script>
    
    <style>
    .profile-page {
        padding-top: 20px;
    }
    
    .avatar {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin: 0 auto;
    }
    
    .user-info-card {
        text-align: center;
        padding: 16px;
    }
    
    .orders-card {
        padding: 16px;
    }
    </style>
    