<script>
	import Gen3 from './Gen3.svelte'

	import Gen1 from './Gen1.svelte'
	import simpleDungeon from 'simpledungeongenerator'
	let elem = $state()
	const dungeon = new simpleDungeon()

	dungeon.drawToConsole()

	$effect(() => {
		if (elem) {
			dungeon.drawToSVG(elem, 10, {
				withIndex: true,
				withColour: true
			})
		}
	})
</script>

<section class="nwp page">
	<Gen3></Gen3>

	<Gen1></Gen1>
</section>
