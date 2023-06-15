<template>
  <div class="prompt-engineering-banner come-up">
    <LogoIcon class="abstract" />
    <h2>What is Prompt Engineering?</h2>
    <p><a href="https://prmpts.ai/blog/what-is-prompt-engineering">Read our blog post</a></p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

  .prompt-engineering-banner {
    border: 0.5px solid #8352FF20;
    border-radius: 6px;
    padding: 2rem;
    overflow: hidden;
    background: #8352FF10;
    position: relative;
  }
  .prompt-engineering-banner h2 {
    font-weight: 600;
    font-size: 1.25rem;
  }
  .prompt-engineering-banner a {
    padding: 0;
    border-bottom: 1px solid #8352FF;
    color: #8352FF;
  }
  .abstract {
    transform: scale(8);
    position: absolute;
    right: 0;
    opacity: 0.3;
  }
  .prompt-engineering-banner a {

  }
</style>
