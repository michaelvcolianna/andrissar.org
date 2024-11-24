<script>
  let { image } = $props();

  const [width, height] = image.filename.split('/')[5].split('x');
</script>

<figure class="featured-image">
  <img src={`${image.filename}/m/`} alt={image.title} {height} {width} />

  <figcaption class="screen-reader-text">{image.alt}</figcaption>
</figure>
