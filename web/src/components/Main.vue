<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-list-item :key="item.text" link :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Movie App</span>
      </v-toolbar-title>
      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item link @click="logout">
            <v-list-item-title>{{'Sair'}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height pa-0" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
    }
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-movie", text: "Acervo", link: "/collection" },
      { icon: "mdi-file-document", text: "Categorias", link: "/categories" },
      { icon: "mdi-contacts", text: "Usuários", link: "/users" }
    ]
  })
};
</script>