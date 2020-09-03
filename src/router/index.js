import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/grupos',
        name: 'Grupos',
        component: () =>
            import ( /* webpackChunkName: "Grupo" */ '../views/Grupos.vue')
    },
    {
        path: '/alumnos',
        name: 'Alumnos',
        component: () =>
            import ( /* webpackChunkName: "Alumnos" */ '../views/Alumnos.vue')
    },
    {
        path: '/evaluacion',
        name: 'Evaluacion',
        component: () =>
            import ( /* webpackChunkName: "Evaluacion" */ '../views/Evaluacion.vue')
    }, ,
    {
        path: '/detallegrupo/:id',
        name: 'DetalleGrupo',
        component: () =>
            import ( /* webpackChunkName: "DetalleGrupo" */ '../views/DetalleGrupo.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router