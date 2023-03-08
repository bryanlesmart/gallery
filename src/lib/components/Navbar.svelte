<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
</script>

<header class="navbar bg-neutral text-neutral-content">
	<div class="container mx-auto flex flex-wrap  flex-col md:flex-row items-center">
		<a href="/" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
			<span class="ml-3 text-xl text-white ">Gallery App</span>
		</a>
		<nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
			{#if $page.data.user}
				<a href="/create" class="mr-5 hover:text-gray-900">Create Post</a>
				<form
					action="/logout"
					method="post"
					use:enhance={() => {
						return async () => {
							await invalidateAll();
						};
					}}
				>
					<button class="btn">Logout </button>
				</form>
			{:else}
				<a href="/login">
					<button class="btn">Login </button>
				</a>
				<a href="/register">
					<button class="btn">Register </button>
				</a>
			{/if}
		</nav>
	</div>
</header>
