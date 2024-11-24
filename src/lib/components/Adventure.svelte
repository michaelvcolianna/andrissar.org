<script>
  import HeroImage from '$lib/components/HeroImage.svelte';
  import { prettyDate } from '$lib/date';

  let { story } = $props();

  const {
    content: { characters, description, heroImage, html, next, previous },
    created_at,
    first_published_at,
    name
  } = story;

  const rawDate = new Date(first_published_at);
  const isoDate = rawDate.toISOString();
  const niceDate = prettyDate(rawDate);
</script>

<article id="content" class="type-post">
  <HeroImage image={heroImage} />

  <header class="entry-header section-inner">
    <a href="/adventures" class="post-list-return">Back to Adventures</a>

    <h1 class="entry-title">{name}</h1>

    <p class="excerpt">{description}</p>

    <div class="meta">
      <time dateTime={isoDate}>{niceDate}</time>
    </div>
  </header>

  <div class="entry-content section-inner">
    <aside>
      <p><strong>Characters:</strong></p>

      <ul>
        {#each characters.value as character}
          <li>{character}</li>
        {/each}
      </ul>
    </aside>

    {@html html}
  </div>

  <div class="post-pagination section-inner">
    <div class="previous-post">
      {#if previous}
        <a href={previous.slug}>
          <span>{previous.name}</span>
        </a>
      {/if}
    </div>

    <div class="next-post">
      {#if next}
        <a href={next.slug}>
          <span>{next.name}</span>
        </a>
      {/if}
    </div>
  </div>
</article>
