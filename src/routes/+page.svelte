<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';

	export let data: PageData;
	$: ({ articles } = data);
</script>

<section class="text-gray-600 body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4">
			{#each articles as article}
				<Card {article} />
			{/each}
		</div>
	</div>
</section>
