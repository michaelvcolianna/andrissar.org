<script>
  import HeroImage from '$lib/components/HeroImage.svelte';

  let { story } = $props();

  const {
    content: { description, heroImage, html },
    name
  } = story;
</script>

<article id="content">
  <HeroImage image={heroImage} />

  <header class="entry-header section-inner">
    <h1 class="entry-title">{name}</h1>

    <p class="excerpt">{description}</p>
  </header>

  <div class="entry-content section-inner">
    {@html html}
  </div>
</article>
