<script>
  import {onMount} from 'svelte'
  import {stores} from '@sapper/app'

  export let segment

  let isActive = false
  let message
  let messageType
  let links = []

  const {session} = stores()
  const APP_NAME = process.env.APP_NAME


  function toggleNav(){
    isActive = !isActive
  }

  onMount(() => {
    function callback(e) {
      window.e || e
      if (e.target.tagName !== 'A') return
      isActive = !isActive
    }

    if (document.addEventListener) {
      document.addEventListener('click', callback, false)
    } else {
      document.attachEvent('onclick', callback)
    }
  })

</script>

<nav class="navbar is-info is-mobile" role="navigation" aria-label="main navigation">
  <div class="container">
    <div class="navbar-brand">
      <span class="navbar-item">
       LOGO HERE
      </span>
      <a role="button" class="navbar-burger burger {isActive ? 'is-active' : undefined}"
         on:click|stopPropagation|preventDefault={toggleNav} aria-label="menu" aria-expanded="false"
         data-target="navMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navMenu" class="navbar-menu {isActive ? 'is-active' : undefined}">
      <div class="navbar-start">
        <a class="navbar-item" class:is-active={segment === 'quote'} href="/quote">
          How it work
        </a>
      </div>
      <div class="navbar-end">
     
</nav>


<style>
  .is-info {
    background: #222222;
  }
  .navbar {
    min-height: 5.25rem;
  }
</style>