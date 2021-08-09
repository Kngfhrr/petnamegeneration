<script context="module">
    import Blog from "../../pages/Blog.svelte";

    let language;

    export async function preload(page) {
        language = page.params.language
    }
</script>

<Blog language={language} />