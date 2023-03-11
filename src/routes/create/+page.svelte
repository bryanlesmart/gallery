<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import Input from '$lib/components/form/Input.svelte';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import toast from 'svelte-french-toast';
	import NoPhoto from '$lib/assets/no-photo.jpg';
	export let data: PageData;
	export let form: ActionData;
	let uploadedImage: string;

	const submitForm: SubmitFunction = async () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Successfully added ');
					break;
				case 'failure':
					await applyAction(result);
					break;
			}
			await update();
		};
	};

	const fileSelected = (e: Event) => {
		const image = (e.target as HTMLInputElement)?.files?.[0];
		if (!image) return;
		uploadedImage = URL.createObjectURL(image);
	};

	let tags: string[];
</script>

<section class="text-gray-600 body-font">
	{tags}
	<input type="text" bind:value={tags} name="tags" class="border-red-700" />
	<div class="container px-5 py-24 mx-auto flex flex-wrap">
		<div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
			{#if uploadedImage}
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<figure><img src={uploadedImage} alt="avatar's photo" /></figure>
			{:else}
				<figure><img src={NoPhoto} alt="no_photo" /></figure>
			{/if}
		</div>
		<div class="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
			{#if data.user}
				<form
					action="?/createArticle"
					method="post"
					enctype="multipart/form-data"
					use:enhance={submitForm}
				>
					<Input label="Title" name="title" id="title" errors={form?.errors?.title} />
					<Input optional={true} label="Content" name="content" id="content" />
					<div class="flex flex-col mb-6">
						<span class="text-red-500">This field is Optional | Not required</span>
						<input
							on:change={fileSelected}
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
