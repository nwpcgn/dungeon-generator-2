# Simple Dungeon Generator

A simple dungeon generator for javascript (typed) and the browser with only one dependency (for seeded random numbers).

Highly configurable, but with sensible defaults.

![GitHub release (with filter)](https://img.shields.io/github/v/release/Purukitto/simpleDungeonGenerator) ![GitHub issues](https://img.shields.io/github/issues/purukitto/simpleDungeonGenerator) ![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/purukitto/simpleDungeonGenerator/main.yml) [![npm](https://img.shields.io/npm/v/simpledungeongenerator)](https://www.npmjs.com/package/simpledungeongenerator) ![npm bundle size](https://img.shields.io/bundlephobia/min/simpledungeongenerator)

Demo: https://purukitto.github.io/SDGdemo/

See the latest changelog [here](./CHANGELOG.md)

## Installation

### npm

```bash
npm install simpledungeongenerator
```

### yarn

```bash
yarn add simpledungeongenerator
```

## Usage

Simplest dungeon with:

```typescript
// ESM
import simpleDungeon from 'simpledungeongenerator'

const dungeon = new simpleDungeon()

dungeon.drawToConsole()
```

```javascript
// CJS
const simpleDungeon = require('simpledungeongenerator').default

const dungeon = new simpleDungeon()

dungeon.drawToConsole()
```

```html
<!-- Browser -->
<!-- path to bundle -->
<script src="./node_modules//simpledungeongenerator/dist/bundle.js"></script>
<script>
	const dungeon = simpleDungeon()
	const svgContainer = document.getElementById('svg-container') // SVG container
	dungeon.drawToSVG(svgContainer, 5, {
		withIndex: true,
		withColour: true
	})
</script>
```

## Options

| Option         | Type   | Default      | Description                                               |
| -------------- | ------ | ------------ | --------------------------------------------------------- |
| seed           | string | "purukitto"  | Seed for the random number generator                      |
| maxH           | number | 50           | Maximum height of the dungeon                             |
| maxW           | number | 50           | Maximum width of the dungeon                              |
| type           | string | "Base"       | Type of the dungeon to generate (Currently has no effect) |
| roomTries      | number | 150          | Number of times to try to generate a room                 |
| extraRoomSize  | number | 0            | Extra size to add to the room                             |
| windingPercent | number | 50           | Percentage of the dungeon to be winding                   |
| tiles          | Object | defaultTiles | Tiles to use for the dungeon                              |
| startIndex     | number | 1            | Index to start the dungeon from                           |

## Properties

| Property | Type       | Description                              |
| -------- | ---------- | ---------------------------------------- |
| map      | object[][] | A 2D array representing the dungeon map. |
| rooms    | Room[]     | An array of rooms in the dungeon         |
| tiles    | Object     | The tiles used for the dungeon           |

## Methods

| Method          | Description                      |
| --------------- | -------------------------------- |
| drawToConsole() | Draws the dungeon to the console |
| drawToSVG()     | Draws the dungeon to an SVG      |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](./LICENSE.md)

## Acknowledgements

- [seedrandom](https://github.com/davidbau/seedrandom) - Seedable random number generator
- [Article](https://journal.stuffwithstuff.com/2014/12/21/rooms-and-mazes/) - Fabulous article on dungeon generation
- [changesets](https://github.com/changesets/changesets/tree/main) - Used for managing changelogs and releases
- [Rollup](https://rollupjs.org/) - Used for bundling the library

# Dungeon generator

This is a procedural dungeon generator written in javascript.

[Live demo](https://domasx2.github.io/dungeon-generator/)

## Installation

```
yarn add 2d-dungeon --save
```

## Features

1. Pre-defined, tagged rooms
2. Highly configurable
3. Seeded rng
4. Feedback about exits, perimeter, etc
5. (Optional) corridors
6. (Optional) circular paths

## Output examples

![Sample 1](https://domasx2.github.io/dungeon-generator/samples/sample1.png)
![Sample 2](https://domasx2.github.io/dungeon-generator/samples/sample2.png)
![Sample 3](https://domasx2.github.io/dungeon-generator/samples/sample3.png)
![Sample 4](https://domasx2.github.io/dungeon-generator/samples/sample4.png)

## Usage

@TODO

```javascript
import { Dungeon } from '2d-dungeon'

let dungeon = new Dungeon({
	max_iterations: 50,
	size: [100, 100],
	seed: 'abcd', //omit for generated seed
	rooms: {
		initial: {
			min_size: [3, 3],
			max_size: [3, 3],
			max_exits: 1,
			position: [0, 0] //OPTIONAL pos of initial room
		},
		any: {
			min_size: [2, 2],
			max_size: [5, 5],
			max_exits: 4
		}
	},
	max_corridor_length: 6,
	min_corridor_length: 2,
	corridor_density: 0.5, //corridors per room
	symmetric_rooms: false, // exits must be in the center of a wall if true
	interconnects: 1, //extra corridors to connect rooms and make circular paths. not 100% guaranteed
	max_interconnect_length: 10,
	room_count: 10
})

dungeon.generate()
dungeon.print() //outputs wall map to console.log

dungeon.size // [width, heihgt]
dungeon.walls.get([x, y]) //return true if position is wall, false if empty

for (let piece of dungeon.children) {
	piece.position //[x, y] position of top left corner of the piece within dungeon
	piece.tag // 'any', 'initial' or any other key of 'rooms' options property
	piece.size //[width, height]
	piece.walls.get([x, y]) //x, y- local position of piece, returns true if wall, false if empty
	for (let exit of piece.exits) {
		let { x, y, dest_piece } = exit // local position of exit and piece it exits to
		piece.global_pos([x, y]) // [x, y] global pos of the exit
	}

	piece.local_pos(dungeon.start_pos) //get local position within the piece of dungeon's global position
}

dungeon.initial_room //piece tagged as 'initial'
dungeon.start_pos //[x, y] center of 'initial' piece
```

or

```js
import { createDungeon } from '2d-dungeon'

const size = 48 // width, height
const scale = 2 // will stretch the array
const options = {}
const dungeon = createDungeon(size, scale, options)
```
