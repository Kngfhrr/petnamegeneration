<script context="module">
    import PostDetails from "../../pages/PostDetails.svelte";

    let language;
    let slug;

    export async function preload(page) {
        language = page.params.language
        slug = page.params.postslug
    }
</script>

<PostDetails slug={slug} language={language} />