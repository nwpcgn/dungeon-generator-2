<script lang="ts">
	import '../app.css'
	import { Sprites } from '$lib'
	let { children, data } = $props()
</script>

<div class="app-layout">
	<aside class="sidebar">
		<div class="p-4">
			<ul class="menu bg-base-300 rounded-box w-56">
				{#each data.nav as item}
					{@render listItemT(item)}
				{/each}
			</ul>
		</div>
	</aside>
	<div class="header"></div>

	<div class="main-content">
		{@render children()}
	</div>
</div>

{#snippet listItemT({ name, href, icon })}
	<li>
		<a href="#{href}">
			{@render iconT(icon)}
			<span>{name}</span>
		</a>
	</li>
{/snippet}
{#snippet iconT(name)}
	<svg class="nwp-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}

<Sprites></Sprites>
