<script>
  import HeroImage from '$lib/components/HeroImage.svelte';
  import { page } from '$app/stores';
</script>

<article id="content">
  <HeroImage image={{
    filename: 'https://a-us.storyblok.com/f/1022488/1800x475/28216c01b6/trap-dungeon.jpg',
    title: 'Dungeon trap',
    alt: 'A trap in a dungeon with spikes and an axe (from https://www.cbr.com/dnd-dungeon-master-traps/)'
  }} />

  <div class="section-inner">
    <h1>Not found</h1>

    <p>There doesn't seem to be anything at "{$page.params.slug}"</p>
  </div>
</article>
