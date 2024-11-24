<script>
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import ArchivoRegular from '$lib/assets/fonts/archivo-v18-latin-ext_latin-regular.woff2';
  import ArchivoItalic from '$lib/assets/fonts/archivo-v18-latin-ext_latin-italic.woff2';
  import ArchivoSemiBold from '$lib/assets/fonts/archivo-v18-latin-ext_latin-600.woff2';
  import ArchivoSemiBoldItalic from '$lib/assets/fonts/archivo-v18-latin-ext_latin-600italic.woff2';
  import ArchivoBold from '$lib/assets/fonts/archivo-v18-latin-ext_latin-700.woff2';
  import ArchivoBoldItalic from '$lib/assets/fonts/archivo-v18-latin-ext_latin-700italic.woff2';
  import '../app.scss';

  let { children } = $props();
</script>

<svelte:head>
  <link
    rel="preload"
    href={ArchivoRegular}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href={ArchivoItalic}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href={ArchivoSemiBold}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href={ArchivoSemiBoldItalic}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href={ArchivoBold}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href={ArchivoBoldItalic}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
</svelte:head>

<a class="skip-link button" href="#site-content">
  <span>Skip to the content</span>
</a>

<Header />

<main class="site-content" id="site-content">
  {@render children()}
</main>

<Footer />

<div hidden>
  <span id="label-external">Opens an external site</span>
</div>
