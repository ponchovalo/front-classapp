<template>
    <v-container>
        <div class="text-center" v-if="(tareas.length === 0)">
            <v-alert
                text
                dense
                color="teal"
                icon="mdi-clock-fast"
                border="left">
                No has asignado Tareas y Trabajos a este grupo
            </v-alert>

            <v-chip
                class="ma-2"
                color="primary"
                outlined>
                <v-icon left>library_add_check</v-icon>
                Agregar Tareas y Trabajos
            </v-chip>
        </div>
        <div v-if="!(tareas.length === 0)"> 
            <v-card>
                <v-app-bar
                    dark
                    color="secondary">
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>

                    <v-toolbar-title> {{ grupo.nombre }}</v-toolbar-title>
                </v-app-bar>
                <div>
                    <v-data-table dense
                        :items="tareas"
                        :headers="headers"
                        class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>Trabajos del Grupo -- {{grupo.nombre}}</v-toolbar-title>
                            </v-toolbar>
                        </template>
                    </v-data-table>
                </div>
            </v-card>
        </div>  
        <div class="text-center">
            <v-row>
                <v-dialog  max-width="400px">
                    <v-card>
                        <v-card-title>
                        <span class="headline">Agregar Nuevo Alumno</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container> 
                            <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field 
                                label="Apellido Paterno*" 
                                required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field 
                                label="Apellido Materno*" 
                                required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field 
                                label="Nombre" 
                                required>
                                </v-text-field>
                            </v-col>
                            </v-row>
                        </v-container>
                        <small>*indica que el campo es requierido</small>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text >Close</v-btn>
                        <v-btn color="teal darken-1" text >Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </div>
       
    </v-container>
</template>

<script>
export default {
  name: 'TrabajosGrupo',
  components: {
  },
  data(){
    return{
        grupoId: this.$route.params.id,
        grupo:{},
        tareas:[],
        headers:[
            {text:'Nombre', value:'nombre'},
            {text:'Fecha de Publicacion', value:'fechapublicacion'},
            {text:'Fecha de entrega', value:'fechaentrega'},
            {text:'Descripcion', value:'descripcion'}

        ]
    }
  },
  computed:{

  },
  created(){
      this.obtenerDatos()
      this.obtenerTareas()
  },
  methods:{
    obtenerDatos(){
        this.axios.get('grupos/'+this.grupoId)
        .then((response) => {
            this.grupo = response.data;
        })
        .catch((e)=>{
            console.log('error' + e);
        })
    },
    obtenerTareas(){
        this.axios.get('trabajos/'+this.grupoId)
        .then((response) => {
            this.tareas = response.data;
        })
        .catch((e)=>{
            console.log('error' + e);
        })
    },
    
  }

}
</script>