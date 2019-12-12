<template>
  <v-container>
    <v-row>
      <v-col class="pt-0 pb-0">
        <v-text-field
          class="pt-0 pb-0"
          v-model="search.text"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
          @keyup.enter="applyFilters"
        ></v-text-field>
      </v-col>
      <v-col class="pt-0 pb-0">
        <v-combobox
          class="pt-0 pb-0"
          :items="categories"
          item-text="name"
          item-value="_id"
          label="Categoria"
          v-model="search.category"
          @change="applyFilters"
          :clearable="true"
        ></v-combobox>
      </v-col>
    </v-row>

    <v-row v-if="this.search.loading" class="justify-center mt-10 mb-10">
      <v-progress-circular :size="70" :width="7" color="blue" indeterminate></v-progress-circular>
    </v-row>
    <v-row class="ml-3" v-else>
      <v-col v-for="item in items" :key="item._id" class="flex-grow-0 ma-2 mb-0 pb-0">
        <v-card max-width="210px">
          <v-img
            class="white--text align-end"
            height="165px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title class="subtitle-1 font-weight-bold">{{item.name}}</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div>Categoria: {{item.category.name}}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      class="mt-3"
      v-model="search.currentPage"
      :length="search.totalPages"
      :total-visible="7"
      @input="goToPage"
    ></v-pagination>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: {
        text: null,
        category: null,
        page: null,
        currentPage: 1,
        totalPages: 0,
        perPage: 3,
        loading: false
      },
      items: [],
      categories: []
    };
  },
  computed: {},
  methods: {
    async fetchItems() {
      this.search.loading = true;
      try {
        const { text, category } = this.search;

        const query = {
          offset: (this.search.currentPage - 1) * this.search.perPage,
          limit: this.search.perPage
        };
        if (text) {
          query.q = text;
        }

        if (category) {
          query.category = category._id;
        }
        const { data } = await axios.get("/items", { params: query });
        this.items = data.results;
        this.search.totalPages = Math.ceil(data.total / this.search.perPage);
      } catch (error) {
        this.items = [];
      }
      this.search.loading = false;
    },

    async applyFilters() {
      await this.fetchItems();
      this.search.currentPage = 1;
    },

    async goToPage(page) {
      this.search.currentPage = page;
      this.fetchItems();
    },

    async fetchCategories() {
      try {
        const response = await axios.get("/categories");
        this.categories = response.data.results;
      } catch (error) {
        this.categories = [];
      }
    }
  },

  async mounted() {
    this.fetchItems();
    this.fetchCategories();
  }
};
</script>