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
    <v-container>
            <v-img src="../../../public/image/login.jpg" max-height="220" max-width="220" class="d-flex mx-auto my-auto mt-2 mb-3"></v-img>
            <v-card>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
            <template v-slot:activator="{ props }">
                <v-btn color="indigo" v-bind="props">
                    Menu as Popover
                </v-btn>
            </template>

            <v-card min-width="300">
                <v-list>
                    <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" title="John Leider"
                        subtitle="Founder of Vuetify">
                        <template v-slot:append>
                            <v-btn variant="text" :class="fav ? 'text-red' : ''" icon="mdi-heart"
                                @click="fav = !fav"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                    <v-list-item>
                        <v-switch v-model="message" color="purple" label="Enable messages" hide-details></v-switch>
                    </v-list-item>

                    <v-list-item>
                        <v-switch v-model="hints" color="purple" label="Enable hints" hide-details></v-switch>
                    </v-list-item>
                </v-list>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn variant="text" @click="menu = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" variant="text" @click="menu = false">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    </div>
    </v-card>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        fav: true,
        menu: false,
        message: false,
        hints: true,
    }),
}
</script>