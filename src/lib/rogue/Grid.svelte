<script lang="ts">
	import './dungeon-grid.scss'
	import {
		generateDungeon,
		renderDungeonToDOM,
		renderDungeonToCanvas
	} from './dungeon-generator'

	let rows: number = $state(30)
	let cols: number = $state(50)
	let tileMap: string[][] = $state([])
	let dungeon = $state([])
	let rooms = $state([])
	let doors = $state([])
	let style = $derived(`--gg-size: 800px;	--gg-gap: 1px;	--gg-cols: ${cols};`)
	let player = $state({ x: 0, y: 0 })
	let gridContainer: HTMLDivElement
	let miniCanvas: HTMLCanvasElement

	const create = (width = 50, height = 30) => {
		dungeon = generateDungeon(width, height)
		tileMap = dungeon.displayMap
		rooms = dungeon.rooms
		doors = dungeon.doors

		doors.forEach(({ x, y }) => {
			tileMap[y][x] = 'D'
		})

		rooms.forEach(({ x1, y1, x2, y2 }) => {
			tileMap[y1][x1] = 'o'
			tileMap[y1][x2] = 'o'
			tileMap[y2][x1] = 'o'
			tileMap[y2][x2] = 'o'
		})

	

		const { centerX, centerY } = rooms[0]
		player = { x: centerX, y: centerY }
	}

	const recreate = () => {
		create(cols, rows)
	}

	recreate()

	$effect(() => {
		if (gridContainer && miniCanvas) {
			// renderDungeonToDOM(gridContainer, tileMap)
			renderDungeonToCanvas(miniCanvas, tileMap)
		}
	})
</script>

<article class="flex justify-center py-4">
	<h1 class="text-4xl font-bold">Dungeon Generator 2</h1>
	<p>Player {player.x} {player.y}</p>
</article>
<article class="flex justify-center py-4">
	<div class="rogue-grid" {style}>
		{#each tileMap as row, y}
			{#each row as col, x}
				<span
					class="tile"
					class:wall={col === '#'}
					class:floor={col === '.'}
					class:obs={col === 'o'}
					class:door={col === 'D'}>
					{#if player.x == x && player.y == y}
						<span class="player"></span>
					{/if}
				</span>
			{/each}
		{/each}
	</div>
</article>
<article class="mb-4 flex flex-col items-center gap-4 py-4">
	<div class="join">
		<label class="input join-item">
			<span>Cols</span>
			<input type="number" bind:value={cols} min={10} max={100} />
		</label>
		<label class="input join-item">
			<span>Rows</span>
			<input type="number" bind:value={rows} min={10} max={100} />
		</label>
		<button class="btn btn-neutral join-item" onclick={recreate}
			>Generate</button>
	</div>
	<div bind:this={gridContainer} id="grid" class="bg-error my-4"></div>
	<canvas bind:this={miniCanvas} id="minimap" class="border border-gray-500"
	></canvas>
	<div>
		<div class="bg-base-100 border-base-300 collapse border">
			<input type="checkbox" />
			<div class="collapse-title font-semibold">Map JSON</div>
			<div class="collapse-content text-sm">
				<textarea class="textarea w-xl" rows="10"
					>{JSON.stringify(dungeon)}</textarea>
			</div>
		</div>
	</div>
</article>
