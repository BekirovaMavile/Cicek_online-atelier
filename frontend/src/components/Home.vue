<template>
    <v-parallax
            src="../../public/image/background.jpg"
          >
            <div class="d-flex flex-column fill-height justify-center align-center">
              <h1 class="text-h4 font-weight-black mb-4" style="color: rgba(232, 12, 108, 0.7)">
                СОЗДАЙТЕ СВОЙ ДИЗАЙН ОДЕЖДЫ
              </h1>
              <h4 class="subheading" style="color: rgba(232, 12, 108, 0.7)">
                Одежда, созданная вами: уникальность, качество и стиль нашего онлайн-ателье!
              </h4>
              <br>
            <v-btn
                size="x-large" to="/parametr" color="rgba(232, 12, 108, 0.9)" style="border-radius: 15px;" variant="outlined"
              >НАЧАТЬ</v-btn>
            </div>
          </v-parallax>
  <v-container class="mt-5">
      <v-card class="my-card">
        <v-row>
          <v-col cols="6" class="d-flex flex-column justify-center align-center">
            <div>
              <h2 class="pa-4">Как Это Работает</h2>
              <p>Шаг 1: Зарегистрируйтесь</p>
              <p>Шаг 2: Перейдите в конструктор</p>
              <p>Шаг 3: Создайте свой уникальный дизайн</p>
              <p>Шаг 4: Оформите заказ</p>
              <p>Шаг 5: Ждите!</p>
            </div>
          </v-col>
          <v-col cols="6" class="justify-center align-center">
            <v-img
              src="../../public/image/login.jpg"
              max-height="300"
              max-width="300"
              class="mx-auto my-auto"
            ></v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
          <!-- <h1 class="d-flex flex-column justify-center align-center pa-12">КАТАЛОГ ТОВАРОВ</h1>
        <v-row>
    <v-col
      class="d-flex child-flex"
      cols="12">
      <v-img
        src="../../public/image/hudi1.jpeg"
        aspect-ratio="1">
      </v-img>
      <v-img
            src="../../public/image/hudi2.webp"
            aspect-ratio="1">
          </v-img>
          <v-img
                src="../../public/image/hudi3.jpeg"
                aspect-ratio="1">
              </v-img>
    </v-col>
  </v-row>
    <v-row class="justify-center text-center mt-4 mb-4">
          <v-col cols="4">
            <h3>Худи обычное</h3>
            <h4 class="pa-3">700 руб.</h4>
            <v-btn class="pa-3" rounded="" color="blue-grey-lighten-3" to="/clothes">Перейти</v-btn>
          </v-col>
          <v-col cols="4">
            <h3>Худи на молнии с капюшоном</h3>
            <h4 class="pa-3">1100 руб.</h4>
            <v-btn class="pa-3" rounded="" color="blue-grey-lighten-3" to="/clothes">Перейти</v-btn>
          </v-col>
          <v-col cols="4">
            <h3>Жилет женский</h3>
            <h4 class="pa-3">1150 руб.</h4>
            <v-btn class="pa-3" rounded="" color="blue-grey-lighten-3" to="/clothes">Перейти</v-btn>
          </v-col>
        </v-row> -->
</template>
<script>
export default {
    data() {
        return {
        }
    }
} 
</script>
