<script>
  import texts from "../texts";

  export let language = 'en'

  $: currentText = texts[language] ? texts[language] : texts['en']

</script>

<header class="header">
  <img class="logo" src="../img/logo.png" alt=""/>
  <input class="menu-btn" type="checkbox" id="menu-btn" />
  <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
  <ul class="menu">
    <li><a target="_self" href="/{language}/dog">{currentText.headerButtons.main}</a></li>
    <li><a target="_self" href="/{language}/blog">{currentText.headerButtons.blog}</a></li>
  </ul>
</header>

<style>

  .header {
    background-color: #313131;
    box-shadow: 1px 1px 4px 0 rgba(0,0,0,.1);
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    z-index: 3;
    justify-content: space-between;
    padding: 0 5%;
  }
   .logo {
     height: inherit;
   }
  .header ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    background-color: #fff;
  }

  .header li a {
    display: block;
    padding: 28px !important;
    text-decoration: none;
    color: #fff;
    background-color: #313131;
  }


  .header li a:hover,
  .header .menu-btn:hover {
    background-color: #f4f4f4;
    color: #0a0a0a;
  }

  .header li a:checked,
  .header .menu-btn:current ~ .menu {
      display: none !important;
  }

  .header .logo {
    display: block;
    float: left;
    font-size: 2em;
    padding: 10px 20px;
    text-decoration: none;
  }

  /* menu */

  .header .menu {
    clear: both;
    max-height: 0;
    transition: max-height .2s ease-out;
    position: absolute;
  }

  /* menu icon */

  .header .menu-icon {
    cursor: pointer;
    display: inline-block;
    float: right;
    padding: 28px 20px;
    position: relative;
    user-select: none;
  }

  .header .menu-icon .navicon {
    background: #fff;
    display: block;
    height: 2px;
    position: relative;
    transition: background .2s ease-out;
    width: 18px;
  }

  .header .menu-icon .navicon:before,
  .header .menu-icon .navicon:after {
    background: #fff;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    transition: all .2s ease-out;
    width: 100%;
  }

  .header .menu-icon .navicon:before {
    top: 5px;
  }

  .header .menu-icon .navicon:after {
    top: -5px;
  }

  /* menu btn */

  .header .menu-btn {
    display: none;
  }

  .header .menu-btn:checked ~ .menu {
    max-height: max-content;
    /*position: absolute;*/
    width: 100%;
    left: 0;
    top: 80px;
  }

  .header .menu-btn:checked ~ .menu-icon .navicon {
    background: transparent;
  }

  .header .menu-btn:checked ~ .menu-icon .navicon:before {
    transform: rotate(-45deg);
  }

  .header .menu-btn:checked ~ .menu-icon .navicon:after {
    transform: rotate(45deg);
  }

  .header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
  .header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
    top: 0;
  }

  /* 48em = 768px */

  @media (min-width: 48em) {
    .header li {
      float: left;
    }
    .header li a {
      padding: 20px 30px;
    }

    .header .menu {
      clear: none;
      float: right;
      max-height: none;
      position: inherit;
    }
    .header .menu-icon {
      display: none;
    }
  }


</style>