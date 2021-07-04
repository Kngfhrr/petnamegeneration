<script>
  export let animal = 'dog';
  export let language = 'en';
  import { config } from '../animals.config';
  import texts from '../texts';
  import ColorChagin from './ColorChagin.svelte'
  import { fly } from 'svelte/transition'
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  let currentConfig = config[animal] ? config[animal] : config['dog'];
  let currentText = texts[language] ? texts[language] : texts['en'];


  onMount(async () => {
    if (!texts[language]) {
      goto('/')
    }
    if (!config[animal]) {
      goto('/')
    }
  });
  let value;
  let visible = false
  let loading = false
  let genderList = {
    0: 'male',
    1: 'female'
  };
  let selectedGender = 0;
  let genders = ['Male', 'Female']  
  let category = 'dog'
  let currentName = ''

  async function getName() {
    try {
      loading = true
      visible = true
      const res = await fetch('https://api.mypup.io/name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: category.toLowerCase(),
          gender: genderList[value],
          language,
        }),
      })
      const resJson = await res.json()
      currentName = resJson.name
    } catch (error) {
      visible = false
    } finally {
      loading = false
    }
  }

  function closePopup() {
    visible = !visible
    currentName = ''
  }
</script>

<svelte:head>
  <title>mypup.io</title>
</svelte:head>

<section class="hero with-img is-light" style="background-image: url({currentConfig.bgImage})">
  <div class="hero-body pl-6 with-opacity">
    <div class="container">
      <div>
        <ColorChagin />
      </div>
      <h1 class="title is-size-1 has-text-light">{currentText.title[0]} <br/> {currentText.title[1]} {currentConfig.displayName[language]}</h1>

      <div class="wrap-input-generation">
        <div class="wrap-select">
          <select class="custom-select" bind:value>
            {#each currentText.genderSelect as gender}
              <option value={currentText.genderSelect.findIndex((gen) => gen === gender)}>{gender}</option>
            {/each}
          </select>
          <div class="line" />
        </div>

        <div class="wrap-input">
          <input class="input is-large input0-generation" type="text" placeholder={currentText.inputPlaceholder} />
        </div>

        <button on:click={getName} style={{ zIndex: 0 }} class="button is-info is-large">{currentText.submitButton}</button>
      </div>
      <div class="mt-3">
        <h2 class="has-text-light"
          >{currentText.subtitle}
      </h2>

        {#if visible}
          <div transition:fly={{ y: -200, duration: 400 }} class="generated-name-wrap">
            <div class="generated-name-msg">
              {#if loading}
              <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
              {:else}
                <span>{currentText.nameModalTitle}</span>
                <div class="generated-name">{currentName}</div>
                <button on:click={closePopup} class="button is-success mt-5">{currentText.nameModalButton}</button>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #5FC578;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #5FC578 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


  .with-img {
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
    height: 95vh;
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }
  .generated-name-msg button {
    width: 200px;
  }
  .generated-name {
    font-size: 48px;
    margin-top: 25px;
  }
  .generated-title {
  }
</style>
