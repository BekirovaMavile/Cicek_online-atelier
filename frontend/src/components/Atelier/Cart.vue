<template>
  <v-container fluid>
    <v-btn variant="text" @click="makeCards" color="primary"
      >Прогрузить карточки</v-btn
    >
    <v-img
      src="../../../public/image/login.jpg"
      max-height="220"
      max-width="220"
      class="d-flex mx-auto my-auto mt-2 mb-3"
    ></v-img>
    <v-row justify="center" class="mt-8 mb-4">
      <v-col
        v-for="(card, index) in cardData"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card :width="300" class="text-center mb-4">
          <h2 class="text-center">{{ card.title }}</h2>
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              v-for="(detail, detailIndex) in card.details"
              :key="detailIndex"
            >
              {{ detail }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-right">
        <h3>Итого: XXX руб.</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn rounded="" color="blue-grey-lighten-3">Оформить заказ</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios, { all } from "axios";

export default {
  data: () => ({
    productcategories: [],
    productsizes: [],
    products: [],
    colors: [],
    parts: [],
    menu: false,
    cardData: [],
  }),
  mounted() {
    this.getProdCats();
    this.getProds();
    this.getProdSizes();
    this.getColors();
  },
  methods: {
    getProdCats() {
      axios
        .get("http://localhost:3000/api/productcategory/")
        .then((response) => {
          this.productcategories = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    getProds() {
      axios
        .get("http://localhost:3000/api/product")
        .then((response) => {
          this.products = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getProdSizes() {
      axios
        .get("http://localhost:3000/api/productsize")
        .then((response) => {
          this.productsizes = response.data;
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
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getParts(prod) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/part/prod/" + prod
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    makeCards() {
      const getProductDetails = async (item) => {
        let card = {
          buttonText: "Не придумал, что писать",
          title: "",
          details: [],
          menu: false,
        };

        card.title = this.productcategories.find(
          (category) => category.id === item.product_categories_id
        ).name;
        card.buttonText = card.title;

        card.details.push(
          this.colors.find((color) => color.id === item.color_id).name
        );

        card.details.push(
          this.productsizes.find((size) => size.id === item.product_size_id)
            .name
        );

        try {
          const parts = await this.getParts(item.id);
          card.details = card.details.concat(parts.map((part) => part.name));
        } catch (error) {
          console.error("Error fetching parts:", error);
        }

        return card;
      };

      this.cardData = [];

      const promises = this.products.map((item) => getProductDetails(item));

      Promise.all(promises)
        .then((cards) => {
        })
        .catch((error) => {
          console.error("Error creating cards:", error);
        });
    },
  },
};
</script>
