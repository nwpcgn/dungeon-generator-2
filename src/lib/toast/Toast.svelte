<script lang="ts">
	import { notes, messages } from './toast.svelte.js'
	const atlas = {
		success: {
			style: 'alert-success',
			icon: 'nwp-star'
		},
		error: {
			style: 'alert-error',
			icon: 'nwp-warning'
		},
		loot: {
			style: 'alert-warning',
			icon: 'nwp-tiles'
		},
		npc: {
			style: 'alert-info',
			icon: 'nwp-user'
		},
		combat: {
			style: 'alert-success',
			icon: 'nwp-skull-1'
		},
		info: {
			style: 'alert-info',
			icon: 'nwp-info'
		},
		quest: {
			style: 'alert-warning',
			icon: 'nwp-key'
		}
	}
	let groupList = $state({ ...messages })
	let alertSlugs = $derived(Object.keys(groupList))
</script>

{#snippet iconT(name)}
	<svg class="nwp-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}


<div class="flex gap-2 py-2 flex-wrap">
	{#each alertSlugs as item}
		<button
			class="btn btn-square btn-lg"
			onclick={() => {
				if (!groupList[item].length) {
					return
				}
				let o = groupList[item].shift()
				notes.addNote(o)
			}}>
			<span
				>{@render iconT(atlas[item].icon)}
				<span class="sr-only">{item.icon}</span></span>
		</button>
	{/each}
</div>
<div class="collapse bg-base-100 border-base-300 border">
	<input type="checkbox" />
	<div class="collapse-title font-semibold font-mono">Message Data</div>
	<div class="collapse-content">

		<textarea class="textarea w-full h-96" placeholder="Bio"
			>{JSON.stringify(groupList, null, 4)}</textarea>
	</div>
</div>
