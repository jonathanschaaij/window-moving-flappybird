<script lang="ts">
	import { onMount } from 'svelte';
	import { initialGameState, updateGameState } from '$lib/game';
	import type { GameState } from '$lib/game';

	let gameState: GameState = initialGameState;

	let screen_width: number;
	let screen_height: number;

	let window_width: number = 0;
	let window_height: number = 0;

	let window_top: number = 0;
	let window_left: number = 0;

	$: bird_color = gameState.isGameOver ? 'red' : 'blue';

	onMount(() => {
		screen_width = window.screen.width;
		screen_height = window.screen.height;
		setInterval(() => {
			window_width = window.innerWidth;
			window_height = window.innerHeight;
			window_top = window.screenTop;
			window_left = window.screenLeft;

			const bird_x = (window_left + window_width / 2) / screen_width;
			const bird_y = (window_top + window_height / 2) / screen_height;
			gameState = updateGameState(gameState, bird_x, bird_y);
			console.log(bird_x);
		}, 20);
	});
</script>

<div class="screen_wrapper">
	<div class="bird {bird_color}">{gameState.score}</div>
	{#each gameState.pipes as pipe}
		<div
			class="pipe pipe-top"
			style="width:{screen_width * pipe.width + 'px'}; 
					height:{screen_height * pipe.y - window_top + 'px'};  
				position:absolute; 
				top: 0; 
				left: {screen_width * pipe.x - screenLeft + 'px'}"
		></div>
		<div
			class="pipe pipe-bottom"
			style="width:{screen_width * pipe.width + 'px'}; 
				position: absolute; bottom: 0; 
				height: {window_height - screen_height * (pipe.y + pipe.gap_height) + window_top + 'px'};
				left: {screen_width * pipe.x - screenLeft + 'px'}"
		></div>
	{/each}
</div>

<style>
	.pipe {
		background-color: #00ff00;
	}
	.screen_wrapper {
		position: absolute;
		width: 100vw;
		height: 100vh;
		background-color: #001144;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bird {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;

		width: 50px;
		height: 50px;
		border-radius: 50%;
		top: calc(-var(window_height) / 2 - 25) px;
	}
	.red {
		background-color: red;
	}
	.blue {
		background-color: blue;
	}
</style>
