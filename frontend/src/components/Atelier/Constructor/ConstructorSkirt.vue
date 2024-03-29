<template>
<v-card>
    <v-tabs v-model="tab" color="blue-grey-darken-4" align-tabs="center">
        <v-tab v-for="(item, index) in partCategories" :key="index" :value="index + 1">
            {{ item.name }}
        </v-tab>
        <v-tab :value="partCategoriesLen + 1">Цвет</v-tab>
        <v-tab :value="partCategoriesLen + 2">Размер</v-tab>
        <v-tab :value="partCategoriesLen + 3">Итого</v-tab>
    </v-tabs>
    <v-window v-model="tab">
        <v-window-item v-for="n in 20" :key="n" :value="n">
            <v-container fluid>
                <div v-for="(item, key, index) in parts" :key="index">
                    <v-row class="mb-12" v-if="n === index + 1">
                        <v-col class="d-flex child-flex" cols="12">
                            <v-row justify="center">
                                <v-card v-for="(part, index) in parts[key]" :key="index" class="mr-4">
                                    <v-row align="center" justify="center">
                                        <v-img :src="part.icon" aspect-ratio="1" height="450" width="450"></v-img>
                                    </v-row>
                                    <v-radio-group class="ml-2 mt-2" v-model="selectedValue[key]">
                                        <v-radio :label="part.name" :value="part"></v-radio>
                                    </v-radio-group>
                                </v-card>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
                <!-- Цвет -->
                <v-row class="mb-12" v-if="n === partCategoriesLen + 1">
                    <v-col cols="12" sm="12">
                        <v-card class="d-flex align-center justify-center" style="width: 100%">
                            <v-row>
                                <v-col v-for="(color, index) in colors" :key="index" cols="12" sm="3">
                                    <v-card style="width: 200px; height: 250px">
                                        <v-radio-group v-model="selectedColor">
                                            <v-radio :label="color.name" :value="color"></v-radio>
                                        </v-radio-group>
                                        <v-img :src="color.icon" aspect-ratio="1" max-height="150" max-width="150"></v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>

                <!-- Размер -->
                <v-row v-if="n === partCategoriesLen + 2">
                    <v-container>
                        <v-combobox label="Выберите ваш размер" :items="[
                  'XS-44',
                  'S-46',
                  'M-48',
                  'L-50',
                  'XL-52',
                  '2XL-54',
                  '3XL-56',
                  '4XL-58',
                ]" v-model="selectedSize"></v-combobox>
                        <v-text-field label="Рост" variant="outlined"></v-text-field>
                        <v-text-field label="Обхват груди" variant="outlined"></v-text-field>
                        <v-text-field label="Обхват бёдер" variant="outlined"></v-text-field>
                    </v-container>
                </v-row>

                <!-- Итог -->
                <v-row v-if="n === partCategoriesLen + 3">
                    <v-container>
                        <ul>
                            <li v-for="(value, key) in selectedValue" :key="key" v-if="value && value.name">
                                {{ value.name }}
                            </li>
                            <li v-if="selectedColor && selectedColor.name">Цвет: {{ selectedColor.name }}</li>
                            <li v-if="selectedSize">Размер: {{ selectedSize }}</li>
                        </ul>
                        <v-row>
                            <v-col cols="12" class="text-right">
                                <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px" variant="outlined" @click="sendProductAndOpenModal">Оформить заказ</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-row>

                <v-dialog v-model="confirmationModal" max-width="600">
                    <v-card>
                        <v-card-title class="headline">Для оформления заказа перейдите в корзину.</v-card-title>
                        <v-card-actions>
                            <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" @click="redirectToCart">Перейти в корзину</v-btn>
                            <v-btn color="rgba(232, 12, 108, 0.9)" variant="text" @click="closeConfirmationModal">Закрыть</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-container>
        </v-window-item>
    </v-window>
</v-card>
</template>

<script>
import Cookies from "js-cookie";

import axios from "axios";
export default {
    data: () => ({
        confirmationModal: false,
        selectedColor: null,
        selectedSize: null,
        selectedValue: {},
        tab: null,
        partCategoriesLen: 0,
        partCategories: null,
        selectedLengths: {},
        colors: null,
        parts: {},
    }),
    mounted() {
        this.getColors();
        this.getPartCategories();
        this.getParts();
    },
    methods: {
        sendProduct() {
            const part_ids = Object.values(this.selectedValue).map(
                (part_id) => part_id.id
            );

            const newProduct = {
                price: "1000",
                description: "description",
                color_id: String(this.selectedColor.id),
                material_id: "1",
                product_size_id: "1",
                product_categories_id: "5",
                part_ids: part_ids,
            };

            // Получение текущего массива из cookies
            const existingProducts = Cookies.get("products");

            // Парсинг JSON строки в массив (если существует)
            const parsedProducts = existingProducts ?
                JSON.parse(existingProducts) : [];

            // Добавление нового объекта в массив
            parsedProducts.push(newProduct);

            // Сохранение массива в cookies
            Cookies.set("products", JSON.stringify(parsedProducts));
        },
        getColors() {
            axios
                .get(process.env.VUE_APP_URL + "/api/color")
                .then((response) => {
                    this.colors = response.data;
                    console.log(this.myColors);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        getPartCategories() {
            axios
                .get(process.env.VUE_APP_URL + "/api/partcategory", {
                    params: {
                        productCategoryId: 5,
                    },
                })
                .then((response) => {
                    this.partCategories = response.data;
                    this.partCategoriesLen = this.partCategories.length;

                    this.partCategories.forEach((category) => {
                        this.parts[String(category.id)] = [];
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        getParts() {
            axios
                .get(process.env.VUE_APP_URL + "/api/part")
                .then((response) => {
                    response.data.forEach((obj) => {
                        if (this.parts.hasOwnProperty(obj.part_category_id)) {
                            this.parts[obj.part_category_id].push(obj);
                        }
                    });
                    console.log(this.parts);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        openConfirmationModal() {
            this.confirmationModal = true;
        },
        closeConfirmationModal() {
            this.confirmationModal = false;
        },
        redirectToCart() {
            this.$router.push("/cart");
        },
        sendProductAndOpenModal() {
            this.sendProduct();
            this.openConfirmationModal();
        },
    },
};
//
</script>
