<template>
  <div>
    <v-img src="../../../public/image/login.jpg" max-height="220" max-width="220"
      class="d-flex mx-auto my-auto mt-3"></v-img>
    <h2 class="d-flex flex-column justify-center align-center mt-3 mb-8" style="color:rgba(232, 12, 108, 0.7);">ОТЗЫВЫ ОТ КЛИЕНТОВ</h2>
    <v-row class="mb-6">
      <v-col class="d-flex child-flex" cols="12">
        <v-card class="mx-auto" max-width="344" variant="outlined" v-for="review in reviews" :key="review.id">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                <div class="text-caption">{{ review.rating }}
                <v-icon left>mdi-star</v-icon></div>
                <!-- <v-icon left>mdi-star</v-icon> -->
              </div>
              <div class="text-caption">{{ review.comment }}</div>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <h3 class="d-flex flex-column justify-center align-center mt-3 mb-2" >Оставьте свой отзыв о товаре</h3>
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="6">
        <v-textarea label="Оставьте свой отзыв" auto-grow v-model="newReviewText" variant="outlined" rows="4"
          row-height="25" shaped class="mx-auto"></v-textarea>

        <!-- Добавление рейтинга от 1 до 5 -->
        <v-rating v-model="newReviewRating" half-increments></v-rating>
<br>
        <v-btn color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined" class="mb-8" @click="submitReview">Отправить</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      reviews: [], 
      newReviewText: '', 
      newReviewRating: 0,
    };
  },
  mounted() {
    this.loadReviews();
  },
  methods: {
    loadReviews() {
      // Используйте Axios для загрузки отзывов из вашего серверного API
      axios.get(process.env.VUE_APP_URL + '/api/reviews').then((response) => {
        this.reviews = response.data;
      });
    },
    submitReview() {
      const newReview = {
        comment: this.newReviewText,
        rating: this.newReviewRating,
      };

      // Отправляем новый отзыв на сервер
      axios.post(process.env.VUE_APP_URL + '/api/reviews', newReview).then((response) => {
        this.newReviewText = ''; 
        this.newReviewRating = 0; 
        this.loadReviews(); 
      });
    },
  },
};
</script>
