<template>
    <v-container class="profile-page">
        <v-row>
            <v-col cols="12" md="4">
                <!-- Блок с информацией о пользователе -->
                <v-card class="user-info-card">
                    <v-img
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                        class="avatar"></v-img>
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
                                    <br>
                                    <v-list-item-title>Фамилия:</v-list-item-title>
                                    <v-list-item-subtitle v-if="!loadingUser">{{ this.user.last_name
                                    }}</v-list-item-subtitle>
                                    <br>
                                    <v-list-item-title>Адрес:</v-list-item-title>
                                    <v-list-item-subtitle v-if="!loadingUser">{{ this.user.address || "Отсутствует"
                                    }}</v-list-item-subtitle>
                                    <br>
                                    <v-list-item-title>Номер телефона:</v-list-item-title>
                                    <v-list-item-subtitle v-if="!loadingUser">{{ this.user.phone_number || "Отсутствует"
                                    }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>

                    <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" v-bind="attrs" v-on="on" @click="dialog = true">Изменить
                        данные</v-btn>
                    <br>
                    <br>
                    <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" @click="logout">Выйти</v-btn>
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
                                    <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" class="mt-3">Подробнее</v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Форма для изменения профиля</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Имя" v-model="user.first_name"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Фамилия" v-model="user.last_name"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Номер Телефона" v-model="user.phone_number"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Адресс" v-model="user.address"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="rgba(232, 12, 108, 0.9)" variant="text" text @click="dialog = false">Close</v-btn>
                <v-btn color="rgba(232, 12, 108, 0.9)" variant="text" text type="submit" @click="updateUserInfo">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
    
<script>
import axios from 'axios';
import { getMyCookie } from '@/plugins/cookie'
import Cookies from "js-cookie";

export default {
    data() {
        return {
            dialog: false,
            user: null,
            orders: null,
            loadingUser: true,
            loadingOrder: true,
        };
    },
    mounted() {
        this.infoUserOrder();
        this.infoUser();
    },
    methods: {
        logout() {
            Cookies.remove('CookieEmail');
            console.log(getMyCookie());
            this.$router.push({
                name: 'login'
            });
        },

        infoUser() {
            let token = getMyCookie()
            axios.get(`${process.env.VUE_APP_BASEURL}/api/user/myprofile/`, {
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
            axios.get(`${process.env.VUE_APP_BASEURL}/api/orders/user`, {
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
        },

        updateUserInfo() {
            let token = getMyCookie()
            axios.put(`${process.env.VUE_APP_BASEURL}/api/user/update`, this.user,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => {
                    this.user = response.data;
                    this.loadingUser = false;
                    this.dialog = false;
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