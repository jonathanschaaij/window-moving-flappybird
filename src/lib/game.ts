type Bird = {
	//pass
};

type Pipe = {
  x: number;
  y: number;
	width: number;
	gap_height:number;
};

type GameState = {
  bird: Bird;
  pipes: Pipe[];
  score: number;
  isGameOver: boolean;
};

// Initialize the game state
const initialGameState: GameState = {
  bird: {
    x: 0.1,
    y: 0.5,
    velocity: 0,
  },
  pipes: [],
  score: 0,
  isGameOver: false,
};

// Function to update the game state
function updateGameState(state: GameState, bird_y:number): GameState {
  // Update pipe positions
	state.bird.y = bird_y;
  let maxPipeX = 0; 
  for (let pipe of state.pipes) {
    pipe.x -= 0.01;
    maxPipeX = Math.max(maxPipeX, pipe.x);
		
		// check for collision:
		if (state.bird.x < pipe.x + pipe.width && state.bird.x > pipe.x ){
			if (state.bird.y < pipe.y-pipe.gap_height/2 || state.bird.y + 0.05 > pipe.y + pipe.gap_height/2) {
				state.isGameOver = true;
			}
		}

		if (pipe.x + pipe.width < state.bird.x) {
			state.score += 1;
		}
		
		if (pipe.x < -0.1) {
			pipe.x = 1; //Once a pipe is off the screen, move it to the right side to recycle it
		}
  } 
  if (maxPipeX < 0.5) {
		state.pipes.push({
			x: 1,
			y: 1/3 + Math.random() / 3 ,
			width: 0.03,
			gap_height: 0.1,
		});
	}
  return state;
}
