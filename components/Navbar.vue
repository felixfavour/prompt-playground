<template>
  <div class="navbar-ctn section">
    <div class="inner">
      <Logo />
      <nuxt-link class="btn-link" to="/login">
        LOGIN
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarComp'
}
</script>

<style scoped>
  .section {
    padding-top: 0;
    height: 80px;
  }
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn-link {
    min-width: 100px;
    padding: 0 1rem;
    height: 45px;
    font-weight: 500;
    background: #8352FF20;
    border-radius: 6px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    -ms-border-radius: 6px;
    -o-border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s ease-in;
    -webkit-transition: 0.2s ease-in;
    -moz-transition: 0.2s ease-in;
    -ms-transition: 0.2s ease-in;
    -o-transition: 0.2s ease-in;
  }
  .btn-link:hover {
    background: #8352FF10;
  }
  .btn-link:active {
    background: #8352FF;
    color: #fff;
  }

</style>
