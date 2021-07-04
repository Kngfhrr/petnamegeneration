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
  let currentText = texts[language] ? texts[language] : texts['en']
  let thisImage;

  onMount(async () => {
    if (thisImage.complete) {
      thisImage.setAttribute('src',thisImage.getAttribute('data-src'));
      thisImage.style.filter = 'blur(0)';
    }
    thisImage.onload = () => {
      thisImage.setAttribute('src',thisImage.getAttribute('data-src'));
      thisImage.style.filter = 'blur(0)';
      thisImage.onload = null;
    }
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

<section class="hero with-img is-light" >
  <img bind:this={thisImage} data-src="{currentConfig.bgImage}" src="{currentConfig.bgImageLow}" alt="backround" class="background-img">
  <div class="hero-body pl-6 with-opacity">
    <div class="container">
      <div>
        <ColorChagin />
      </div>
      <h1 class="title is-size-1 has-text-light transition-text">{currentText.title[0]} <br/> {currentText.title[1]} {currentConfig.displayName[language]}</h1>

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
        <h2 class="has-text-light transition-text"
          >{currentText.subtitle}
      </h2>

        {#if visible}
          <div transition:fly={{ duration: 400 }} class="generated-name-wrap">
            <div class="generated-name-msg area">
              {#if loading}
              <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
              {:else}
              <ul class="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
        </ul>
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


.context {
    /* width: 100%; */
    /* position: absolute; */
    top:50vh;
    
}

.context h1{
    text-align: center;
    color: #fff;
    font-size: 50px;
}


.area{
    background: #4e54c8;  
    background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);  
    /* width: 100%; */
    height:100vh;
}

.circles{
    position: absolute;
    bottom: 100px;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.circles li{
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
    
}

.circles li:nth-child(1){
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
}


.circles li:nth-child(2){
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
}

.circles li:nth-child(3){
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
}

.circles li:nth-child(4){
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
}

.circles li:nth-child(5){
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
}

.circles li:nth-child(6){
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
}

.circles li:nth-child(7){
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
}

.circles li:nth-child(8){
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
}

.circles li:nth-child(9){
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
}

.circles li:nth-child(10){
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
}



@keyframes animate {

    0%{
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100%{
        transform: translateY(-2000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }

}









.transition-text {
  animation: slide 1s;
  position: relative;
}
@keyframes slide {
  from {
   opacity: 0;
   left: -300px;
  }
  to {
    opacity: 1;
    left: 0;
  }
}

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


  .background-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 1.5s;
    filter: blur(0.5rem);
    position: absolute;
    z-index: 0;
  }
  .with-img {
    position: relative;
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
    position: relative;
    animation: slide-input 1s;
    box-shadow: 9px 11px 32px 1px rgba(0,0,0,0.65);
    -webkit-box-shadow: 9px 11px 32px 1px rgba(0,0,0,0.65);
    -moz-box-shadow: 9px 11px 32px 1px rgba(0,0,0,0.65);
  }
  @keyframes slide-input {
  from {
   opacity: 0;
   width: 10%;
   left: 30%;
  }
  to {
    opacity: 1;
    left: 0;
    width: 100%;
  }
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
