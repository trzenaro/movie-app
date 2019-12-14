<template>
  <v-container>
    <v-data-table
      dense
      :loading="table.loading"
      loading-text="Carregando"
      :headers="table.headers"
      :items="users"
      :items-per-page="15"
      :search="table.search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-card>
          <v-card-title>
            Usuários
            <v-spacer></v-spacer>
            <v-text-field
              v-model="table.search"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn small bottom color="pink" dark fab @click="addUser">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editUser(item)">mdi-pencil</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="showForm" width="500px">
      <v-card>
        <v-card-title class="grey lighten-1">Cadastrar usuário</v-card-title>
        <div class="flex-column">
          <v-col>
            <v-text-field prepend-icon="mdi-account" placeholder="Nome" v-model="form.name" hide-details></v-text-field>
          </v-col>
          <v-col>
            <v-text-field prepend-icon="mdi-email" placeholder="Email" v-model="form.email" hide-details></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              prepend-icon="mdi-lock"
              placeholder="Senha"
              v-model="form.password"
              type="password"
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
      showForm: false,
      action: null,
      form: {
        name: null,
        email: null,
        password: null
      },
      table: {
        search: null,
        loading: false,
        headers: [
          { text: "Nome", value: "name" },
          { text: "Email", value: "email" },
          { text: "", value: "action", sortable: false }
        ]
      },
      users: []
    };
  },
  methods: {
    async submitForm() {
      const { name, email, password } = this.form;
      const payload = { name, email, password };

      try {
        if (this.action === "create") {
          await axios.post("/users", payload);
        } else if (this.action === "edit") {
          await axios.put(`/users/${this.editingUser._id}`, payload);
        }

        this.showForm = false;
        this.refreshTable();
      } catch (error) {
        console.error(error);
      }
    },

    addUser() {
      this.clearForm();
      this.showForm = true;
      this.action = "create";
    },

    editUser(user) {
      this.action = "edit";
      this.showForm = true;
      this.editingUser = user;
      this.form = user;
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
        const response = await axios.get("/users");
        this.users = response.data.results;
      } catch (error) {
        this.users = [];
      }
      this.table.loading = false;
    }
  },

  async mounted() {
    this.refreshTable();
  }
};
</script>