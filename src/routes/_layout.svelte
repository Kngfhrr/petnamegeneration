<script context="module">
    import Nav from '../components/Nav.svelte'
    import Footer from '../components/Footer.svelte'

    let language;

    const regex = new RegExp('ru*|en*')
    const isPath = (path) => regex.test(path)

    export async function preload(page) {
        const lang = page.path.slice(1, 3)
        language = isPath(lang) ? lang : 'en'
    }

</script>

<div class="site">
    <Nav language={language}/>
    <main class="site-content">
        <slot></slot>
         <Footer/>
    </main>
</div>
