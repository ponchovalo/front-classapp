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
                        <v-col sm="12" md="6">
                            <v-col sm="12" md="12">
                                <v-card color="#40a8c4" dark>
                                    <div class="d-flex flex-no-wrap justify-space-between">
                                        <div>
                                            <v-card-title class="headline">Tareas <br> y Proyectos</v-card-title>
                                        </div>
                                        <v-avatar class="ma-4" size="130">
                                            <v-img src="../assets/tareas.png"></v-img>
                                        </v-avatar>
                                    </div>
                                    <v-card-actions >
                                    <v-btn :to="{ name: 'TrabajosGrupo', params: { id: grupoId }}" text>Ir a Tareas Y Proyectos...</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>

                            <v-col sm="12" md="12">
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
                        </v-col>

                        <v-col sm="12" md="6"> 
                            <v-col sm="12" md="12">
                                <v-card color="#40a8c4" dark>
                                    <div class="d-flex flex-no-wrap justify-space-between">
                                        <div>
                                            <v-card-title class="headline">Evaluacion <br> del Grupo</v-card-title>
                                            <v-list dense rounded color="primary" class="mx-3" v-if="!(elementosEvaluacion.length === 0)">
                                                <v-subheader>Calificacion Total</v-subheader>
                                                <v-list-item-group color="accent">
                                                    <v-list-item @click="editarElemento(item)"
                                                        v-for="item in elementosEvaluacion" v-bind:key="item._id">
                                                    <v-list-item-icon>
                                                        <v-icon>pages</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title><span>{{item.nombre}} ----------------- {{item.valor}}</span></v-list-item-title>
                                                    </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>
                                        </div>
                                        <v-avatar class="ma-4" size="130">
                                            <v-img src="../assets/evaluacion.jpg"></v-img>
                                        </v-avatar>
                                    </div>
                                    <v-card-actions>
                                    <v-btn text @click="evaluaciondialog=true">Agregar Elemento</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
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

            <v-row>
                <v-dialog v-model="evaluaciondialog" max-width="400px">
                    <v-card>
                        <v-card-title>
                        <span class="headline"> {{titulodialogoelemento}} </span>
                        </v-card-title>
                        <v-card-text>
                        <v-container> 
                            <v-row>
                            <v-col cols="12" sm="12" md="8">
                                <v-text-field v-model="elemento.nombre"
                                label="Nombre*" 
                                required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="4">
                                <v-text-field v-model="elemento.valor"
                                label="Valor*" 
                                required>
                                </v-text-field>
                            </v-col>
                            </v-row>
                        </v-container>
                        <small>*indica que el campo es requierido</small>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="closeevaluaciondialog">Close</v-btn>
                        <v-btn color="teal darken-1" text @click="agregarElemento()">Save</v-btn>
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
        evaluaciondialog: false,
        alumno:{apellido:{}},
        formaEvaluar:[],
        elemento:{},
        elementosEvaluacion:[],
        headers:[
            {text:'Apellido Paterno',  value:'apellido.paterno'},
            {text:'Apellido Materno', value:'apellido.materno'},
            {text:'Nombre', value:'nombre'},
            
        ],
        indiceElemento: -1
    }
  },
  computed:{
      titulodialogoelemento () {
        return this.indiceElemento === -1 ? 'Nuevo Elemento' : 'Editar Elemento'
      },

  },
  created(){
    this.obtenerDatos()
    this.obtenerAlumnos()
  },
  methods:{
    obtenerDatos(){
        this.axios.get('grupos/'+this.grupoId)
        .then((response) => {
            this.grupo = response.data;
            this.elementosEvaluacion = response.data.formaevaluar
        })
        .catch((e)=>{
            console.log('error' + e);
        })
    },
    obtenerAlumnos(){
        this.axios.get('alumnos/'+this.grupoId)
        .then((response) => {
            this.alumnos = response.data;
        })
        .catch((e)=>{
            console.log('error' + e);
        })
    },
    editarElemento(item){
        this.indiceElemento = this.elementosEvaluacion.indexOf(item)
        console.log(this.indiceElemento)
        this.elemento.nombre = item.nombre
        this.elemento.valor = item.valor
        this.evaluaciondialog = true;

    },
    agregarElemento(){
        if(this.indiceElemento === -1){
            let nuevo = {}
            nuevo.grupo = this.grupoId
            nuevo.elemento = this.elemento
            this.axios.post('grupos/neweva', nuevo)
            .then((response) => {
                console.log(response.data)
                this.obtenerDatos()
                this.closeevaluaciondialog()
            })
            .catch((e)=>{
                console.log('error' + e);
            })
        }else {
            console.log("vas a editar")
        }
        

    },
    showalumndialog(){
        this.alumndialog = true
    },
    closealumndialog(){
        this.alumndialog = false
        this.limpiaralumndialog()
    },
    closeevaluaciondialog(){
        this.evaluaciondialog = false
        this.limpiarevaluaciondialog()
    },
    limpiaralumndialog(){
        this.alumno.nombre='',
        this.alumno.apellido={}
    },
    limpiarevaluaciondialog(){
        this.elemento = {}
        this.indiceElemento = -1
    },
    agregarAlumno(item){
        item.grupo = this.grupo._id
        console.log(item)
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