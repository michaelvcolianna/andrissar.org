<script>
  import Adventure from '$lib/components/Adventure.svelte';
  import Adventures from '$lib/components/Adventures.svelte';
  import Page from '$lib/components/Page.svelte';
  import Seo from '$lib/components/Seo.svelte';

  let { data } = $props();

  let story = $derived(data.story);
</script>

{#key story.full_slug}
  <Seo {story} />

  {#if story.content.component === 'adventure'}
    <Adventure {story} />
  {:else if story.content.isTheAdventuresPage}
    <Adventures {story} />
  {:else}
    <Page {story} />
  {/if}
{/key}
