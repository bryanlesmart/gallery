<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { updated } from '$app/stores';
	import Input from '$lib/components/form/Input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let loading: boolean;

	$: loading = false;

	const submitRegister: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					break;
				case 'failure':
					await applyAction(result);
					break;
			}
			loading = false;
			await update();
		};
	};
</script>

<section class="text-gray-600 body-font">
	<div class="container px-5 py-24 mx-auto flex flex-wrap">
		<div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img
				src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
				class="w-full"
				alt="Sample image"
			/>
		</div>
		<div class="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
			<form action="?/register" method="post" use:enhance={submitRegister}>
				<Input label="Name" name="name" id="name" errors={form?.errors?.name} />
				<Input label="Email" type="email" name="email" id="email" errors={form?.errors?.email} />
				<Input label="Username" name="username" id="username" errors={form?.errors?.username} />
				<Input
					label="Password"
					type="password"
					name="password"
					id="password"
					errors={form?.errors?.password}
				/>
				<Input
					label="Confirm Password"
					type="password"
					name="passwordConfirm"
					id="passwordConfirm"
					errors={form?.errors?.passwordConfirm}
				/>
				<button type="submit" class="btn" disabled={loading}>Register</button>
			</form>
		</div>
	</div>
</section>

{#if form?.message}
	<div class="toast toast-end toast-middle">
		<div class="alert alert-error">
			<div>
				<span>{form?.message}</span>
			</div>
		</div>
	</div>
{/if}
