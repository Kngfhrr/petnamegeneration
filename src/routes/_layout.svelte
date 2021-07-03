<script>
    import Nav from '../components/Nav.svelte'
    import Footer from '../components/Footer.svelte'


    export let segment;

</script>

<div class="site">

    <Nav {segment}/>

    <main class="site-content">
        <slot></slot>
    </main>

    <Footer/>
</div>
