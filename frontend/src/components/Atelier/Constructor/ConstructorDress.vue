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

          <!-- <div v-for="(item, key, index) in parts" :key="index">
                    <v-row class="mb-12" v-if="n === index+1">
                        <v-col class="d-flex child-flex" cols="12">
                            <v-row justify="center">
                                <v-img v-for="(part, index) in parts[key]" :key="index" :src="part.icon" aspect-ratio="1" max-height="450"></v-img>
                            </v-row>
                        </v-col>

                        <v-row justify="center">
                            <v-col v-for="(part, index) in parts[key]" :key="index" cols="6" sm="6">
                                <v-radio-group class="ml-12" v-model="selectedLenght">
                                    <v-radio :label="part.name" :value="part.name"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-row>
                </div> -->

          <div v-for="(item, key, index) in parts" :key="index">
            <v-row class="mb-12" v-if="n === index + 1">
              <v-col class="d-flex child-flex" cols="12">
                <v-row justify="center">
                  <v-card v-for="(part, index) in parts[key]" :key="index" class="mr-4">
                    <v-row align="center" justify="center">

                      <v-img :src="part.icon" aspect-ratio="1" height="450" width="450"></v-img>
                    </v-row>
                    <v-radio-group class="ml-2 mt-2" v-model="selectedLenght">

                      <v-radio :label="part.name" :value="part.name"></v-radio>
                    </v-radio-group>
                  </v-card>
                </v-row>
              </v-col>
            </v-row>
          </div>


          <!-- <v-row class="mb-12" v-if="n === 1">
                    <v-col class="d-flex child-flex" cols="12">
                        <v-row justify="center">
                            <v-img v-for="(part, index) in parts[5]" :key="index" :src="part.icon" aspect-ratio="1" max-height="450"></v-img>
                        </v-row>
                    </v-col>

                    <v-row justify="center">
                        <v-col v-for="(part, index) in parts[5]" :key="index" cols="6" sm="6">
                            <v-radio-group class="ml-12" v-model="selectedLenght">
                                <v-radio :label="part.name" :value="part.name"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-row>

                <v-row class="mb-12" v-if="n === 2">
                    <v-col class="d-flex child-flex" cols="12">
                        <v-row justify="center">
                            <v-img v-for="(part, index) in parts[6]" :key="index" :src="part.icon" aspect-ratio="1" max-height="450"></v-img>
                        </v-row>
                    </v-col>

                    <v-row justify="center">
                        <v-col v-for="(part, index) in parts[6]" :key="index" cols="6" sm="6">
                            <v-radio-group class="ml-12" v-model="selectedLenght">
                                <v-radio :label="part.name" :value="part.name"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-row>

                <v-row class="mb-12" v-if="n === 3">
                    <v-col class="d-flex child-flex" cols="12">
                        <v-row justify="center">
                            <v-img v-for="(part, index) in parts[7]" :key="index" :src="part.icon" aspect-ratio="1" max-height="450"></v-img>
                        </v-row>
                    </v-col>

                    <v-row justify="center">
                        <v-col v-for="(part, index) in parts[7]" :key="index" cols="6" sm="6">
                            <v-radio-group class="ml-12" v-model="selectedLenght">
                                <v-radio :label="part.name" :value="part.name"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-row> -->

          <!-- Цвет -->
          <v-row class="mb-12" v-if="n === partCategoriesLen + 1">
            <v-col v-for="(color, index) in colors" :key="index" cols="12" sm="3">
              <v-radio-group v-model="selectedColor">
                <v-radio :label="color.name" :value="color.name">
                </v-radio>
                <v-img :src="color.icon" aspect-ratio="1" max-height="150" max-width="150"></v-img>
              </v-radio-group>
            </v-col>
          </v-row>

          <!-- Размер -->
          <v-row v-if="n === partCategoriesLen + 2">
            <v-container>
              <v-combobox label="Выберите ваш размер"
                :items="['XS-44', 'S-46', 'M-48', 'L-50', 'XL-52', '2XL-54', '3XL-56', '4XL-58']"
                v-model="selectedSize"></v-combobox>
              <v-text-field label="Рост" variant="outlined"></v-text-field>
              <v-text-field label="Обхват груди" variant="outlined"></v-text-field>
              <v-text-field label="Обхват бёдер" variant="outlined"></v-text-field>
            </v-container>
          </v-row>

          <!-- Итог -->
          <v-row v-if="n === partCategoriesLen + 3">
            <v-container>
              <ul>
                <li>{{ selectedLenght }}</li>
                <li>{{ selectedPocket }}</li>
                <li>{{ selectedNeck }}</li>
                <li>{{ selectedColor }}</li>
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
import axios, {
  all
} from 'axios';
export default {
  data: () => ({
    selectedLenght: null,
    selectedColor: null,
    selectedNeck: null,
    selectedPocket: null,
    selectedSleeve: null,
    selectedSize: null,
    tab: null,
    partCategoriesLen: 0,
    partCategories: null,
    // valueTabs: 1,
    // images: {
    //     1: ["./image/constructorDress/1.webp", "./image/constructorDress/2.webp"],
    //     2: ["./image/constructorDress/3.webp", "./image/constructorDress/4.webp"],
    //     3: ["./image/constructorDress/1.webp", "./image/constructorDress/5.webp", "./image/constructorDress/3.webp"],
    //     4: ["./image/constructorDress/1.webp", "./image/constructorDress/5.webp", "./image/constructorDress/3.webp"],
    // },
    // chexbox: {
    //     1: ["Средняя", "Длинная"],
    //     2: ["С карманом", "Без кармана"],
    //     3: ["Длинный", "3/4", "Короткий"],
    //     4: ["Квадратный", "Треугольный", "Круглый"],
    // },
    colors: null,
    parts: {},
  }),
  mounted() {
    this.getColors();
    this.getPartCategories();
    this.getParts();
    // this.handleTabClick(1);
  },
  methods: {
    getColors() {
      axios.get('http://localhost:3000/api/color')
        .then(response => {
          this.colors = response.data;
          console.log(this.myColors);
        })
        .catch(error => {
          console.error(error);
        });
    },

    getPartCategories() {
      axios.get('http://localhost:3000/api/partcategory')
        .then(response => {
          this.partCategories = response.data;
          this.partCategoriesLen = this.partCategories.length;

          this.partCategories.forEach((category) => {
            this.parts[String(category.id)] = [];
          });
        })
        .catch(error => {
          console.error(error);
        });
    },

    getParts() {
      axios.get('http://localhost:3000/api/part')
        .then(response => {
          response.data.forEach((obj) => {
            if (this.parts.hasOwnProperty(obj.part_category_id)) {
              this.parts[obj.part_category_id].push(obj);
            }
          });
          console.log(this.parts);

        })
        .catch(error => {
          console.error(error);
        });
    },
    // async handleTabClick(selectedCategory) {
    //   await axios
    //     .get("http://localhost:3000/api/part/cat/" + selectedCategory)
    //     .then((response) => {
    //       this.parts = response.data;
    //       console.log(this.parts); // Вывести ответ сервера в консоль
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching data:", error);
    //     });
    // },
  },
}
</script>
