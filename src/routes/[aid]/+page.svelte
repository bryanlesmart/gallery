<script lang="ts">
	import Input from '$lib/components/form/Input.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<section class="text-gray-600 body-font">
	<div class="container px-5 py-24 mx-auto flex flex-wrap">
		<div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10" />
		<div class="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
			{#if data.user}
				<form action="?/updateArticle" method="post">
					<Input
						label="Title"
						name="title"
						id="title"
						value={data?.article?.title}
						errors={form?.errors?.title}
					/>

					<Input
						optional={true}
						label="Content"
						value={data?.article?.content ?? ''}
						name="content"
						id="content"
						errors={form?.errors?.content}
					/>
					<input type="hidden" name="id" id="id" value={data?.article?.id} />
					<button type="submit" class="btn">Update</button>
				</form>
			{/if}
		</div>
	</div>
</section>
