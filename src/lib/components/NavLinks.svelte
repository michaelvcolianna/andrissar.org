<script>
  import { page } from '$app/stores';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/background', label: 'Background' },
    { href: '/house-rules', label: 'House Rules' },
    { href: '/maps', label: 'Maps' },
    { href: '/characters', label: 'Characters' },
    { href: '/adventures', label: 'Adventures' }
  ];

  const current = (href) =>
    (href === '/' && !$page.params.slug) ||
    href === `/${$page.params.slug}` ||
    (href === '/adventures' && $page.params.slug.startsWith('adventures/'));
</script>

{#each links as link}
  <li class="menu-item" class:current-menu-item={current(link.href)}>
    <a href={link.href}>{link.label}</a>
  </li>
{/each}
