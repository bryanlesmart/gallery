<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import { Toaster } from 'svelte-french-toast';

	import '../app.postcss';
</script>

<svelte:head>
	<title>Gallery</title>
</svelte:head>

<Navbar />
<main>
	<Toaster />
	<slot />
</main>

<!-- <section class="overflow-hidden text-neutral-700">
	<div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
		<div class="-m-1 flex flex-wrap md:-m-2">
			<div class="flex w-1/2 flex-wrap">
				<div class="w-1/2 p-1 md:p-2">
					<img
						alt="gallery"
						class="block h-full w-full rounded-lg object-cover object-center"
						src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
					/>
				</div>
				<div class="w-1/2 p-1 md:p-2">
					<img
						alt="gallery"
						class="block h-full w-full rounded-lg object-cover object-center"
						src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
					/>
				</div>
				<div class="w-full p-1 md:p-2">
					<img
						alt="gallery"
						class="block h-full w-full rounded-lg object-cover object-center"
						src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
					/>
				</div>
			</div>
			<div class="flex w-1/2 flex-wrap">
				<div class="w-full p-1 md:p-2">
					<img
						alt="gallery"
						class="block h-full w-full rounded-lg object-cover object-center"
						src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
					/>
				</div>
				<div class="w-1/2 p-1 md:p-2">
					<img
						alt="gallery"
						class="block h-full w-full rounded-lg object-cover object-center"
						src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
					/>
				</div>
				<div class="w-1/2 p-1 md:p-2">
					<img
						alt="gallery"
						class="block h-full w-full rounded-lg object-cover object-center"
						src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp"
					/>
				</div>
			</div>
		</div>
	</div>
</section> -->
