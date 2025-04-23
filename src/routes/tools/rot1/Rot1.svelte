<script lang="ts">
	import {
		generateDungeon,
		renderDungeonToDOM,
		renderDungeonToCanvas
	} from './dungeon-generator2'

	let rows: number = $state(30)
	let cols: number = $state(50)
	let tileMap: string[][] = $state([])
	let rooms = $state([])
	let doors = $state([])
	let gridContainer: HTMLDivElement
	let miniCanvas: HTMLCanvasElement

	const create = (width = 50, height = 30) => {
		const dungeon = generateDungeon(width, height)
		tileMap = dungeon.displayMap
		rooms = dungeon.rooms
		doors = dungeon.doors
	}

	const recreate = () => {
		create(cols, rows)
	}

	recreate()

	$effect(() => {
		if (gridContainer && miniCanvas) {
			renderDungeonToDOM(gridContainer, tileMap)
			renderDungeonToCanvas(miniCanvas, tileMap)
		}
	})
</script>

<article class="flex justify-center py-4">
	<h1 class="text-4xl font-bold">Dungeon Generator 2</h1>
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
					>{JSON.stringify(tileMap)}</textarea>
			</div>
		</div>
	</div>
</article>
