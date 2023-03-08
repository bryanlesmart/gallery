<script lang="ts">
	import { page } from '$app/stores';
	import type { Article } from '$lib/utils/types/';
	import NoPhoto from '$lib/assets/no-photo.jpg';
	export let article: Article;
</script>

<div class="p-4 md:w-1/3">
	<div class="card w-96 bg-base-100 shadow-xl">
		{#if article?.image}
			<figure><img src={article?.image?.url} alt={article.title} /></figure>
		{:else}
			<figure><img src={NoPhoto} alt="no_photo" /></figure>
		{/if}
		<div class="card-body">
			<h2 class="card-title">
				{article.title}
				<div class="badge badge-secondary">@{article?.user?.name}</div>
			</h2>
			<p>{article.content}</p>
			<div>
				{#if article.userId === $page.data?.user?.userId}
					<div class="badge badge-success text-white">
						<a href="/{article.id}">Edit</a>
					</div>
					<div class="badge badge-error text-white">
						<form action="?/deleteArticle&id={article.id}" method="post">
							<button type="submit">Delete</button>
						</form>
					</div>
				{/if}
			</div>
			<div class="card-actions justify-end">
				<div class="badge badge-error text-white">Tags</div>
				<div class="badge badge-error text-white">Tags</div>
				<div class="badge badge-error text-white">Tags</div>
			</div>
		</div>
	</div>
</div>
