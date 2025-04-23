<script>
	import { createDungeon } from '2d-dungeon'

	const size = 48 // width, height
	const scale = 2 // will stretch the array
	const options = {}
	const dungeon = createDungeon(size, scale, options)
</script>

<article class="content">
	<div class="grid grid-cols-2 gap-4 py-4">
		<div class="mockup-code w-full">
			<pre><code>without prefix</code></pre>
		</div>
		<div class="mockup-code w-full">
			<pre><code>without prefix</code></pre>
		</div>
		<fieldset class="fieldset">
			<textarea placeholder="Bio" class="textarea w-full"></textarea>
		</fieldset>
		<fieldset class="fieldset">
			<textarea placeholder="Bio" class="textarea w-full"></textarea>
		</fieldset>
	</div>
</article>
