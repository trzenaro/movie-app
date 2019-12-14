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
          @change="applyFilters"
        ></v-text-field>
      </v-col>
      <v-col class="pt-0 pb-0">
        <v-combobox
          hide-details
          class="pt-0 pb-0"
          :items="categories"
          item-text="name"
          item-value="_id"
          label="Categoria"
          v-model="search.category"
          @change="applyFilters"
        ></v-combobox>
      </v-col>
      <v-btn class="ml-3 mr-3" color="pink" small dark fab @click="addItem">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-row v-if="this.search.loading" class="justify-center mt-10 mb-10">
      <v-progress-circular :size="70" :width="7" color="blue" indeterminate></v-progress-circular>
    </v-row>
    <v-row class="ml-3" v-else>
      <v-col v-for="item in items" :key="item._id" class="flex-grow-0 ma-2 mb-0 pb-0">
        <v-card min-width="210px" max-width="210px">
          <v-img class="grey white--text align-end" height="165px" :src="item.imageUrl">
            <v-card-title class="subtitle-1 font-weight-bold">{{item.name}}</v-card-title>
          </v-img>

          <v-card-text class="text--primary d-flex">
            <v-col class="pa-0">{{item.category.name}}</v-col>
            <v-btn x-small text icon class="flex-grow-0" @click="editItem(item)">
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      class="mt-3"
      v-model="search.currentPage"
      :length="search.totalPages"
      :total-visible="7"
      @input="fetchItems"
    ></v-pagination>

    <v-dialog v-model="showForm" width="500px">
      <v-card>
        <v-card-title class="grey lighten-1">Cadastro de item</v-card-title>

        <div class="flex-column">
          <v-col>
            <v-text-field
              placeholder="Nome"
              :value="form.name"
              @change.native="form.name = $event.target.value"
              hide-details
            ></v-text-field>
          </v-col>

          <v-col>
            <v-combobox
              hide-details
              :items="categories"
              item-text="name"
              item-value="_id"
              label="Categoria"
              v-model="form.category"
            ></v-combobox>
          </v-col>

          <v-col>
            <v-text-field
              placeholder="Link da imagem"
              :value="form.imageUrl"
              @change.native="form.imageUrl = $event.target.value"
              hide-details
            ></v-text-field>
          </v-col>
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showForm = false">Cancelar</v-btn>
          <v-btn text @click="submitForm" color="primary">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        totalPages: null,
        perPage: 8,
        loading: false
      },
      showForm: false,
      form: {
        name: null,
        category: null,
        imageUrl: null
      },
      items: [],
      categories: []
    };
  },
  methods: {
    async fetchItems() {
      try {
        const { text, category } = this.search;
        const query = {
          offset: (this.search.currentPage - 1) * this.search.perPage,
          limit: this.search.perPage
        };
        if (text) query.q = text;
        if (category) query.category = category._id;

        this.search.loading = true;

        const { status, data } = await axios.get("/items", { params: query });
        if (status != 200) throw new Error(data.message);

        this.items = data.results;
        this.search.totalPages = Math.ceil(data.total / this.search.perPage);
      } catch (error) {
        this.items = [];
        this.$toast.error(error.message);
      }
      this.search.loading = false;
    },

    async applyFilters() {
      this.search.currentPage = 1;
      this.fetchItems();
    },

    async fetchCategories() {
      try {
        const { status, data } = await axios.get("/categories");
        if (status != 200) throw new Error(data.message);
        this.categories = data.results;
      } catch (error) {
        this.categories = [];
        this.$toast.error(error.message);
      }
    },

    async submitForm() {
      const { name, category, imageUrl } = this.form;
      const payload = { name, category, imageUrl };

      try {
        let response;
        if (this.editingItem) {
          response = await axios.put(`/items/${this.editingItem._id}`, payload);
        } else {
          response = await axios.post("/items", payload);
        }
        const { status, data } = response;

        if (![200, 201].includes(status)) throw new Error(data.message);
        this.showForm = false;
        this.fetchItems();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    addItem() {
      this.clearForm();
      this.showForm = true;
      this.editItem = null;
    },

    editItem(item) {
      this.showForm = true;
      this.editingItem = item;
      this.form = JSON.parse(JSON.stringify(item));
    },

    clearForm() {
      Object.keys(this.form, key => (this.form[key] = null));
    }
  },

  async mounted() {
    this.fetchItems();
    this.fetchCategories();
  }
};
</script>