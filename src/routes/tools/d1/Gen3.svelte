<script>
	import simpleDungeon from 'simpledungeongenerator'
	let elem = $state()
	const dungeon = new simpleDungeon({ maxH: 80, maxW: 80 })
	dungeon.drawToConsole()
	$inspect(dungeon)
	$effect(() => {
		if (elem) {
			dungeon.drawToSVG(elem, 10, {
				withIndex: true,
				withColour: true
			})
		}
	})
</script>

<article class="content">
	<div bind:this={elem}></div>

	<div class="grid grid-cols-1 gap-4 py-4">
		<div class="mockup-code w-full">
			<pre><code>{JSON.stringify(dungeon?.tiles, null, 2)}</code></pre>
		</div>

		<fieldset class="fieldset">
			<textarea placeholder="Bio" class="textarea w-full"
				>{JSON.stringify(dungeon.map)}</textarea>
		</fieldset>
		<fieldset class="fieldset">
			<textarea placeholder="Bio" class="textarea textarea-sm w-full"
				>{JSON.stringify([...dungeon.rooms])}</textarea>
		</fieldset>
	</div>
</article>
