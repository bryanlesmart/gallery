<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import { createSearchStore, searchHandler } from '$lib/utils/stores/search';
	import { onDestroy } from 'svelte';
	import type { User } from '@prisma/client';
	export let data: PageData;
	type Gallery = {
		title: string;
		id: string;
		userId: string;
		user: User;
	};

	const searchGallery: Gallery[] = data.articles.map((article: Gallery) => ({
		...article,
		searchTerms: `${article.title} ${article.user.name}`
	}));

	const searchStore = createSearchStore(searchGallery);
	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe;
	});
</script>

<div class="container px-5 py-24 mx-auto">
	<div class="flex flex-col text-center w-full mb-20">
		<div class="container">
			<h1 class="mb-5 font-bold">Search Title | Author</h1>
			<input
				class="input input-bordered  w-full max-w-xs"
				type="search"
				placeholder="Search..."
				bind:value={$searchStore.search}
			/>
		</div>
		<section class="text-gray-600 body-font">
			<div class="container px-5 py-24 mx-auto">
				<div class="flex flex-wrap -m-4">
					{#each $searchStore.filtered as article}
						<Card {article} />
					{/each}
				</div>
			</div>
		</section>
	</div>
</div>
