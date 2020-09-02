<template>
  <div> 
    <div class="text-center">
      <h2>Ups.. Aún no tienes Grupos</h2>
      <v-chip
        class="ma-2"
        color="primary"
        outlined
      >
        <v-icon left>groups</v-icon>
        Agregar nuevo Grupo
      </v-chip>

    </div>
    <v-row>
      <v-col xs="12" sm="12" md="4">
        <v-hover
          v-slot:default="{ hover }"
          >
          <v-card :to="{ name: 'Home'}"
            :elevation="hover ? 16 : 2"
            color="#952175"
            dark>
            <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline"
                  >Grupo: 1 "A"</v-card-title>

                  <v-card-subtitle>Esc Sec Tec #54</v-card-subtitle>
                </div>

                <v-avatar
                  class="ma-3"
                  size="125"
                  tile
                >
                  <v-img src="../assets/grupocard.jpg"></v-img>
                </v-avatar>
              </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Grupos',
  components: {
  }
}
</script>