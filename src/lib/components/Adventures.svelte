<script>
  import HeroImage from '$lib/components/HeroImage.svelte';

  let { story } = $props();

  const {
    content: { adventures, description, heroImage, html },
    name
  } = story;
</script>

<HeroImage image={heroImage} />

<div class="section-inner">
  <header class="page-header">
    <h1 class="entry-title">{name}</h1>
    <p class="excerpt">{description}</p>
  </header>

  <div class="posts" id="posts">
    {#each adventures as [year, group]}
      <ul>
        <li>
          <h3 class="list-title">{year}</h3>
        </li>

        {#each group as adventure}
          <li class="post-preview type-post">
            <a href={adventure.slug}>
              <h2 class="title">{adventure.name}</h2>

              <time dateTime={adventure.first_published_at}>
                {adventure.nice_day}
                {adventure.nice_month}
              </time>
            </a>
          </li>
        {/each}
      </ul>
    {/each}
  </div>
</div>
