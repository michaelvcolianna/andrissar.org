<script>
  import NavLinks from '$lib/components/NavLinks.svelte';
  import { onMount } from 'svelte';
  import { onNavigate } from '$app/navigation';

  let menuNode;
  let menuToggle;
  let navOpen = $state(false);

  onMount(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Escape' && navOpen) {
        navOpen = false;
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    const windowResizeHandler = () => {
      if (window.innerWidth > 1000) {
        navOpen = false;
      }
    };

    window.addEventListener('resize', windowResizeHandler);
  });

  onNavigate(() => navOpen = false);
</script>

<header class="site-header group">
  <h1 class="site-title">
    <a href="/" class="site-name">Andrissar 719</a>
  </h1>

  <div class="site-description">A 5E D&amp;D Campaign</div>

  <button
    aria-label="Show/hide the menu"
    class="nav-toggle"
    class:active={navOpen}
    onclick={() => (navOpen = !navOpen)}
    bind:this={menuToggle}
  >
    <div class="bar"></div>
    <div class="bar"></div>
  </button>

  <div class="menu-wrapper">
    <ul class="main-menu desktop">
      <NavLinks />
    </ul>
  </div>
</header>

<div class="mobile-menu-wrapper" class:visible={navOpen} bind:this={menuNode}>
  <ul class="main-menu mobile">
    <NavLinks />
  </ul>
</div>
