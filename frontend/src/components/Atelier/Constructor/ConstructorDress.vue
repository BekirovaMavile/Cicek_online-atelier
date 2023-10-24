<template>
  <v-card>
    <v-tabs v-model="tab" color="blue-grey-darken-4" align-tabs="center">
      <v-tab :value="1">Длина</v-tab>
      <v-tab :value="2">Карман</v-tab>
      <v-tab :value="3">Рукав</v-tab>
      <v-tab :value="4">Горловина</v-tab>
      <v-tab :value="5">Цвет</v-tab>
      <v-tab :value="6">Размер</v-tab>
      <v-tab :value="7">Итого</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="n in 10" :key="n" :value="n">
        <v-container fluid>
          <!-- Длина -->
          <v-row class="mb-12" v-if="n === 1">
            <v-col class="d-flex child-flex" cols="12">
              <v-row justify="center">
                <v-img v-for="image in images[n]" :key="image" :src="image" aspect-ratio="1" max-height="450"></v-img>
              </v-row>
            </v-col>
            <v-row justify="center">
              <v-col v-for="(checkbox, index) in chexbox[n]" :key="index" cols="6" sm="6">
                <v-radio-group class="ml-12" v-model="selectedLenght">
                    <v-radio :label="checkbox" :value="checkbox"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-row>
          <!-- Карман -->
          <v-row class="mb-12" v-if="n === 2">
            <v-col class="d-flex child-flex" cols="12">
              <v-row justify="center">
                <v-img v-for="image in images[n]" :key="image" :src="image" aspect-ratio="1" max-height="450"></v-img>
              </v-row>
            </v-col>
            <v-row justify="center">
              <v-col v-for="(checkbox, index) in chexbox[n]" :key="index" cols="6" sm="6">
                <v-radio-group class="ml-12" v-model="selectedPocket">
                      <v-radio :label="checkbox" :value="checkbox"></v-radio>
                  </v-radio-group>
              </v-col>
            </v-row>
          </v-row>
          <!-- Рукав -->
          <v-row class="mb-12" v-if="n === 3">
            <v-col class="d-flex child-flex" cols="12">
              <v-row justify="center">
                <v-img v-for="image in images[n]" :key="image" :src="image" aspect-ratio="1" max-height="450"></v-img>
              </v-row>
            </v-col>
            <v-row justify="center">
              <v-col v-for="(checkbox, index) in chexbox[n]" :key="index" cols="4">
               <v-radio-group v-model="selectedSleeve">
                      <v-radio :label="checkbox" :value="checkbox"></v-radio>
                  </v-radio-group>
              </v-col>
            </v-row>
          </v-row>
          <!-- Горловина -->
          <v-row class="mb-12" v-if="n === 4">
            <v-col class="d-flex child-flex" cols="12">
              <v-row justify="center">
                <v-img v-for="image in images[n]" :key="image" :src="image" aspect-ratio="1" max-height="450"></v-img>
              </v-row>
            </v-col>
            <v-row justify="center">
              <v-col v-for="(checkbox, index) in chexbox[n]" :key="index" cols="4">
                <v-radio-group v-model="selectedNeck">
                      <v-radio :label="checkbox" :value="checkbox"></v-radio>
                  </v-radio-group>
              </v-col>
            </v-row>
          </v-row>
          <!-- Цвет -->
          <v-row class="mb-12" v-if="n === 5">
                  <v-col v-for="(color, index) in colors" :key="index" cols="12" sm="3">
                    <v-radio-group v-model="selectedColor">
                      <v-radio :label="color.name" :value="color.name">
                      </v-radio>
                      <v-img :src="color.image" aspect-ratio="1" max-height="150" max-width="150"></v-img>
                    </v-radio-group>
                  </v-col>
                </v-row>
          <!-- Размер -->
          <v-row v-if="n === 6">
            <v-container>
              <v-combobox label="Выберите ваш размер"
                :items="['XS-44', 'S-46', 'M-48', 'L-50', 'XL-52', '2XL-54', '3XL-56', '4XL-58']" v-model="selectedSize"></v-combobox>
                <v-text-field label="Рост" variant="outlined"></v-text-field>
              <v-text-field label="Обхват груди" variant="outlined"></v-text-field>
              <v-text-field label="Обхват бёдер" variant="outlined"></v-text-field>
            </v-container>
          </v-row>
          <!-- Итог -->
          <v-row v-if="n === 7">
            <v-container>
              <ul>
                <li>{{ selectedLenght }}</li>
                <li>{{ selectedPocket }}</li>
                <li>{{ selectedSleeve }}</li>
                <li>{{ selectedNeck }}</li>
                <li>{{selectedColor}}</li>
                <li>{{ selectedSize }}</li>
              </ul>
              <v-row>
                <v-col cols="12" class="text-right">
                  <v-btn rounded="" color="blue-grey-lighten-3">Оформить заказ</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    selectedLenght: null,
    selectedColor: null,
    selectedNeck: null,
    selectedPocket: null,
    selectedSleeve: null,
    selectedSize: null,
    tab: null,
    images: {
      1: ["./image/constructorDress/1.webp", "./image/constructorDress/2.webp"],
      2: ["./image/constructorDress/3.webp", "./image/constructorDress/4.webp"],
      3: ["./image/constructorDress/1.webp", "./image/constructorDress/5.webp", "./image/constructorDress/3.webp"],
      4: ["./image/constructorDress/1.webp", "./image/constructorDress/5.webp", "./image/constructorDress/3.webp"],
    },
    chexbox: {
      1: ["Средняя", "Длинная"],
      2: ["С карманом", "Без кармана"],
      3: ["Длинный", "3/4", "Короткий"],
      4: ["Квадратный", "Треугольный", "Круглый"],
    },
    colors: [
      { name: "Черный", image: "./image/color_cicek/black.jpeg" },
      { name: "Песочный", image: "./image/color_cicek/песочный.jpeg" },
      { name: "Фиолетовый", image: "./image/color_cicek/фиолетовый.jpeg" },
      { name: "Лавандовый", image: "./image/color_cicek/лавандовый.jpeg" },
      { name: "Розовый", image: "./image/color_cicek/розовый.jpeg" },
      { name: "Белый", image: "./image/color_cicek/белый.jpeg" },
      { name: "Серый", image: "./image/color_cicek/серый.jpeg" },
      { name: "Графит", image: "./image/color_cicek/графит.jpg" },
      { name: "Желтый", image: "./image/color_cicek/желтая.jpeg" },
      { name: "Оранжевый", image: "./image/color_cicek/оранжевый.jpeg" },
      { name: "Красный", image: "./image/color_cicek/красный.jpeg" },
      { name: "Синий", image: "./image/color_cicek/синий.jpeg" },
      { name: "Голубой", image: "./image/color_cicek/голубой.jpeg" },
      { name: "Зеленый", image: "./image/color_cicek/зеленый.jpeg" },
      { name: "Мятный", image: "./image/color_cicek/мятный.jpeg" },
      { name: "Хаки", image: "./image/color_cicek/хаки.jpeg" },
    ],
  }),
  // created() {
  //   this.loadColors();
  // },
  // methods: {
  //   loadColors() {
  //     axios.get('http://localhost:3000/api/color').then(response => {
  //        this.colors = response.data;
  //      }).catch(error => {
  //        console.error('Ошибка при загрузке цветов:', error);
  //      });
  //   },
  // },
} 
</script>
