<template>
<v-container class="profile-page">
    <v-row>
        <v-col cols="12" md="4">
            <!-- Блок с информацией о пользователе -->
            <v-card class="user-info-card">
                <v-img v-if="user && user.role === 'ATELIER'" src="../../../public/image/logo_atelier.png" class="avatar"></v-img>
                <v-img class="avatar" v-else-if="user && user.role === 'USER'" src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
                <!-- <v-img src="../../../public/image/logo_atelier.png" class="avatar"></v-img> -->
                <!-- <v-img :src="this.user && this.user.role === 'ATELIER' ? '/img/login.jpg' : ''" class="avatar"></v-img> -->

                <v-card-title class="text-center" v-if="!loadingUser">{{ this.user.first_name }}</v-card-title>
                <v-card-subtitle class="text-center" v-if="!loadingUser">{{ this.user.email }}</v-card-subtitle>
                <v-card-text>
                    <v-list>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ this.user && this.user.role === 'ATELIER' ? 'Название:' : 'Имя:' }}</v-list-item-title>
                                <v-list-item-subtitle v-if="!loadingUser">{{ this.user.first_name }}</v-list-item-subtitle>

                                <v-list-item-title v-if="this.user && this.user.role !== 'ATELIER'"><br>Фамилия:</v-list-item-title>
                                <v-list-item-subtitle v-if="!loadingUser && this.user && this.user.role !== 'ATELIER'">{{ this.user.last_name }}</v-list-item-subtitle>

                                <v-list-item-title><br>Адрес:</v-list-item-title>
                                <v-list-item-subtitle v-if="!loadingUser">{{ this.user.address || "Отсутсвует" }}</v-list-item-subtitle>
                                <br>
                                <v-list-item-title>Номер телефона:</v-list-item-title>
                                <v-list-item-subtitle v-if="!loadingUser">{{ this.user.phone_number || "Отсутсвует" }}</v-list-item-subtitle>
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

            <!-- Блок с заказами юзера -->
            <v-card class="orders-card" v-if="this.user && user.role == 'USER'">
                <v-card-title>Мои заказы</v-card-title>
                <v-card-text>
                    <v-list>
                        <v-list-item v-for="order in this.orders" :key="order.id">
                            <v-list-item-content>
                                <v-list-item-title v-if="!loadingOrder">Заказ №{{ order.id }}</v-list-item-title>
                                <v-list-item-subtitle v-if="!loadingOrder">Статус: {{ order.status }}</v-list-item-subtitle>
                                <v-list-item-subtitle v-if="!loadingOrder">Дата создания: {{ order.createdAt }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <!-- <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" class="mt-3">Подробнее</v-btn> -->
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>

            <!-- Блок со свободными заказами -->
            <v-card class="orders-card" style="margin-top: 20px;" v-if="this.user && this.user.role === 'ATELIER'">
                <v-card-title>Свободные заказы</v-card-title>
                <v-card-text>
                    <v-list>
                        <v-list-item v-for="order in filteredOrders" :key="order.id">
                            <v-list-item-content>
                                <v-list-item-title v-if="!loadingOrder">Заказ №{{ order.id }}</v-list-item-title>
                                <v-list-item-subtitle v-if="!loadingOrder">Статус: {{ order.status }}</v-list-item-subtitle>
                                <v-list-item-subtitle v-if="!loadingOrder">Дата создания: {{ order.createdAt }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn color="blue" style="border-radius: 15px; margin-right: 20px;" variant="outlined" class="mt-3" @click="updateStatusOrder('В процессе', order.id)">Принять заказ</v-btn>
                                <!-- <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" class="mt-3">Подробнее</v-btn> -->
                            </v-list-item-action>
                        </v-list-item>
                        <!-- <h2 style="color: rgb(202, 202, 202); font-weight: 600;" v-if="!filteredOrders.length">Заказы отсутствуют</h2> -->
                    </v-list>
                </v-card-text>
            </v-card>

            <!-- Блок с принятыми заказами -->
            <v-card class="orders-card" style="margin-top: 20px;" v-if="this.user && this.user.role === 'ATELIER'">
                <v-card-title>Принятые заказы</v-card-title>
                <v-card-text>
                    <v-list>
                        <v-list-item v-for="order in this.allOrders.filter(o => o.status === 'В процессе')" :key="order.id">
                            <v-list-item-content>
                                {{ order.atelier_id }}
                                <v-list-item-title v-if="!loadingOrder">Заказ №{{ order.id }}</v-list-item-title>
                                <v-list-item-subtitle v-if="!loadingOrder">Статус: {{ order.status }}</v-list-item-subtitle>
                                <v-list-item-subtitle v-if="!loadingOrder">Дата создания: {{ order.createdAt }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn color="blue" style="border-radius: 15px; margin-right: 20px;" variant="outlined" class="mt-3" @click="updateStatusOrder('Завершен', order.id)">Завершить заказ</v-btn>
                                <!-- <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" class="mt-3">Подробнее</v-btn> -->
                            </v-list-item-action>
                        </v-list-item>
                        <!-- <h2 style="color: rgb(202, 202, 202); font-weight: 600;" v-if="!this.orders.filter(o => o.status === 'В процессе').length">Заказы отсутствуют</h2> -->
                    </v-list>
                </v-card-text>
            </v-card>

            <!-- Блок с выполненными заказами -->
            <v-card class="orders-card" style="margin-top: 20px;" v-if="this.user && this.user.role === 'ATELIER'">
                <v-card-title>Завершенные заказы</v-card-title>
                <v-card-text>
                    <v-list>
                        <v-list-item v-for="order in this.allOrders.filter(o => o.status === 'Завершен')" :key="order.id" >
                            <v-list-item-content>
                                <v-list-item-title v-if="!loadingOrder">Заказ №{{ order.id }}</v-list-item-title>
                                <v-list-item-subtitle v-if="!loadingOrder">Статус: {{ order.status
                                    }}</v-list-item-subtitle>
                                <v-list-item-subtitle v-if="!loadingOrder">Дата создания: {{ order.createdAt
                                    }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <!-- <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" class="mt-3">Подробнее</v-btn> -->
                            </v-list-item-action>
                        </v-list-item>
                        <!-- <h2 style="color: rgb(202, 202, 202); font-weight: 600;" v-if="!this.orders.filter(o => o.status === 'Завершен').length">Заказы отсутствуют</h2> -->
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
                        <v-text-field :label="this.user && this.user.role === 'ATELIER' ? 'Название' : 'Имя'" v-model="user.first_name"></v-text-field>
                    </v-col>
                    <v-col cols="12" v-if="user.role !== 'ATELIER'">
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
import {
    getMyCookie
} from '@/plugins/cookie'
import Cookies from "js-cookie";

export default {
    data() {
        return {
            dialog: false,
            user: null,
            orders: null,
            allOrders: [],
            userOrders: null,
            loadingUser: true,
            loadingOrder: true,
            newOrder: ''
        };
    },
    computed: {
        filteredOrders() {
            return this.allOrders.filter(o => o.status === 'В обработке');
        }
    },
    mounted() {
        this.infoUserOrder();
        this.infoUser();
        this.infoAllOrders();
    },
    methods: {
        logout() {
            Cookies.remove('CookieEmail');
            console.log(getMyCookie());
            this.$router.push({
                name: 'login'
            });
        },

        updateStatusOrder(newStatus, id) {
            let token = getMyCookie()
            axios.put(process.env.VUE_APP_URL + '/api/orders/status', {
                    newStatus,
                    id,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => {
                    this.newOrder = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },

        infoUser() {
            let token = getMyCookie()
            axios.get(process.env.VUE_APP_URL + '/api/user/myprofile/', {
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
            axios.get(process.env.VUE_APP_URL + '/api/orders/user', {
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

        infoAllOrders() {
            axios.get(process.env.VUE_APP_URL + '/api/orders/')
                .then(response => {
                    this.allOrders = response.data;
                    this.loadingOrder = false;
                })
                .catch(error => {
                    console.error(error);
                });
        },

        updateUserInfo() {
            let token = getMyCookie()
            axios.put(process.env.VUE_APP_URL + '/api/user/update', this.user, {
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
