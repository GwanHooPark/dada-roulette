import Vue from 'vue';
import VueRouter from 'vue-router';
import Roulette from '../views/Roulette.vue';
import TestBootstrap from '../views/TestBootstrap.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Roulette',
		component: Roulette,
	},
	{
		path: '/test',
		name: 'TestBootstrap',
		component: TestBootstrap,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
