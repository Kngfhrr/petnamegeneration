<script>

import ColorChagin from "./ColorChagin.svelte"
import { fly } from 'svelte/transition'
let visible = false;
  let value = 'Male'
  let items = ['Male', 'Female']

  let country = 'english'
  let category = 'dog'
  let currentName = ''


  async function getName() {
    try {
      visible = true
      const res = await fetch('https://api.mypup.io/name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category: category.toLowerCase(),
          gender: value.toLowerCase(),
          country: country.toLocaleLowerCase(),
        }),
      });
      const resJson = await res.json();
      currentName = resJson.name;
  
    } catch (error) {
      visible = false;
    } 
  }

function closePopup() {
  visible = !visible
}

</script>

<svelte:head>
  <title>mypup.io</title>
</svelte:head>

<section class="hero with-img is-light">
  <div class="hero-body pl-6 with-opacity">
    <div class="container">
      <div>
      <ColorChagin />
      </div>
      <p class="title is-size-1 has-text-light">Find the perfect name <br /> for your pet</p>

      <div class="wrap-input-generation">
        <div class="wrap-select">
          <select class="custom-select" bind:value>
            {#each items as item}
              <option value={item}>{item}</option>
            {/each}
          </select>
          <div class="line" />
        </div>

        <div class="wrap-input">
          <input class="input is-large input0-generation" type="text" placeholder="Enter description" />
        </div>

        <button on:click={getName} style={{zIndex: 0}} class="button is-info is-large">GET NAME</button>
      </div>
      <div class="mt-3">
        <span class="has-text-light"
          >Naming your new pet is a big step—so don’t let information overload get you down!
        </span>

        {#if visible}
          <div transition:fly="{{ y: -200, duration: 400 }}" class="generated-name-wrap">
            <div class="generated-name-msg">
             
               <span>Your pet name is: </span>
               <div class="generated-name">{currentName}</div>
               <button on:click={closePopup} class="button is-success mt-5">Got it</button>
            </div>
           
          </div>
          {/if}
        
      </div>
    </div>
  </div>
</section>

<style>
  .with-img {
    background-image: url('/img/dog.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .with-opacity {
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
  .wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .spacer {
    display: block;
    width: 100%;
    height: 3em;
  }
  .subtitle {
    font-size: 1.9rem;
  }
  .icon svg {
    width: 50px;
    height: 50px;
    margin-bottom: 16px;
    color: #2793da;
  }
  .wrap-select {
    display: flex;
  }
  .spaced {
    padding: 6em 1.5em;
  }
  @media all and (min-width: 767px) {
    .box {
      height: 212px;
    }
  }
  .line {
    width: 1px;
    background: rgba(153, 153, 153);
    height: 80px;
    margin-left: 40px;
    margin-right: 25px;
  }
  .hero-body {
    height: 94vh;
    padding-top: 14%;
  }

  
 
  .wrap-input-generation {
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #fff;
    padding: 20px;
    align-items: center;
    /* max-height: max-content; */
  }

  @media screen and (max-width: 768px) {
    .wrap-input-generation {
      flex-direction: column;
      height: 260px;
      z-index: 0;
    }
    .line {
      display: none;
    }
    .wrap-input {
      width: 100% !important;
     
    }
    .wrap-input input {
       font-size: medium !important;
    }
    .generated-name-wrap {
      margin-top: -400px !important;
    }

  }

  .input-generation {
    border: none;
    outline: none;
    width: 50%;
    font-size: 20px;
  }
  .wrap-input {
    width: 72%;
  }
  .wrap-input input {
    min-height: 4rem;
    outline: none;
    border: none;
    box-shadow: none;
  }
  .wrap-input input:focus {
    outline: none;
  }
  .custom-select {
    outline: none;
    border: none;
    background: none;
    font-size: 24px;
  }
  .custom-select option {
    /* background: chocolate; */
    border: none;
    outline: none;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  .generated-name-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: -245px;
  }
  .generated-name-msg {
    background: #fff;
    width: 500px;
    height: 300px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    padding: 50px;
    font-size: 22px;
    text-align: center;
    z-index: 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
  .generated-name {
    font-size: 48px;
    margin-top: 25px;

  }
  .generated-title {
    
  }
</style>
