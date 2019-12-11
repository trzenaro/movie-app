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
              label="Password"
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
          <v-btn color="primary" @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  data: function() {
    return {
      email: "admin@movieapp.com",
      password: "admin"
    };
  },
  methods: {
    login: async function() {
      const { email, password } = this;

      try {
        const { data } = await axios.request({
          method: "POST",
          url: "http://localhost:5000/auth/login",
          data: qs.stringify({ email, password })
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        this.$router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>