<script>
    import {onMount} from 'svelte';
    let currentUrlParam

    onMount(async () => {
        const currentPet = window.location.href
        const result = /[^/]*$/.exec(currentPet)[0];
        currentUrlParam = !result ? 'dog' : result
    })

    let directories = [
        {id: 0, name: 'dog', icon: 'icons/dog.svg'},
        {id: 1, name: 'cat', icon: 'icons/cat.svg.svg'},
        {id: 2, name: 'hamster',  icon: 'icons/hamster.svg'},
        {id: 3, name: 'horse',  icon: 'icons/horse.svg'},
        {id: 4, name: 'fish',  icon: 'icons/fish.svg'}
    ]


    function setParams(name){
        window.location.href = `http://localhost:3000/en/${name}`;
    }

</script>

<style>
    .pet-menu {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: max-content;
        height: auto;
        padding: 10px;
        position: absolute;
        top: 0;
    }

    .icon {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        background: #bfbebe;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px;
        padding: 10px;
        transition: 500ms;
        opacity: 0.6;
    }
    .icon:hover {
        opacity: 1;
    }

    .active {
        background: #ecd776;
        width: 100px;
        height: 100px;
    }
    .img-pet {
        width: 100%;
        height: 100%;
    }
    @media screen and (max-width: 768px) {
        .icon {
           width: 40px;
            height: 40px;
            margin: 10px;
        }
        .active {
            width: 60px;
            height: 60px;
        }
        .pet-menu {
            width: auto;
            position: inherit;
            margin-top: -50px;
        }
    }
</style>

<div class="pet-menu">
    {#each directories as pet, index }
        <a on:click={()=>setParams(pet.name)}>
            <div class="icon {(pet.name === currentUrlParam) && `active`}">
                <img class="img-pet" src='../../../img/{pet.icon}' alt={pet.name}/>
            </div>
        </a>
    {/each}
</div>


