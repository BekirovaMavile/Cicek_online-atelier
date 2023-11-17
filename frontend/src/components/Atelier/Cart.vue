<!-- <template>
    <v-container>
        <v-img src="../../../public/image/login.jpg" max-height="220" max-width="220" class="d-flex mx-auto my-auto mt-2 mb-3"></v-img>
        <v-row>
            <v-col v-for="(item, index) in cartItems" :key="index" cols="12">
                    <v-row class="d-flex align-center">
                        <v-col cols="6">
                            <h3>{{ item.name }}</h3>
                        </v-col>
                        <v-col cols="2" class="text-center">
                            <span class="caption">Количество:</span> 
                            <v-chip>{{ item.quantity }}</v-chip>
                        </v-col>
                        <v-col cols="3" class="text-center">
                            <span class="caption">Цена:</span>
                            <v-chip>{{ item.price }} руб.</v-chip>
                        </v-col>
                        <v-col cols="1" class="text-center">
                            <v-btn @click="removeFromCart(index)" icon>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-right">
                <h3>Итого: {{ total }} руб.</h3>
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
export default {
    data() {
        return {
            cartItems: [
                {
                    name: "Платье с расклешенной юбкой",
                    price: 1500,
                    quantity: 1,
                },
                {
                    name: "Блузка с вышивкой",
                    price: 800,
                    quantity: 2,
                },
                {
                    name: "Худи на молнии с капюшоном",
                    price: 1100,
                    quantity: 1,
                },
                {
                    name: "Джинсы обычные",
                    price: 1000,
                    quantity: 3,
                },
            ],
        };
    },
    computed: {
        total() {
            return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
    },
    methods: {
        removeFromCart(index) {
            this.cartItems.splice(index, 1);
        },
    },
};
</script> -->

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
        <v-card :width="300" :height="50" class="text-center mb-4">
          <div class="d-flex flex-column align-center justify-center">
            <v-menu
              v-model="card.menu"
              :close-on-content-click="false"
              location="end"
            >
              <template v-slot:activator="{ props }">
                <v-btn rounded="" color="blue-grey-lighten-3" v-bind="props">
                  {{ card.buttonText }}
                </v-btn>
              </template>

              <v-card min-width="300">
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

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="text"
                    @click="card.menu = false"
                    color="primary"
                    >Cancel</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-menu>
          </div>
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
    cardData: [
      //   {
      //     buttonText: "Посмотреть подробности 1",
      //     title: "Dress 1",
      //     details: [
      //       "Прямой крой (A-line)",
      //       "Облегающий крой (Bodycon)",
      //       "Принцесса-крой",
      //       "Песочный",
      //       "XS-44",
      //     ],
      //     menu: false, // Unique menu state for Dress 1
      //   },
      //   {
      //     buttonText: "Посмотреть подробности 2",
      //     title: "Dress 2",
      //     details: ["Другие детали для Dress 2"],
      //     menu: false, // Unique menu state for Dress 2
      //   },
    ],
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
          //   console.log(this.productcategories);
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
          //   console.log(this.productsizes);
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
          //   console.log(this.colors);
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
    //  async makeCards() {
    //     let parts = [];
    //     let card = {
    //       buttonText: "Не придумал, что писать",
    //       title: "",
    //       details: [],
    //       menu: false, // Unique menu state for Dress 1
    //     };
    //     this.products.map((item) => {
    //       card.details = [];
    //       card.title = this.productcategories.find(
    //         (category) => category.id === item.product_categories_id
    //       ).name;
    //       card.details.push(
    //         this.colors.find((color) => color.id === item.color_id).name
    //       );

    //       card.details.push(
    //         this.productsizes.find((size) => size.id === item.product_size_id)
    //           .name
    //       );
    //       // console.log(card.details);
    //       parts = await this.getParts(item.id);
    //       console.log(parts);
    //       // parts.map((part) => {
    //       //   card.details.push(part.name);
    //       // });
    //       // this.cardData.push(card);
    //     });
    //     // console.log(this.cardData);
    //   },
    makeCards() {
      let cardData = [];
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

      const promises = this.products.map((item) => getProductDetails(item));

      Promise.all(promises)
        .then((cards) => {
          cardData = cards;
          console.log(cardData);
        })
        .catch((error) => {
          console.error("Error creating cards:", error);
        });
    },
  },
};
</script>
