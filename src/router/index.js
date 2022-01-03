import Vue from 'vue';
import VueRouter from 'vue-router';
import Roulette from '../views/Roulette.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Roulette',
		component: Roulette,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
