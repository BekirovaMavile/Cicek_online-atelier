<template>
  <v-card>
    <v-tabs v-model="tab" color="blue-grey-darken-4" align-tabs="center">
      <!-- <v-tab
        v-for="category in categories[currentCategory]"
        :key="category.id"
        :id="category.id"
      >
        {{ category.name }}
      </v-tab> -->
      <v-tab :id="8">Цвет</v-tab>
      <v-tab :id="9">Размер</v-tab>
      <v-tab :id="10">Итого</v-tab>
    </v-tabs>
    <div>
      <!-- Выводим категории продуктов -->
      <p>Выводим категории продуктов</p>
      <div v-for="category in productcategories" :key="category.id">
        {{ category.id }} - {{ category.name }}
      </div>

      <!-- Выводим категории запчастей -->
      <p>Выводим категории запчастей</p>

      <div v-for="partCategory in partcategories" :key="partCategory.id">
        {{ partCategory.id }} - {{ partCategory.name }} - Product Category ID:
        {{ partCategory.product_categories_id }}
      </div>
      <!-- Выводим цвета -->
      <p>Выводим цвета</p>

      <div v-for="color in colors" :key="color.id">
        {{ color.id }} - {{ color.name }}
      </div>
      <!-- Выводим части -->
      <p>Выводим части</p>

      <div v-for="part in parts" :key="part.id">
        {{ part.id }} - {{ part.name }}
      </div>
    </div>
    <!-- <v-window v-model="tab">
      <v-window-item
        v-for="category in categories[currentCategory]"
        :key="category.id"
        :id="category.id"
      >
        <v-container fluid>
          <v-row class="mb-12">
            <v-col class="d-flex child-flex" cols="12">
              <v-row justify="center">
                <v-img
                  v-for="image in getCategoryImages(category.id)"
                  :key="image"
                  :src="image"
                  aspect-ratio="1"
                  max-height="450"
                ></v-img>
              </v-row>
            </v-col>
            <v-row justify="center">
              <v-col
                v-for="(checkbox, index) in getCategoryCheckboxes(category.id)"
                :key="index"
                cols="4"
              >
                <v-radio-group
                  v-model="
                    selectedCategoryids[this.currentCategory][category.id]
                  "
                >
                  <v-radio :label="checkbox" :id="checkbox"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-row>
        </v-container>
      </v-window-item> -->

    <!-- Таб для Цвета -->
    <!-- <v-window-item v-if="tab === 8" :id="8">
        <v-row class="mb-12">
          <v-col v-for="(color, index) in colors" :key="index" cols="12" sm="3">
            <v-radio-group v-model="selectedColor">
              <v-radio :label="color.name" :id="color.name"></v-radio>
              <v-img
                :src="color.image"
                aspect-ratio="1"
                max-height="150"
                max-width="150"
              ></v-img>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-window-item> -->
    <!-- Таб для Размера -->
    <!-- <v-window-item v-if="tab === 9" :id="9">
        <v-row>
          <v-container>
            <v-combobox
              label="Выберите ваш размер"
              :items="[
                'XS-44',
                'S-46',
                'M-48',
                'L-50',
                'XL-52',
                '2XL-54',
                '3XL-56',
                '4XL-58',
              ]"
              v-model="selectedSize"
            ></v-combobox>
            <v-text-field label="Рост" variant="outlined"></v-text-field>
            <v-text-field
              label="Обхват груди"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              label="Обхват бёдер"
              variant="outlined"
            ></v-text-field>
          </v-container>
        </v-row>
      </v-window-item> -->

    <!-- Таб для Итого -->
    <!-- <v-window-item v-if="tab === 10" :id="10">
        <v-row>
          <v-container>
            <ul>
              <li>Длина: {{ selectedCategoryids[1] }}</li>
              <li>Карман: {{ selectedCategoryids[2] }}</li>
              <li>Рукав: {{ selectedCategoryids[3] }}</li>
              <li>Горловина: {{ selectedCategoryids[4] }}</li>
              <li>Цвет: {{ selectedColor }}</li>
              <li>Размер: {{ selectedSize }}</li>
            </ul>
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn rounded="" color="blue-grey-lighten-3"
                  >Оформить заказ</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-window-item>
    </v-window> -->
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    // selectedCategoryids: {},
    selected: null,
    tab: 1,
    // currentCategory: null,
    selectedCategories: {},
    selectedPartCategoryId: {},
    productcategories: [],
    partcategories: [],
    parts: [],

    images: [
      {
        type: "dress",
        options: {
          1: [
            "./image/constructorDress/1.webp",
            "./image/constructorDress/2.webp",
          ],
          2: [
            "./image/constructorDress/3.webp",
            "./image/constructorDress/4.webp",
          ],
          3: [
            "./image/constructorDress/1.webp",
            "./image/constructorDress/5.webp",
            "./image/constructorDress/3.webp",
          ],
          4: [
            "./image/constructorDress/1.webp",
            "./image/constructorDress/5.webp",
            "./image/constructorDress/3.webp",
          ],
        },
      },
      {
        type: "shirt",
        options: {
          1: [
            "./image/constructorShirt/1.jpeg",
            "./image/constructorShirt/2.webp",
          ],
          2: [
            "./image/constructorShirt/3.webp",
            "./image/constructorShirt/2.webp",
          ],
          3: [
            "./image/constructorShirt/1.jpeg",
            "./image/constructorShirt/4.jpeg",
          ],
          4: [
            "./image/constructorShirt/1.jpeg",
            "./image/constructorShirt/2.webp",
            "./image/constructorShirt/5.jpeg",
          ],
        },
      },
      {
        type: "hudi",
        options: {
          1: [
            "./image/constructorHudi/one.webp",
            "./image/constructorHudi/three.jpeg",
          ],
          2: [
            "./image/constructorHudi/four.jpeg",
            "./image/constructorHudi/five.jpeg",
          ],
          3: [
            "./image/constructorHudi/six.webp",
            "./image/constructorHudi/seven.jpeg",
            "./image/constructorHudi/eight.webp",
          ],
          4: [
            "./image/constructorHudi/three.jpeg",
            "./image/constructorHudi/nine.webp",
          ],
          5: [
            "./image/constructorHudi/ten.webp",
            "./image/constructorHudi/eleven.webp",
            "./image/constructorHudi/12.webp",
          ],
          6: [
            "./image/constructorHudi/three.jpeg",
            "./image/constructorHudi/hudi1.jpeg",
          ],
          7: [
            "./image/constructorHudi/13.webp",
            "./image/constructorHudi/14.webp",
          ],
        },
      },
      {
        type: "skirt",
        options: {
          1: [
            "./image/constructorSkirt/1.webp",
            "./image/constructorSkirt/2.webp",
          ],
          2: [
            "./image/constructorSkirt/3.jpeg",
            "./image/constructorSkirt/2.webp",
            "./image/constructorSkirt/1.webp",
          ],
          3: [
            "./image/constructorSkirt/3.jpeg",
            "./image/constructorSkirt/4.webp",
          ],
          4: [
            "./image/constructorSkirt/13.webp",
            "./image/constructorSkirt/14.webp",
          ],
        },
      },
      {
        type: "pants",
        options: {
          1: [
            "./image/constructorPants/1.jpeg",
            "./image/constructorPants/2.webp",
            "./image/constructorPants/4.jpeg",
          ],
          2: [
            "./image/constructorPants/4.jpeg",
            "./image/constructorPants/5.webp",
          ],
          3: [
            "./image/constructorPants/1.jpeg",
            "./image/constructorPants/2.webp",
          ],
          4: [
            "./image/constructorPants/1.jpeg",
            "./image/constructorPants/3.webp",
          ],
          5: [
            "./image/constructorPants/13.webp",
            "./image/constructorPants/14.webp",
          ],
        },
      },
    ],
    categories: [],
    // colors: [],
    // chexboxDress: [
    //   { id: 1, options: ["Средняя", "Длинная"] },
    //   { id: 2, options: ["С карманом", "Без кармана"] },
    //   { id: 3, options: ["Длинный", "3/4", "Короткий"] },
    //   { id: 4, options: ["Квадратный", "Треугольный", "Круглый"] },
    // ],
    // chexboxShirt: [
    //   { id: 1, options: ["Классический", "Оверсайз"] },
    //   { id: 2, options: ["До пояса", "До бедра"] },
    //   { id: 3, options: ["Круглая", "Треугольная"] },
    //   { id: 4, options: ["Короткий", "До локтя", "Лонгслив"] },
    // ],
    // chexboxHudi: [
    //   { id: 1, options: ["Классический", "Бочонок (оверсайз)"] },
    //   { id: 2, options: ["До середины бедер", "До колена"] },
    //   {
    //     id: 3,
    //     options: ["Декоративная резинка кашкорсе", "Обрезанный край", "Шов"],
    //   },
    //   { id: 4, options: ["Кенгуру", "В боковых швах"] },
    //   {
    //     id: 5,
    //     options: ["Декоративная резинка кашкорсе", "Шов", "На резинке"],
    //   },
    //   { id: 6, options: ["С капюшоном", "Без капюшона"] },
    //   { id: 7, options: ["С начёсом", "Без начёса"] },
    // ],
    // chexboxSkirt: [
    //   { id: 1, options: ["Прямая", "Колокол"] },
    //   { id: 2, options: ["Короткая", "Средняя", "Длинная"] },
    //   {
    //     id: 3,
    //     options: ["Декоративная резинка кашкорсе", "Резинка со шнурком"],
    //   },
    //   { id: 4, options: ["С начёсом", "Без начёса"] },
    // ],
    // chexboxPants: [
    //   { id: 1, options: ["Классика", "Карго", "Широкие"] },
    //   {
    //     id: 2,
    //     options: ["Декоративная резинка кашкорсе", "Резинка со шнурком"],
    //   },
    //   { id: 3, options: ["Шов", "Резинка"] },
    //   { id: 4, options: ["С карманом", "Без кармана"] },
    //   { id: 5, options: ["С начёсом", "Без начёса"] },
    // ],
    // chexboxData: [],
  }),
  mounted() {
    this.loadPartCats();
    this.loadColors();
    this.loadProdCats();
  },
  computed: {
    getSelectedid() {
      return (categoryid) => this.selectedCategoryids[categoryid];
    },
    currentCategory() {
      return this.$route.params.category;
    },
  },
  methods: {
    async loadPartCats() {
      await axios
        .get("http://localhost:3000/api/partcategory/")
        .then((response) => {
          console.log(response.data); // Вывести ответ сервера в консоль
          this.partcategories = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    async loadProdCats() {
      await axios
        .get("http://localhost:3000/api/productcategory/")
        .then((response) => {
          this.productcategories = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    async loadColors() {
      await axios.get("http://localhost:3000/api/color/").then((response) => {
        this.colors = response.data;
      });
    },
    async loadParts() {
      await axios
        .get("http://localhost:3000/api/part/")
        .then((response) => {
          console.log(response.data); // Вывести ответ сервера в консоль
          this.parts = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    // getPartCategories(productCategoryId) {
    //   return this.partcategories.filter(
    //     (partCategory) =>
    //       partCategory.product_categories_id === productCategoryId
    //   );
    // },
    // getSelectedPartCategories() {
    //   const selectedPartCategories = [];
    //   for (const categoryId in this.selectedCategories) {
    //     if (this.selectedCategories[categoryId]) {
    //       selectedPartCategories.push(this.selectedPartCategoryId[categoryId]);
    //     }
    //   }
    //   console.log("Selected Part Categories:", selectedPartCategories);
    // },

    // getCategoryImages(categoryid) {
    //   if (this.currentCategory && this.currentCategory in this.images) {
    //     return this.images[this.currentCategory][categoryid];
    //   }
    //   return [];
    // },
    // getCategoryCheckboxes(categoryid) {
    //   if (this.currentCategory in this.chexboxData) {
    //     return this.chexboxData[this.currentCategory][categoryid];
    //   }
    //   return [];
    // },
  },
};
</script>

<!-- <div>
  <div v-for="productCategory in productCategories" :key="productCategory.id">
    <label>
      <input type="checkbox" v-model="selectedCategories[productCategory.id]" />
      {{ productCategory.name }}
    </label>
    <select v-model="selectedPartCategoryId[productCategory.id]">
      <option v-for="partCategory in getPartCategories(productCategory.id)" :key="partCategory.id" :value="partCategory.id">
        {{ partCategory.name }}
      </option>
    </select>
  </div>

  <button @click="getSelectedPartCategories">Get Selected Part Categories</button>
</div> -->
