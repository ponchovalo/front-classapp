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
                @click="showtrabajodialog"
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
                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-chip
                        @click="showtrabajodialog"
                        class="ma-2"
                        color="white"
                        outlined>
                        <v-icon left>library_add_check</v-icon>
                        Agregar Tareas y Trabajos
                    </v-chip>
                </v-app-bar>
                <div>
                    <v-data-table dense
                        :items="tareas"
                        :headers="headers"
                        class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>Trabajos del Grupo -- {{grupo.nombre}}</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.opciones`]="{item}">
                            <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                            <v-icon small  @click="mostrarEliminar(item)">delete</v-icon>
                        </template>
                        <template v-slot:[`item.fechapublicacion`]="{item}">
                            {{ item.fechapublicacion | moment("DD/MM/YYYY")}}
                        </template>
                        <template v-slot:[`item.fechaentrega`]="{item}">
                            {{ item.fechaentrega | moment("DD/MM/YYYY")}}
                        </template>
                    </v-data-table>
                </div>
            </v-card>
        </div>  
        <div class="text-center">
            <v-row>
                <v-dialog  max-width="400px" v-model="trabajodialog">
                    <v-card>
                        <v-card-title>
                        <span class="headline">Agregar Tarea o Trabajo </span>
                        </v-card-title>
                        <v-card-text>
                        <v-container> 
                            <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field 
                                v-model="tarea.nombre"
                                label="Nombre Tarea*" 
                                required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field 
                                v-model="tarea.descripcion"
                                label="Descripcion de la Tarea*" 
                                required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field 
                                v-model="tarea.fechaentrega"
                                type="date"
                                label="Fecha de entrega" 
                                required>
                                </v-text-field>
                            </v-col>
                            </v-row>
                        </v-container>
                        <small>*indica que el campo es requierido</small>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="closetrabajodialog">Close</v-btn>
                        <v-btn color="teal darken-1" text @click="guardarTarea">Save</v-btn>
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
            trabajodialog: false,
            grupoId: this.$route.params.id,
            grupo:{},
            tarea:{},
            tareas:[],
            headers:[
                {text:'Nombre', value:'nombre'},
                {text:'Fecha de Publicacion', value:'fechapublicacion'},
                {text:'Fecha de entrega', value:'fechaentrega'},
                {text:'Descripcion', value:'descripcion'},
                {text:'Opciones', value:'opciones'}

            ]
        }
    },
    computed:{
        formater(item){
            return
            item.toISOString().substr(0, 10)
        }

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
        guardarTarea(){
            this.tarea.grupo = this.grupoId
            this.axios.post('trabajos/new', this.tarea)
            .then((response) => {
                this.obtenerTareas()
                this.closetrabajodialog()
            })
            .catch((e) => {
                console.log('error' + e)
            })
        },
        showtrabajodialog(){
            this.trabajodialog = true;
        },
        closetrabajodialog(){
            this.trabajodialog = false;
            this.limpiartrabajodialog()
        },
        limpiartrabajodialog(){
            this.tarea={}
        }

        

    }
}




</script>