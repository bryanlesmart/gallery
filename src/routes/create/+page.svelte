<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import Input from '$lib/components/form/Input.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<section class="text-gray-600 body-font">
	<div class="container px-5 py-24 mx-auto flex flex-wrap">
		<div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10" />
		<div class="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
			{#if data.user}
				<form action="?/createArticle" method="post" enctype="multipart/form-data">
					<Input label="Title" name="title" id="title" errors={form?.errors?.title} />
					<Input optional={true} label="Content" name="content" id="content" />
					<div class="flex flex-col mb-6">
						<span class="text-red-500">This field is Optional | Not required</span>
						<input
							type="file"
							name="image"
							id="image"
							class="file-input file-input-bordered file-input-md w-full max-w-xs"
						/>
					</div>
					<button type="submit" class="btn btn-wide">Create</button>
				</form>
			{/if}
		</div>
	</div>
</section>
