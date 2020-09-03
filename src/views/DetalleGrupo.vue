<template>
    <v-container>
        <div>
            <v-card>
                <v-app-bar
                    dark
                    color="secondary">
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>

                    <v-toolbar-title>{{ grupo.nombre }}</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>groups</v-icon>
                    </v-btn>
                </v-app-bar>
                <v-container>
                    <v-row> 
                        <v-col sm="12" md="4">
                            <v-card color="#40a8c4" dark>
                                <div class="d-flex flex-no-wrap justify-space-between">
                                    <div>
                                        <v-card-title class="headline">Evaluacion <br> del Grupo</v-card-title>
                                            <v-list dense rounded color="#40a8c4">
                                                <v-list-item-group>
                                                    <v-list-item>
                                                        <v-list-item-title>Examen - 40%</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <v-list-item-title>Trabajos - 40%</v-list-item-title>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>
                                    </div>
                                    <v-avatar class="ma-4" size="130">
                                        <v-img src="../assets/evaluacion.jpg"></v-img>
                                    </v-avatar>
                                </div>
                                <v-card-actions>
                                <v-btn text>Editar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>

                        <v-col sm="12" md="4">
                            <v-card color="#40a8c4" dark>
                                <div class="d-flex flex-no-wrap justify-space-between">
                                    <div>
                                        <v-card-title class="headline">Tareas <br> y Proyectos</v-card-title>
                                    </div>
                                    <v-avatar class="ma-4" size="130">
                                        <v-img src="../assets/tareas.png"></v-img>
                                    </v-avatar>
                                </div>
                                <v-card-actions>
                                <v-btn text>Agregr Elemento</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>

                        <v-col sm="12" md="4">
                            <v-card color="#40a8c4" dark>
                                <div class="d-flex flex-no-wrap justify-space-between">
                                    <div>
                                        <v-card-title class="headline">Evaluacion <br> Alumnos</v-card-title>
                                    </div>
                                    <v-avatar class="ma-4" size="130">
                                        <v-img src="../assets/alumno.png"></v-img>
                                    </v-avatar>
                                </div>
                                <v-card-actions>
                                <v-btn text>Ir a Evaluacion...</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </div>  
        <div class="text-center">
            <v-alert
                text
                dense
                color="teal"
                icon="mdi-clock-fast"
                border="left">
                Aun no tienes Alumnos Registrados
            </v-alert>

            <v-chip
                class="ma-2"
                color="primary"
                outlined
                @click="showgroupdialog">
                <v-icon left>face</v-icon>
                Agregar nuevo Alumno
            </v-chip>
        </div>
    </v-container>
</template>

<script>
export default {
  name: 'DetalleGrupo',
  components: {
  },
  data(){
      return{
          grupoId: this.$route.params.id,
          grupo:{}
      }
  },
  created(){
      this.obtenerDatos()
  },
  methods:{
      obtenerDatos(){
        this.axios.get('grupos/'+this.grupoId)
        .then((response) => {
            console.log(response.data)
            this.grupo = response.data;
        })
        .catch((e)=>{
            console.log('error' + e);
        })
      }
  }

}
</script>