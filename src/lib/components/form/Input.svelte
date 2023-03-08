<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface $$Props extends HTMLInputAttributes {
		name: string;
		id: string;
		label?: string;
		type?: string;
		errors?: string[] | undefined;
		value?: string | undefined;
		optional?: boolean;
	}

	export let name: string;
	export let label: string | undefined = undefined;
	export let value: string | undefined = undefined;
	export let id: string;
	export let optional = false;
	export let type: string = 'text';
	export let errors: string[] | undefined = [];
</script>

<div class="relative mb-4">
	<h1><label for="name" class="leading-7 text-lg text-gray-600">{label}</label></h1>
	{#if optional === true}
		<span class="text-red-500">This field is Optional | Not required</span>
	{/if}
	<input
		autocomplete={name}
		{type}
		{id}
		{name}
		value={value?.length ? value : ''}
		class="w-full bg-white rounded border {errors?.length
			? 'border-red-600'
			: ' border-gray-300'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
	/>
	{#if errors}
		{#if errors.length > 0}
			{#each errors as error}
				<label for={id} class="label py-0">
					<div class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
						{error}
					</div>
				</label>
			{/each}
		{/if}
	{/if}
</div>
