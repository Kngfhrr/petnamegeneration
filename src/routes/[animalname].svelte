<script context="module">
    import Home from '../components/Home.svelte'

    let animaltype;
    export async function preload(page) {
		animaltype = page.params.animalname;
	}
</script>

<Home animal={animaltype}/>