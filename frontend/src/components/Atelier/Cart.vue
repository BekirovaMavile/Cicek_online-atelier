<template>
<v-container fluid>
    <v-img src="../../../public/image/login.jpg" max-height="220" max-width="220" class="d-flex mx-auto my-auto mt-2 mb-3"></v-img>
    <v-btn @click="makeCards" color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px" variant="outlined">
        Загрузить данные заказа
    </v-btn>

    <v-container v-show="emptyBasket">
        <v-row justify="center" class="mt-8 mb-4 text-center">
            <v-img src="../../../public/image/emptyBasket.png" max-height="320" max-width="320" class="d-flex mx-auto my-auto mt-2 mb-3"></v-img>
        </v-row>
        <v-row justify="center" class="mt-8 mb-4 text-center">
            <h1 style="color: #252525;" class="text-center">{{ messageBasket }}</h1>
        </v-row>
    </v-container>

    <v-container v-show="!emptyBasket && messageBasket=='Заказ оформлен'">
        <v-row justify="center" class="mt-8 mb-4 text-center">
            <v-img src="../../../public/image/fullBasket.png" max-height="320" max-width="320" class="d-flex mx-auto my-auto mt-2 mb-3"></v-img>
        </v-row>
        <v-row justify="center" class="mt-8 mb-4 text-center">
            <h1 style="color: #252525;" class="text-center">{{ messageBasket }}</h1>
        </v-row>
    </v-container>

    <v-container v-show="infoProduct">
        <v-row justify="center" class="mt-8 mb-4 text-center">
            <v-col v-for="(card, index) in cardData" :key="index" cols="12" md="6" lg="4" class="d-flex justify-center align-center">
                <v-card :width="300" class="text-center mb-4">
                    <h2 class="text-center" style="color: rgba(232, 12, 108, 0.7)">
                        {{ card.title }}
                    </h2>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item v-for="(detail, detailIndex) in card.details" :key="detailIndex">
                            {{ detail }}
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-row>
        <v-col cols="12" class="text-right">
            <h3>Итого: XXX руб.</h3>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" class="text-right">
            <v-btn @click="CreateOrder" color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px" variant="outlined">Оформить заказ</v-btn>
        </v-col>
    </v-row>

    <!-- Сообщение о ошибке -->
    <v-dialog v-model="error" max-width="700">
        <v-card>
            <v-card-title style="padding: 30px 30px 5px 30px;" class="headline">{{ messageError }}</v-card-title>
            <p style="padding-left: 30px" class="headline">Список своих заказов вы можете просмотреть на странице профиля.</p>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="rgba(255, 83, 143, 0.902)" @click="error = false">Закрыть</v-btn>
                <v-btn color="rgba(232, 12, 108, 0.9)" @click="error = false" variant="outlined" to="/parametr">К созданию</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import Cookies from "js-cookie";
import axios, {
    all
} from "axios";
import {
    getMyCookie
} from "@/plugins/cookie";

export default {
    data: () => ({
        productcategories: [],
        parts: [],
        productsizes: [],
        products: [],
        colors: [],
        menu: false,
        cardData: [],
        messageBasket: "Ваша корзина пуста",
        messageError: "Возникла ошибка",
        emptyBasket: true,
        infoProduct: false,
        error: false,
    }),
    mounted() {
        this.getProdCats();
        this.getProds();
        this.getProdSizes();
        this.getColors();
        this.getParts();
    },
    methods: {
        getProdCats() {
            axios
                .get("http://localhost:3000/api/productcategory/")
                .then((response) => {
                    this.productcategories = response.data;
                    // console.log(this.productcategories);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },

        getProds() {
            // Проверка наличия Cookie
            const productValueCookie = Cookies.get('products');
            if (!productValueCookie) {
                console.log('Cookie с именем "products" не существует');
                console.log(Cookies.get('products'));
                return false;
            }
            console.log('Cookie с именем "products" существует');
            this.emptyBasket = false;
            this.messageBasket = "Корзина не пуста"
            // Получение массива товаров из cookies
            console.log(productValueCookie);

            // Обновление состояния компонента
            this.products = JSON.parse(productValueCookie);
            console.log(this.products);
            return this.products
        },

        getProdSizes() {
            axios
                .get("http://localhost:3000/api/productsize")
                .then((response) => {
                    this.productsizes = response.data;
                    // console.log(this.productsizes);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        getColors() {
            axios
                .get("http://localhost:3000/api/color")
                .then((response) => {
                    this.colors = response.data;
                    // console.log(this.colors);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        async getParts() {
            axios
                .get("http://localhost:3000/api/part")
                .then((response) => {
                    this.parts = response.data;
                    console.log(this.parts);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        makeCards() {
            this.infoProduct = true;
            const cookieProd = this.getProds();
            if (!cookieProd) {
                this.error = true;
                this.messageError = "Заказ уже оформлени или корзина пуста";
                return;
            }

            this.cardData = [];
            this.products.map(async (item) => {
                let card = {
                    buttonText: "Не придумал, что писать",
                    title: "",
                    details: [],
                    menu: false,
                };

                card.title = this.productcategories.find(
                    (category) =>
                    category.id === Number(this.products[0].product_categories_id)
                ).name;

                card.details.push(
                    this.colors.find((color) => color.id === Number(item.color_id)).name
                );

                card.details.push(
                    this.productsizes.find(
                        (size) => size.id === Number(item.product_size_id)
                    ).name
                );

                const prods_parts = [];
                item.part_ids.map((part) => prods_parts.push(Number(part)));
                // console.log(prods_parts)
                // const res_parts = this.parts.find(
                //   (part) => prods_parts.indexOf(part.id).name
                // );
                const all_parts_ids = [];
                this.parts.forEach((part) => all_parts_ids.push(part.id));

                this.parts.map((part) => {
                    if (prods_parts.includes(part.id)) {
                        card.details.push(part.name);
                    }
                });
                this.cardData.push(card);
            });
        },

        createUserOrder() {
            let token = getMyCookie()

            if (!token) {
                this.error = true;
                this.messageError = "Для офрмления заказа войдти в свой профиль";
                return false;
            }
            if(!Cookies.get('products')){
                this.error = true;
                this.messageError = "Заказ уже оформлени или корзина пуста";
                return 
            }
            axios.post('http://localhost:3000/api/orders/', {}, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                    return false
                });
            return true
        },

        async CreateOrder() {
            if (!this.createUserOrder()) {
                return
            }

            const productsObject = this.getProds()
            if (!productsObject) {
                this.error = true;
                this.messageError = "Заказ уже оформлени или корзина пуста";
                return;
            }
            for (let key in productsObject) {
                console.log(productsObject[key]);
                const response = await axios.post('http://localhost:3000/api/product/', productsObject[key]);
                console.log(response);
            }
            Cookies.remove('products');
            this.messageBasket = "Заказ оформлен";
            this.infoProduct = false;
        },

    },
};
</script>

<!-- 

<style scoped>
.custom-button {
    background-color: rgba(232, 12, 108, 0.25);
    color: black;
    border: none;
    border-radius: 50px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.custom-button:hover {
    background-color: #e80c6c;
    color: black;
}
</style> -->
