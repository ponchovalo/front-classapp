<template>
  <div> 
    <div class="text-center">
      <v-alert v-if="grupos===[]"
        text
        dense
        color="teal"
        icon="mdi-clock-fast"
        border="left">
        Aun no tienes Grupos Registrados
      </v-alert>
      <v-alert v-if="alerta.estado"
        text
        dense
        color="success"
        icon="mdi-clock-fast"
        border="left">
        {{alerta.texto}}
      </v-alert>

      <v-chip
        class="ma-2"
        color="primary"
        outlined
        @click="showgroupdialog">
        <v-icon left>groups</v-icon>
        Agregar nuevo Grupo
      </v-chip>

      <v-row>
        <v-dialog v-model="groupdialog" max-width="400px">
          <v-card>
            <v-card-title>
              <span class="headline">Agregar Nuevo Grupo</span>
            </v-card-title>
            <v-card-text>
              <v-container> 
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="grupo.nombre"
                      label="Nombre del Grupo*" 
                      required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="grupo.descripcion"
                      label="Descripcion" 
                      hint="puedes colocar el nombre de la escuela">
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indica que el campo es requierido</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="closegroupdialog">Close</v-btn>
              <v-btn color="teal darken-1" text @click="agregarGrupo(grupo)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      
    </div>

    <v-row>
      <v-col xs="12" sm="12" md="4" v-for="(item, index) in grupos" :key="index">
        <v-hover
          v-slot:default="{ hover }"
          >
          <v-card :to="{ name: 'DetalleGrupo', params: { id: item._id }}"
            :elevation="hover ? 16 : 2"
            color="secondary"
            dark>
            <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline"
                  >{{ item.nombre }}</v-card-title>

                  <v-card-subtitle>{{ item.descripcion }}</v-card-subtitle>
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
  },
  data (){
    return{
      grupos:[],
      grupo:{},
      alerta:{ texto:'', estado: false },
      groupdialog: false
      
    }
  },
  created(){
    this.listarGrupos()
  },
  computed:{
  },
  methods:{
    listarGrupos(){
      this.axios.get('grupos/all')
      .then((response) => {
        console.log(response.data)
        this.grupos = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    agregarGrupo(item){
      this.axios.post('grupos/new', item)
        .then(res => {
          this.closegroupdialog();
          this.listarGrupos();

          //mostrar alerta
          this.alerta.texto="Grupo Creado Correctamente"
          this.alerta.estado = true
        })
        .catch( e => {
          console.log(e)
        })
    },
    showgroupdialog(){
      this.groupdialog=true;
    },
    closegroupdialog(){
      this.limpiargroupdialog();
      this.groupdialog=false;
    },
    limpiargroupdialog(){
      this.grupo.nombre='',
      this.grupo.descripcion=''
    }
  }
}
</script>