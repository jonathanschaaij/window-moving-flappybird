<script lang="ts">
	import { onMount } from 'svelte';

	let interValId;

	let circle_position_x:number = 0;
	let circle_position_y:number = 0;

	let circle_vel_x:number = 0;
	let circle_vel_y:number = 0;

	let target_position_x:number = 0;
	let target_position_y:number = 0;

	let screen_width:number = 0;
	let screen_height:number = 0;

	let window_width:number = 0;
	let window_height:number = 0;

	let window_top:number = 0;
	let window_left:number = 0;

	onMount(()=> {
	screen_width = window.screen.width;
	screen_height = window.screen.height;
	intervalId = setInterval(() => {
		window_width = window.innerWidth;
		window_height = window.innerHeight;
		window_top = window.screenTop;
		window_left = window.screenLeft;

		circle_position_x += circle_vel_x;
		circle_position_y += circle_vel_y;

		target_position_x = window_left + window_width / 2;
		target_position_y = window_top + window_height / 2;

		circle_vel_x = (target_position_x - circle_position_x) / 50;
		circle_vel_y = (target_position_y - circle_position_y) / 50;
	    }, 0);
	})
</script>
<style>
body {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
}

.circle {
    width: 10px;
    height: 10px;
    background-color: #3498db;
    border-radius: 50%;
}
</style>

<div class="circle" style="transform: translate({circle_position_x-window_left}px, {circle_position_y-window_top}px)"></div>
