export type Bird = {
  x: number;
  y: number;
};

export type Pipe = {
  x: number;
  y: number;
	width: number;
	gap_height:number;
  passed: boolean;
};

export type GameState = {
  bird: Bird;
  pipes: Pipe[];
  score: number;
  isGameOver: boolean;
  pipe_distance: number;
};

// Initialize the game state
export const initialGameState: GameState = {
  bird: {
    x: 0.1,
    y: 0.5,
    velocity: 0,
  },
  pipes: [],
  score: 0,
  isGameOver: false,
  pipe_distance: 0.3,
};

// Function to update the game state
export function updateGameState(state: GameState, bird_x:number, bird_y:number): GameState {
  if (state.isGameOver) {
	  return state;
  }
  // Update pipe positions
  state.bird.x = bird_x;
  state.bird.y = bird_y;
  let maxPipeX = 0; 
  for (const pipe of state.pipes) {
    pipe.x -= 0.001 + state.score * 0.00003;
    maxPipeX = Math.max(maxPipeX, pipe.x);
		
		// check for collision:
		if (state.bird.x < pipe.x + pipe.width && state.bird.x > pipe.x ){
			console.log("Width matches pipe")
			if (state.bird.y < pipe.y || state.bird.y > pipe.y + pipe.gap_height) {
				console.log("Bird hit pipe")
				console.log(state)
				state.isGameOver = true;

			}
		}

		if (pipe.x + pipe.width < state.bird.x && !pipe.passed) {
			pipe.passed = true;
			state.score += 1;
		}
		
		if (pipe.x < -0.1) {
			state.pipes.splice(state.pipes.indexOf(pipe), 1);
		}
  } 
  if (maxPipeX < 1 - state.pipe_distance) {
		state.pipe_distance = 0.3 - 0.9**(100-state.score) * 0.2;
		state.pipes.push({
			x: 1,
			y: 1/3 + Math.random() / 3 ,
			width: 0.03,
			gap_height: 0.1,
			passed: false,
		});
	}
  return state;
}
