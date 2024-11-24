<script>
  import { dev } from '$app/environment';
  import { page } from '$app/stores';

  let { story } = $props();

  const {
    content: { description, socialImage },
    full_slug,
    name
  } = story;

  const siteUrl = dev ? 'http://localhost:5173' : 'https://andrissar.org';
  const seoDescription =
    description ?? 'Dungeons & Dragons campaign website for Andrissar 719.';
  const seoImage = socialImage?.filename ?? `${siteUrl}/default-card.jpg`;
  const seoTitle = name
    ? `${name} - Andrissar 719`
    : 'Andrissar 719 - A 5E D&D Campaign';
  const seoUrl =
    full_slug !== 'home' ? `${siteUrl}${$page.url.pathname}` : siteUrl;
</script>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="title" content={seoTitle} />
  <meta property="og:title" content={seoTitle} />
  <meta name="twitter:title" content={seoTitle} />
  <link rel="canonical" href={seoUrl} />
  <meta property="og:url" content={seoUrl} />
  <meta name="twitter:url" content={seoUrl} />
  <meta name="description" content={seoDescription} />
  <meta property="og:description" content={seoDescription} />
  <meta name="twitter:description" content={seoDescription} />
  <meta name="image" content={seoImage} />
  <meta property="og:image" content={seoImage} />
  <meta name="twitter:image" content={seoImage} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="robots" content="noai, noimageai" />
</svelte:head>
