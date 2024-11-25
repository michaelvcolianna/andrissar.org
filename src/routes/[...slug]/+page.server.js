import StoryblokClient from 'storyblok-js-client';
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { BlockTypes, richTextResolver } from '@storyblok/richtext';
import { STORYBLOK_PREVIEW_TOKEN } from '$env/static/private';
import { dateText, urlDate } from '$lib/date';

const version = dev ? 'draft' : 'published';

const Storyblok = new StoryblokClient({
  accessToken: STORYBLOK_PREVIEW_TOKEN,
  region: 'us'
});

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const rawParts = params.slug.split('/').filter((x) => x);
  const parts = (
    rawParts.length > 2 ? [rawParts.at(0), rawParts.at(-1)] : rawParts
  ).join('/');

  const response = await Storyblok.get(`cdn/stories/${parts || 'home'}`, {
    version
  }).catch((err) => {
    error(404);
  });

  const {
    data: { story }
  } = response;

  let adventures = [];
  const isAdventuresList = story.content.isTheAdventuresPage;
  const isAnAdventure = story.content.component === 'adventure';

  if (isAdventuresList || isAnAdventure) {
    const allAdventures = await Storyblok.getAll('cdn/stories', {
      version,
      content_type: 'adventure'
    });

    adventures = allAdventures
      .sort(
        (a, b) =>
          parseFloat(new Date(a.first_published_at).getTime()) -
          parseFloat(new Date(b.first_published_at).getTime())
      )
      .map((adventure) => ({
        name: adventure.name,
        slug: `/adventures/${urlDate(adventure.first_published_at).join('/')}/${adventure.slug}`,
        first_published_at: adventure.first_published_at
      }));
  }

  if (isAdventuresList) {
    const groupedAdventures = adventures
      .sort(
        (a, b) =>
          parseFloat(new Date(b.first_published_at).getTime()) -
          parseFloat(new Date(a.first_published_at).getTime())
      )
      .map((adventure) => {
        const date = new Date(adventure.first_published_at);

        return {
          ...adventure,
          nice_day: dateText(date, { day: 'numeric' }),
          nice_month: dateText(date, { month: 'short' })
        };
      })
      .reduce((r, a) => {
        const b = dateText(new Date(a.first_published_at), { year: 'numeric' });

        r[b] = r[b] || [];
        r[b].push(a);

        return r;
      }, Object.create(null));

    story.content.adventures = Object.keys(groupedAdventures)
      .reverse()
      .map((key) => [+key, groupedAdventures[key]]);
  }

  if (isAnAdventure) {
    const adventureDate = urlDate(
      new Date(story.first_published_at)
    ).toString();
    const requestDate = rawParts.slice(1, -1).toString();

    if (adventureDate !== requestDate) {
      error(404);
    }

    const adventureIndex = adventures.findIndex(
      (adventure) => adventure.first_published_at === story.first_published_at
    );

    story.content.previous = adventures[adventureIndex - 1];
    story.content.next = adventures[adventureIndex + 1];
  }

  const { render } = richTextResolver({
    optimizeImages: true,
    resolvers: {
      [BlockTypes.COMPONENT]: (node) => {
        let output = '';

        node.attrs.body.forEach((nodeBody) => {
          if (nodeBody.component === 'Table') {
            const headers = nodeBody.headers.split(',');
            const rows = nodeBody.rows.split('\n');

            output += `<div class="wp-block-table"><table><tbody>`;

            if (headers.length > 0) {
              output += `<tr>`;

              headers.forEach(
                (header) =>
                  (output += `<td><p><strong>${header}</strong></p></td>`)
              );

              output += `</tr>`;
            }

            if (rows.length > 0) {
              rows.forEach((row) => {
                output += `<tr>`;

                const cells = row.split(',');

                if (cells.length > 0) {
                  cells.forEach(
                    (cell) => (output += `<td><p>${cell}</p></td>`)
                  );
                }

                output += `</tr>`;
              });
            }

            output += `</tbody></table></div>`;
          }
        });

        return output;
      }
    }
  });

  story.content.html = render(story.content.content);

  delete story.content.content;

  return {
    story
  };
}

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
  const allStories = await Storyblok.getAll('cdn/stories', {
    version
  });

  const entries = [];

  allStories.forEach((story) => {
    if (!story.content.isTheHomePage) {
      entries.push({
        slug:
          story.content.component === 'adventure'
            ? `adventures/${urlDate(new Date(story.first_published_at))}/${story.slug}`
            : story.slug
      });
    }
  });

  return entries;
}

export const prerender = !dev;
