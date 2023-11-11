<template>
  <v-img
    src="../../../public/image/login.jpg"
    max-height="220"
    max-width="220"
    class="d-flex mx-auto my-auto mt-2 mb-3"
  ></v-img>
  <!-- <h2 class="d-flex flex-column justify-center align-center mt-8 mb-8">
    ВЫБЕРИТЕ КАТЕГОРИЮ ОДЕЖДЫ:
  </h2>
  <div
    v-for="category in productcategories"
    :key="category.id"
    :id="category.id"
  >
    {{ category.name }}
  </div> -->
  <v-row>
    <v-col class="d-flex child-flex" cols="12">
      <v-img
        src="../../../public/image/constructorDress/3.webp"
        aspect-ratio="1"
        max-height="256"
      >
      </v-img>
      <v-img
        src="../../../public/image/constructorShirt/1.jpeg"
        aspect-ratio="1"
        max-height="256"
      >
      </v-img>
      <v-img
        src="../../../public/image/hudi2.webp"
        aspect-ratio="1"
        max-height="256"
      >
      </v-img>
    </v-col>
  </v-row>

  <v-row class="justify-center text-center mt-4 mb-4">
    <v-col cols="4">
      <h3>Платье</h3>
      <br />
      <v-btn
        class="pa-3"
        rounded=""
        color="blue-grey-lighten-3"
        to="/constructor/dress"
        >Перейти</v-btn
      >
    </v-col>

    <v-col cols="4">
      <h3>Футболка</h3>
      <br />
      <v-btn
        class="pa-3"
        rounded=""
        color="blue-grey-lighten-3"
        to="/constructor/shirt"
        >Перейти</v-btn
      >
    </v-col>


    <v-col cols="4">
      <h3>Худи</h3>
      <br />
      <v-btn
        class="pa-3"
        rounded=""
        color="blue-grey-lighten-3"
        to="/constructor/hudi"
        >Перейти</v-btn
      >
    </v-col>
  </v-row>

  <v-row>
    <v-col class="d-flex child-flex" cols="12">
      <v-img
        src="../../../public/image/constructorSkirt/5.webp"
        aspect-ratio="1"
        max-height="256"
      >
      </v-img>

      <v-img
        src="../../../public/image/constructorPants/4.jpeg"
        aspect-ratio="1"
        max-height="256"
      >
      </v-img>
    </v-col>
  </v-row>

  <v-row class="justify-center text-center mt-4 mb-4">
    <v-col cols="6">
      <h3>Юбка</h3>
      <br />
      <v-btn
        class="pa-3"
        rounded=""
        color="blue-grey-lighten-3"
        to="/constructor/skirt"
        >Перейти</v-btn
      >
    </v-col>
    <v-col cols="6">
      <h3>Брюки</h3>
      <br />
      <v-btn
        class="pa-3"
        rounded=""
        color="blue-grey-lighten-3"
        to="/constructor/pants"
        >Перейти</v-btn
      >
    </v-col>
  </v-row>
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
        .get("http://localhost:3000/api/productcategory/")
        .then((response) => {
          this.productcategories = response.data;
          console.log(this.productcategories);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>
