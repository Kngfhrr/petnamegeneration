<script context="module">
    import Nav from '../../components/Nav.svelte'
    import Footer from '../../components/Footer.svelte'

    let language;

    export async function preload(page) {
        language = page.params.language
    }

</script>

<div class="site">
    <Nav {language}/>
    <main class="site-content">
        <slot></slot>
         <Footer/>
    </main>
</div>
