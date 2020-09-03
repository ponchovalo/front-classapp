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
                v-if="(alumnos.length === 0)"
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
                @click="showalumndialog">
                <v-icon left>face</v-icon>
                Agregar nuevo Alumno
            </v-chip>

            <v-row>
                <v-dialog v-model="alumndialog" max-width="400px">
                <v-card>
                    <v-card-title>
                    <span class="headline">Agregar Nuevo Alumno</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container> 
                        <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="alumno.apellido.paterno"
                            label="Apellido Paterno*" 
                            required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="alumno.apellido.materno"
                            label="Apellido Materno*" 
                            required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="alumno.nombre"
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
                    <v-btn color="red darken-1" text @click="closealumndialog">Close</v-btn>
                    <v-btn color="teal darken-1" text @click="agregarAlumno(alumno)">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
        </div>
        <div>
            <v-data-table dense
                v-if="!(alumnos.length === 0)"
                :headers="headers"
                :items="alumnos"
                sort-by="apellido.paterno"
                class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Alumnos de : {{grupo.nombre}}</v-toolbar-title>
                    </v-toolbar>
                </template>
                
            </v-data-table>
            
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
        grupo:{},
        alumnos:[],
        alumndialog: false,
        alumno:{apellido:{}},
        headers:[
            {text:'Apellido Paterno',  value:'apellido.paterno'},
            {text:'Apellido Materno', value:'apellido.materno'},
            {text:'Nombre', value:'nombre'},
            
        ]
    }
  },
  created(){
    this.obtenerDatos()
    this.obtenerAlumnos()
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
    },
    obtenerAlumnos(){
        this.axios.get('alumnos/'+this.grupoId)
        .then((response) => {
            console.log(response.data)
            this.alumnos = response.data;
        })
        .catch((e)=>{
            console.log('error' + e);
        })
    },
    showalumndialog(){
        this.alumndialog = true
    },
    closealumndialog(){
        this.alumndialog = false
        this.limpiaralumndialog()
    },
    limpiaralumndialog(){
        this.alumno.nombre='',
        this.alumno.apellido={}
    },
    agregarAlumno(item){
        item.grupo = this.grupo._id
        this.axios.post('alumnos/new', item)
        .then(res => {
            this.closealumndialog();
            this.obtenerAlumnos();

            //mostrar alerta
            //this.alerta.texto="Grupo Creado Correctamente"
            //this.alerta.estado = true

        }).catch( e => {
            console.log(e)
        })
    }
  }

}
</script>