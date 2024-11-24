<script>
  import ExternalLink from '$lib/components/ExternalLink.svelte';

  const year = Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric'
  }).format(new Date());
</script>

<footer class="site-footer section-inner">
  <p class="copyright">
    © 2000-{year}
    <ExternalLink href="https://github.com/michaelvcolianna" label="MVC" />.
  </p>
  <p class="theme-by">
    Theme by <ExternalLink
      href="https://andersnoren.se"
      label="Anders Noren"
    />. Powered by <ExternalLink
      href="https://www.storyblok.com/"
      label="Storyblok"
    /> and <ExternalLink href="https://svelte.dev/" label="Svelte+Kit" />. (<ExternalLink
      href="https://github.com/michaelvcolianna/andrissar.org"
      label="Source Code"
    />)
  </p>
</footer>
