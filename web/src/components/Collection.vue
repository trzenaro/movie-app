<template>
  <div>
    <v-row>
      <v-text-field
        v-model="search.text"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
        @keyup.enter="fetchItems"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-col v-for="item in items" :key="item._id">
        <v-card max-width="250px">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>{{item.name}}</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div>Categoria: {{item.category.name}}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: {
        text: null,
        category: null
      },
      items: [],
      categories: {}
    };
  },
  computed: {},
  methods: {
    async fetchItems() {
      try {
        const { text } = this.search;
        const filters = {
          offset: 0,
          limit: 10
          //category: "5def923d9804470ff42535ff"
        };
        if (text) {
          filters.name = text;
        }
        const response = await axios.get("/items", { params: filters });
        this.items = response.data.results;
      } catch (error) {
        this.items = [];
      }
    }
  },

  async mounted() {
    this.fetchItems();
  }
};
</script>