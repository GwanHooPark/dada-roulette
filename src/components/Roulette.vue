<template>
	<div>
		<h3>{{ msg }}</h3>
		<div class="container">
			<button @click="addItem()">아이템 추가</button>
			<div v-for="(item, index) in items" :key="index">
				<input v-model="item.value" :key="index" />
			</div>
			<div class="input-group" style="margin-bottom: 10px">
				<input
					type="text"
					class="form-control"
					placeholder="할일을 입력하세요"
				/>
				<span class="input-group-btn">
					<button class="btn btn-default" type="button">추가</button>
				</span>
			</div>
		</div>
		<div class="roulette-outer">
			<div class="roulette-pin"></div>
			<div
				class="roulette-button"
				@click="play()"
				:class="{ active: isActive }"
			>
				GoGo!
			</div>
			<div class="roulette" :style="rouletteRotateAngle">
				<!-- 값 영역 -->
				<div class="item-wrapper">
					<div
						class="item"
						:style="itemStyles[index]"
						:class="{ blink: isSelected(index) }"
						v-for="(item, index) in items"
						:key="index"
					>
						{{ item.value }}
					</div>
				</div>
				<!-- 선영역 -->
				<div class="line-wrapper">
					<div
						class="line"
						:style="lineStyles[index]"
						v-for="(item, index) in items"
						:key="index"
					></div>
				</div>
			</div>
		</div>
		<div>
			당첨 : <span>{{ result }}</span>
		</div>
		<b-button variant="primary">Button</b-button>
	</div>
</template>

<script>
export default {
	name: 'Roulette',
	props: {
		msg: String,
	},
	data() {
		return {
			items: [],
			itemStyles: [],
			lineStyles: [],
			current: 0,
			count: 0,
			isActive: true,
			result: '',
		};
	},
	computed: {
		isSelected() {
			return index => {
				if (!this.result) return false;
				return index == this.current;
			};
		},
		segment() {
			return 360 / this.items.length;
		},
		offset() {
			return this.segment / 2;
		},
		angle() {
			const temp = this.current * this.segment;
			const randomOffset =
				Math.floor(Math.random() * this.segment) - this.offset + 1;
			const cycle = this.count * 360 * 5;
			return cycle - temp + randomOffset;
		},
		rouletteRotateAngle() {
			return {
				transform: `rotate(${this.angle}deg)`,
			};
		},
	},
	mounted() {
		this.drawRoulette();
	},
	methods: {
		addItem() {
			this.items.push({ value: '' });
			this.drawRoulette();
		},
		drawRoulette() {
			this.itemStyles = [];
			this.lineStyles = [];
			this.items.forEach((el, idx) => {
				this.itemStyles.push({
					transform: `rotate(${this.segment * idx}deg)`,
				});
				this.lineStyles.push({
					transform: `rotate(${this.segment * idx + this.offset}deg)`,
				});
			});
		},
		play() {
			if (!this.isActive) return;
			this.count++;
			this.isActive = false;
			this.reset();
			setTimeout(() => {
				this.isActive = true;
				this.result = this.items[this.current].value;
			}, 5000);
		},
		reset() {
			this.current = Math.floor(Math.random() * this.items.length);
			this.result = '';
		},
	},
};
</script>

<style scoped>
.roulette-outer {
	position: relative;
	overflow: hidden;
	width: 400px;
	height: 400px;
	font-size: 30px;
	margin-left: auto;
	margin-right: auto;
}
.roulette-outer > .roulette {
	position: absolute;
	top: 5%;
	left: 5%;
	right: 5%;
	bottom: 5%;
	border-radius: 50%;
	border: 2px solid black;
}
.roulette-outer > .roulette-pin {
	position: absolute;
	top: 3%;
	left: 50%;
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 25px 5px 0 5px;
	border-color: #ff0000 transparent transparent transparent;
	margin-left: -5px;
}
.roulette-outer > .roulette-button {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 100;
	cursor: initial;
	width: 80px;
	height: 80px;
	border-radius: 50%;
	background-color: #256d4d;
	border: 2px solid #fff;
	box-shadow: 0 0 16px rgb(221, 221, 221);
	text-align: center;
	font-size: 21px;
	font-weight: bold;
	color: #fff;
	line-height: 76px;
	font-family: sans-serif;
}
.active {
	background-color: #3eaf7c !important;
	cursor: pointer !important;
}
.roulette-outer > .roulette > .item-wrapper > .item {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding-top: 10%;
	text-align: center;
	display: flex;
	justify-content: center;
}
.roulette-outer > .roulette > .line-wrapper > .line {
	position: absolute;
	top: 0;
	bottom: 50%;
	left: 50%;
	width: 2px;
	margin-left: -1px;
	background: black;
	transform-origin: bottom;
}
.roulette-outer > .roulette {
	transition: transform 5s ease-in-out;
}
@keyframes blink-effect {
	50% {
		opacity: 0;
	}
}
.blink {
	animation: blink-effect 1s step-end infinite;
}
</style>
