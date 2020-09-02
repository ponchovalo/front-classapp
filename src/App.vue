<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app>
      <v-list dense>

        <template>
          <v-list-item :to="{ name: 'Home'}" 
            active-class="primary--text text--accent-4">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>
        </template>


        <template>
          <v-list-item :to="{name: 'Grupos'}"
          active-class="primary--text text--accent-4">
            <v-list-item-action>
              <v-icon>groups</v-icon>
            </v-list-item-action>
            <v-list-item-title>Grupos</v-list-item-title>
          </v-list-item>
        </template>

        <template>
          <v-list-item :to="{name: 'Alumnos'}"
            active-class="primary--text text--accent-4">
            <v-list-item-action>
              <v-icon>face</v-icon> 
            </v-list-item-action>
            <v-list-item-title>Alumnos</v-list-item-title>
          </v-list-item>
        </template>

        <template>
          <v-list-item :to="{name: 'Evaluacion'}"
            active-class="primary--text text--accent-4">
            <v-list-item-action>
              <v-icon>library_add_check</v-icon>
            </v-list-item-action>
            <v-list-item-title>Evaluación</v-list-item-title>
          </v-list-item>
        </template>
          
          
        
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Class App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>person</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>input</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container  fluid>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
    }),
  }
</script>
