<script context="module">
    import Home from '../../components/Home.svelte'

    let animaltype;
    let language;

    export async function preload(page) {
		  animaltype = page.params.animalname;
      language = page.params.language
	  }
</script>

<Home animal={animaltype} language={language}/>