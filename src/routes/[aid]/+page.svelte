<script lang="ts">
	import Input from '$lib/components/form/Input.svelte';
	import type { ActionData, PageData } from './$types';
	import NoPhoto from '$lib/assets/no-photo.jpg';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import toast, { Toaster } from 'svelte-french-toast';
	export let data: PageData;
	export let form: ActionData;

	const showPreview = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = target.files as FileList;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('image') as HTMLImageElement;
			preview.src = src;
			preview.style.display = 'block';
		}
	};

	const updateForm: SubmitFunction = async () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Updated Successfully');
					await update();
					break;
				case 'failure':
					await applyAction(result);
					break;
			}
			await update();
		};
	};
</script>

<Toaster />

<section class="text-gray-600 body-font">
	<div class="container px-5 py-24 mx-auto flex flex-wrap">
		<div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
			{#if data?.article?.image}
				<figure>
					<img id="image" src={data?.article?.image?.url} alt={data.article.image.publicId} />
				</figure>
			{:else}
				<figure>
					<img id="image" src={NoPhoto} alt="Avatar" />
				</figure>
			{/if}
		</div>
		<div class="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
			{#if data.user}
				<form
					action="?/updateArticle"
					method="post"
					enctype="multipart/form-data"
					use:enhance={updateForm}
				>
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
					<div class="flex flex-col mb-6">
						<span class="text-red-500">This field is Optional | Not required</span>
						<input
							type="hidden"
							name="publicId"
							id="publicId"
							value={data?.article?.image?.publicId ?? ''}
						/>
						<input
							on:change={showPreview}
							type="file"
							name="image"
							id="image"
							class="file-input file-input-bordered file-input-md w-full max-w-xs"
						/>
					</div>
					<input type="hidden" name="id" id="id" value={data?.article?.id} />
					<button type="submit" class="btn">Update</button>
				</form>
			{/if}
		</div>
	</div>
</section>
