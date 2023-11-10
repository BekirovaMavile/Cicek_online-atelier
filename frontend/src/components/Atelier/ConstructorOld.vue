<template>
  <v-card>
    <v-tabs v-model="tab" color="blue-grey-darken-4" align-tabs="center">
      <v-tab
        v-for="category in categories[currentCategory]"
        :key="category.value"
        :value="category.value"
      >
        {{ category.name }}
      </v-tab>
      <v-tab :value="8">Цвет</v-tab>
      <v-tab :value="9">Размер</v-tab>
      <v-tab :value="10">Итого</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <!-- Табы для выбранной категории -->
      <v-window-item
        v-for="category in categories[currentCategory]"
        :key="category.value"
        :value="category.value"
      >
        <v-container fluid>
          <v-row class="mb-12">
            <v-col class="d-flex child-flex" cols="12">
              <v-row justify="center">
                <!-- Отобразите изображения для выбранной категории -->
                <v-img
                  v-for="image in getCategoryImages(category.value)"
                  :key="image"
                  :src="image"
                  aspect-ratio="1"
                  max-height="450"
                ></v-img>
              </v-row>
            </v-col>
            <v-row justify="center">
              <v-col
                v-for="(checkbox, index) in getCategoryCheckboxes(
                  category.value
                )"
                :key="index"
                cols="4"
              >
                <v-radio-group
                  v-model="
                    selectedCategoryValues[this.currentCategory][category.value]
                  "
                >
                  <v-radio :label="checkbox" :value="checkbox"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-row>
        </v-container>
      </v-window-item>

      <!-- Таб для Цвета -->
      <v-window-item v-if="tab === 8" :value="8">
        <v-row class="mb-12">
          <v-col v-for="(color, index) in colors" :key="index" cols="12" sm="3">
            <v-radio-group v-model="selectedColor">
              <v-radio :label="color.name" :value="color.name"></v-radio>
              <v-img
                :src="color.image"
                aspect-ratio="1"
                max-height="150"
                max-width="150"
              ></v-img>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-window-item>
      <!-- Таб для Размера -->
      <v-window-item v-if="tab === 9" :value="9">
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
      </v-window-item>

      <!-- Таб для Итого -->
      <v-window-item v-if="tab === 10" :value="10">
        <v-row>
          <v-container>
            <ul>
              <li>Длина: {{ selectedCategoryValues[1] }}</li>
              <li>Карман: {{ selectedCategoryValues[2] }}</li>
              <li>Рукав: {{ selectedCategoryValues[3] }}</li>
              <li>Горловина: {{ selectedCategoryValues[4] }}</li>
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
    </v-window>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    // prodCats массив объектов
    //   id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    // name: {
    //   type: DataTypes.STRING(45),
    //   allowNull: false,
    // },
    // icon: {
    //   type: DataTypes.STRING(200),
    // },



    // partCats: функция принимает id категории продукта, принимает массив объектов категорий частей
    //   id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    // name: {
    //   type: DataTypes.STRING(45),
    //   allowNull: false,
    // },
    // icon: {
    //   type: DataTypes.STRING(200),
    // product_categories_id: {
    //   type: DataTypes.INTEGER,
    // }},

    selectedCategoryValues: {},
    selected: null,
    tab: 1,
    currentCategory: null,
    images: {
      dress: {
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
      shirt: {
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
      hudi: {
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
      skirt: {
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
      pants: {
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
    categories: {
      dress: [
        { name: "Длина", value: 1 },
        { name: "Карман", value: 2 },
        { name: "Рукав", value: 3 },
        { name: "Горловина", value: 4 },
      ],
      shirt: [
        { name: "Крой", value: 1 },
        { name: "Длина", value: 2 },
        { name: "Горловина", value: 3 },
        { name: "Рукав", value: 4 },
      ],
      hudi: [
        { name: "Крой", value: 1 },
        { name: "Длина", value: 2 },
        { name: "Низ", value: 3 },
        { name: "Карман", value: 4 },
        { name: "Манжеты", value: 5 },
        { name: "Капюшон", value: 6 },
        { name: "Ткань", value: 7 },
      ],
      skirt: [
        { name: "Крой", value: 1 },
        { name: "Длина", value: 2 },
        { name: "Пояс", value: 3 },
        { name: "Ткань", value: 4 },
      ],
      pants: [
        { name: "Модель", value: 1 },
        { name: "Пояс", value: 2 },
        { name: "Низ", value: 3 },
        { name: "Карман", value: 4 },
        { name: "Ткань", value: 5 },
      ],
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
    },
    chexboxDress: {
      1: ["Средняя", "Длинная"],
      2: ["С карманом", "Без кармана"],
      3: ["Длинный", "3/4", "Короткий"],
      4: ["Квадратный", "Треугольный", "Круглый"],
    },
    chexboxShirt: {
      1: ["Классический", "Оверсайз"],
      2: ["До пояса", "До бедра"],
      3: ["Круглая", "Треугольная"],
      4: ["Короткий", "До локтя", "Лонгслив"],
    },
    chexboxHudi: {
      1: ["Классический", "Бочонок (оверсайз)"],
      2: ["До середины бедер", "До колена"],
      3: ["Декоративная резинка кашкорсе", "Обрезанный край", "Шов"],
      4: ["Кенгуру", "В боковых швах"],
      5: ["Декоративная резинка кашкорсе", "Шов", "На резинке"],
      6: ["С капюшоном", "Без капюшона"],
      7: ["С начёсом", "Без начёса"],
    },
    chexboxSkirt: {
      1: ["Прямая", "Колокол"],
      2: ["Короткая", "Средняя", "Длинная"],
      3: ["Декоративная резинка кашкорсе", "Резинка со шнурком"],
      4: ["С начёсом", "Без начёса"],
    },
    chexboxPants: {
      1: ["Классика", "Карго", "Широкие"],
      2: ["Декоративная резинка кашкорсе", "Резинка со шнурком"],
      3: ["Шов", "Резинка"],
      4: ["С карманом", "Без кармана"],
      5: ["С начёсом", "Без начёса"],
    },
    // colors: [
    //     { name: "Черный", image: "./image/color_cicek/black.jpeg" },
    //     { name: "Песочный", image: "./image/color_cicek/песочный.jpeg" },
    //     { name: "Фиолетовый", image: "./image/color_cicek/фиолетовый.jpeg" },
    //     { name: "Лавандовый", image: "./image/color_cicek/лавандовый.jpeg" },
    //     { name: "Розовый", image: "./image/color_cicek/розовый.jpeg" },
    //     { name: "Белый", image: "./image/color_cicek/белый.jpeg" },
    //     { name: "Серый", image: "./image/color_cicek/серый.jpeg" },
    //     { name: "Графит", image: "./image/color_cicek/графит.jpg" },
    //     { name: "Желтый", image: "./image/color_cicek/желтая.jpeg" },
    //     { name: "Оранжевый", image: "./image/color_cicek/оранжевый.jpeg" },
    //     { name: "Красный", image: "./image/color_cicek/красный.jpeg" },
    //     { name: "Синий", image: "./image/color_cicek/синий.jpeg" },
    //     { name: "Голубой", image: "./image/color_cicek/голубой.jpeg" },
    //     { name: "Зеленый", image: "./image/color_cicek/зеленый.jpeg" },
    //     { name: "Мятный", image: "./image/color_cicek/мятный.jpeg" },
    //     { name: "Хаки", image: "./image/color_cicek/хаки.jpeg" },
    // ],
  }),
  mounted() {
    this.loadProdCats();
  },
  computed: {
    getSelectedValue() {
      return (categoryValue) => this.selectedCategoryValues[categoryValue];
    },
    currentCategory() {
      return this.$route.params.category;
    },
  },
  methods: {
    loadPartCats(id) {
      axios
        .get("http://localhost:3000/api/partcategory/" + id)
        .then((response) => {
          this.reviews = response.data;
        });
    },
    getCategoryImages(categoryValue) {
      if (this.currentCategory && this.currentCategory in this.images) {
        return this.images[this.currentCategory][categoryValue];
      }
      return [];
    },
    getCategoryCheckboxes(categoryValue) {
      if (this.currentCategory && this.currentCategory in this.chexboxData) {
        return this.chexboxData[this.currentCategory][categoryValue];
      }
      return [];
    },
  },
};
</script>
