<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login Movie App</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Login"
              name="login"
              prepend-icon="mdi-account"
              type="text"
              v-model="email"
            />
            <v-text-field
              id="password"
              label="Senha"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="password"
              @keyup.enter="login"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="login()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: function() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    async login() {
      const credentials = { email: this.email, password: this.password };
      try {
        await this.$store.dispatch("login", credentials);
      } catch (error) {
        if (error.message) this.$toast.error(error.message);
      }
    }
  }
};
</script>