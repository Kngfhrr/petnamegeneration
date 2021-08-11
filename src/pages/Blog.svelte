<script>
    import moment from 'moment'
    import texts from '../texts'
    import {onMount} from "svelte";
    import {goto} from "@sapper/app";
    import {getArticles, getStrapiMedia} from "../api";

    export let language = 'en'

    let articles = [];

    $: currentText = texts[language] ? texts[language] : texts['en']

    onMount(async () => {
        articles = await getArticles(language)
    })

    function navigateToPost(slug) {
        goto(`/${slug}`)
    }
</script>

<div class="background-image"></div>
<div class="bg">
    <div class="blog-title">
        <h1>{currentText.blogTitle}</h1>
        <p>{currentText.blogSubtitle}</p>
    </div>
    <div class="blog-wrap">
        <div class="line"></div>
        {#each articles as item}
            <a on:click={()=>navigateToPost(item.slug)} class="grow">
                <div class="card">
                    <div class="card-image">
                        <figure class="image">
                            <img src={getStrapiMedia(item.image.url)} alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4">{item.title}</p>
                                <p class="subtitle is-6">{item.description}</p>
                            </div>
                        </div>
                        <div class="content">
                            <time datetime="2016-1-1">{moment(item.created_at).format("MMM Do YY")}</time>
                        </div>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>

<style>
    .grow {
        transition: all .2s ease-in-out;
    }

    .grow:hover {
        transform: scale(1.05);
    }

    .blog-title {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        margin: 0 10%;
    }

    .blog-title h1 {
        font-size: 64px;
        font-weight: bolder;
        width: max-content;
        height: max-content;
        padding: 20px;
        background: #ffdd57;
    }

    .blog-title p {
        font-weight: bold;
        font-size: 24px;
        width: max-content;
        height: max-content;
        padding: 20px;
        /*background: #9a9a9a;*/
    }

    .line {
        width: 100%;
        height: 10px;
        background: #7a7a7a;
        margin-bottom: 50px;
    }

    .blog-wrap {
        margin: 0 10%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        min-height: 100vh;
        max-height: max-content;
        padding-bottom: 80px;
    }

    .card {
        height: max-content;
        margin: 20px;
        width: 400px;
    }

    .card-image {
        width: 100%;
    }

    .image {
        width: 100%;
    }

    .bg {
        /*background-image: url("../img/paw-art.png");*/
        /* background-size: contain;*/
    }

    .background-image {
        position: fixed;
        left: 0;
        right: 0;
        z-index: -1;
        display: block;
        background-image: url("../img/paw-art.png");
        width: 100%;
        height: 100%;
        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);
        background-size: contain;
    }

    @media screen and (max-width: 768px) {
        .blog-wrap {
            margin: 0 5%;
        }

        .blog-title {
            align-items: center;
            margin: 0;
        }
        .card {
            width: auto;
        }
    }

</style>