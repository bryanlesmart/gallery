<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	const submitForm: SubmitFunction = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					break;
				case 'failure':
					await applyAction(result);
					break;
			}
			await update();
		};
	};
</script>

<section class="text-gray-600 body-font">
	<div class="container px-5 py-24 mx-auto flex flex-wrap">
		<div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img
				src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
				class="w-full"
				alt="Phone image"
			/>
		</div>
		<div class="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
			<div>
				<form action="?/login" method="post" use:enhance={submitForm}>
					<Input label="Email" name="email" type="email" id="email" errors={form?.errors?.email} />
					<Input
						label="Password"
						name="password"
						type="password"
						id="password"
						errors={form?.errors?.password}
					/>

					<div class="navbar-end">
						<button type="submit" class="btn ">Login</button>
					</div>
				</form>
			</div>
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

<!-- <a href="/api/oauth?provider=github" class="btn">Github</a>
<a href="/api/oauth?provider=discord" class="btn">Discord</a> -->
