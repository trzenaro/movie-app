<template>
  <div>
    <v-row>
      <v-text-field
        v-model="search.text"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
    </v-row>
    <v-row>
      <v-col v-for="item in filteredItems" :key="item._id">
        <v-card max-width="250px">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>{{item.name}}</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div>Categoria: {{item.category}}</div>
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
      items: []
    };
  },
  computed: {
    filteredItems() {
      if (!this.search.text) return this.items;
      const search = this.search.text.toLowerCase();
      return this.items.filter(
        item => item.name.toLowerCase().indexOf(search) > -1
      );
    }
  },
  methods: {},

  async mounted() {
    try {
      const response = await axios.get("/items");
      this.items = response.data.results;
    } catch (error) {
      this.items = [];
    }
  }
};
</script>