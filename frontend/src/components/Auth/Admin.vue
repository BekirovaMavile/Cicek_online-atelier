<template>
    <v-container>
        <v-img src="../../../public/image/login.jpg" max-height="220" max-width="220"
          class="d-flex mx-auto my-auto mt-3"></v-img>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="headline">Панель администратора</v-card-title>
                    <v-card-text>
                        <v-form>
                            <!-- Форма для добавления цвета -->
                            <v-text-field label="Цвет" v-model="color" clearable></v-text-field>
                            <v-file-input label="Изображение цвета" v-model="colorImage" clearable></v-file-input>

                            <!-- Форма для добавления материала -->
                            <v-text-field label="Материал" v-model="material" clearable></v-text-field>
                            <v-file-input label="Изображение материала" v-model="materialImage" clearable></v-file-input>

                            <!-- Форма для добавления размера одежды -->
                            <v-text-field label="Размер одежды" v-model="size" clearable></v-text-field>
                            <v-file-input label="Изображение размера" v-model="sizeImage" clearable></v-file-input>

                            <!-- Добавление изображений для каждой категории -->
                            <v-text-field label="Категория" v-model="category" clearable></v-text-field>
                            <v-file-input label="Изображение категории" v-model="categoryImage" clearable></v-file-input>

                            <!-- Форма для добавления части категории -->
                  <v-text-field label="Часть категории" v-model="subCategory" clearable></v-text-field>

                  <v-text-field label="Значение для части категории" v-model="subCategoryValue" clearable></v-text-field>
    <v-file-input label="Изображение части категории" v-model="subCategoryImage" clearable></v-file-input>
                            <!-- Кнопка для отправки данных -->
                            <v-btn rounded color="blue-grey-lighten-3" @click="addData">Добавить данные</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            color: "",
            colorImage: null,
            material: "",
            materialImage: null,
            size: "",
            sizeImage: null,
            category: "",
            categoryImage: null,
            subCategory: "",
            subCategoryValue: "",
            subCategoryImage: null,

        };
    },
    methods: {
        addData() {
            // добавить отправку данных на сервер
        },
    },
};
</script>
