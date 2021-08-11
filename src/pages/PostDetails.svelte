<script>
    import marked from 'marked';
    import moment from "moment";
    import {onMount} from "svelte";
    import {getArticleBySlug, getStrapiMedia} from "../api";

    export let slug
    export let language = 'en'

    let post = {}

    onMount(async () => {
        post = await getArticleBySlug(slug)
    })

    const tag = (name) => name.replace(/\s/g, '').toLowerCase()

</script>

<div>
    <div class="background-image"></div>
    <div class="post-title">
        <h1>
            {post.title}
        </h1>
        <p>
            {post.description}
        </p>
    </div>
    <div class="blog-wrap">
        <div class="line"></div>
        <div class="post-wrap">
            <div class="post-info">
                <div class="media mr-6">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img src="{getStrapiMedia(post.author?.picture.url)}" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">{post.author?.name}</p>
                        <p class="subtitle is-6">@{tag(post.author?.name || '')}</p>
                    </div>
                </div>
                <div class="content">
                    <a href="/{language}/blog">#{post.category?.name}</a>
                    <br>
                    <time datetime="2016-1-1">{moment(post.created_at).format("MMM Do YY")}</time>
                </div>
            </div>
            <img class="mb-4" src="{getStrapiMedia(post.image?.url)}" alt='main-img'/>
            <div class="marked">
                {@html marked(post.content || '')}
            </div>

        </div>
    </div>
</div>

<style>
    .marked {
        word-break: break-word;
    }

    .post-title {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        margin: 0 25%;
        line-height: normal;
    }

    .post-wrap {
        word-break: break-all;
        background: #f0f8ff82;
        padding: 20px;
    }

    .post-info {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 50px;
    }

    .post-title h1 {
        font-size: 64px;
        font-weight: bolder;
        padding: 20px;
        margin-top: 50px;
        word-break: break-word;
        line-height: normal;
    }

    .post-title p {
        font-weight: bold;
        font-size: 24px;
        padding: 20px;
        word-break: break-word;
    }

    .line {
        width: 100%;
        height: 10px;
        background: #7a7a7a;
    }

    .blog-wrap {
        margin: 0 25%;
        flex-direction: row;
        flex-wrap: wrap;
        min-height: 100vh;
        max-height: max-content;
        max-width: max-content;
        padding-bottom: 80px;
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

        .post-title {
            margin: 0 5%;
        }

        .post-title h1 {
            align-items: center;
            font-size: 44px;
            padding: 0;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .post-title p {
            padding: 0;
            margin-bottom: 20px;
        }
    }

</style>