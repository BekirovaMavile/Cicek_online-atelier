<template>
<v-img src="../../../public/image/login.jpg" max-height="220" max-width="220" class="d-flex mx-auto my-auto mt-2 mb-3"></v-img>
<h3 class="d-flex flex-column justify-center align-center mt-8 mb-8">
    ВЫБЕРИТЕ КАТЕГОРИЮ ОДЕЖДЫ:
</h3>
            <div>
                <v-col class="d-flex child-flex" cols="12">
            <v-row justify="center">
                    <v-card class="mb-4 ml-6 mt-2">
                        <v-card-title class="text-center" >Платье</v-card-title>
                        <v-img src="../../../public/image/3.webp" height="350" width="350"></v-img>
                        <v-card-actions>
                            <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" to="/constructorDress">Перейти</v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card class="mb-4 ml-6 mt-2">
                            <v-card-title class="text-center">Худи</v-card-title>
                            <v-img src="../../../public/image/hudi2.webp" height="350" width="350"></v-img>
                            <v-card-actions>
                                <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" to="/constructorHudi">Перейти</v-btn>
                            </v-card-actions>
                        </v-card>

                        <v-card class="mb-4 ml-6 mt-2">
                            <v-card-title class="text-center">Футболка</v-card-title>
                            <v-img src="../../../public/image/1.jpeg" height="350" width="350"></v-img>
                            <v-card-actions>
                                <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" to="/constructorShirt">Перейти</v-btn>
                            </v-card-actions>
                        </v-card>

                        <v-card class="mb-4 ml-6 mt-2">
                            <v-card-title class="text-center">Юбка</v-card-title>
                            <v-img src="../../../public/image/5.webp" height="350" width="350"></v-img>
                            <v-card-actions>
                                <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" to="/constructorSkirt">Перейти</v-btn>
                            </v-card-actions>
                        </v-card>

                        <v-card class="mb-4 ml-6 mt-2">
                            <v-card-title class="text-center">Брюки</v-card-title>
                            <v-img src="../../../public/image/4.jpeg" height="350" width="350"></v-img>
                            <v-card-actions>
                                <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" to="/constructorPants">Перейти</v-btn>
                            </v-card-actions>
                        </v-card>
            </v-row>
            </v-col>
            </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            productcategories: [],
        };
    },
    mounted() {
        this.loadProdCats();
    },
    methods: {
        async loadProdCats() {
            await axios
                .get(process.env.VUE_APP_URL + "/api/productcategory/")
                .then((response) => {
                    this.productcategories = response.data.map((category) => {
                        category.path = `/constructor/${category.name.toLowerCase()}`;
                        return category;
                    });
                    console.log(this.productcategories);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        goToCategory(category) {
            // Переход на страницу, определенную в поле path
            // this.$router.push(category.path);
            this.$router.push(path);
        },
        getImagePath(category) {
            switch (category.toLowerCase()) {
                case 'платье':
                    return '/image/constructorDress/3.webp';
                case 'футболка':
                    return '/image/constructorShirt/1.jpeg';
                case 'худи':
                    return '/image/hudi2.webp';
                case 'брюки':
                    return '/image/constructorPants/4.jpeg';
                case 'юбка':
                    return '/image/constructorSkirt/5.webp'
                default:
                    return '';
            }
        },
    },
};
</script>
