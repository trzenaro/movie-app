<template>
  <v-container>
    <v-data-table
      dense
      :loading="table.loading"
      loading-text="Carregando..."
      :headers="table.headers"
      :items="categories"
      :items-per-page="15"
      :search="table.search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-card>
          <v-card-title>
            Categorias
            <v-spacer></v-spacer>
            <v-text-field
              v-model="table.search"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn small bottom color="pink" dark fab @click="addCategory">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editCategory(item)">mdi-pencil</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="showForm" width="500px">
      <v-card>
        <v-card-title class="grey lighten-1">Cadastrar categoria</v-card-title>
        <div class="flex-column">
          <v-col>
            <v-text-field placeholder="Nome" v-model="form.name" hide-details></v-text-field>
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
      showForm: false,
      action: null,
      form: {
        name: null,
        email: null,
        password: null
      },
      table: {
        loading: false,
        search: null,
        headers: [
          { text: "Nome", value: "name" },
          { text: "", value: "action", sortable: false }
        ]
      },
      categories: []
    };
  },
  methods: {
    async submitForm() {
      debugger;
      const { name } = this.form;
      const payload = { name };

      try {
        let response;
        if (this.editingCategory) {
          response = await axios.put(
            `/categories/${this.editingCategory._id}`,
            payload
          );
        } else {
          response = await axios.post("/categories", payload);
        }

        debugger;
        const { status, data } = response;
        if (![200, 201].includes(status)) throw new Error(data.message);

        this.showForm = false;
        this.refreshTable();
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    addCategory() {
      this.clearForm();
      this.editingCategory = null;
      this.showForm = true;
    },

    editCategory(category) {
      this.showForm = true;
      this.editingCategory = category;
      this.form = JSON.parse(JSON.stringify(category));
    },

    clearForm() {
      this.form.name = "";
      this.form.password = "";
      this.form.email = "";
    },

    async refreshTable() {
      if (this.table.loading) return;
      this.table.loading = true;
      try {
        const response = await axios.get("/categories");
        this.categories = response.data.results;
      } catch (error) {
        this.categories = [];
      }
      this.table.loading = false;
    }
  },

  async mounted() {
    this.refreshTable();
  }
};
</script>