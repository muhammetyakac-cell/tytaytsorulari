import { MetadataRoute } from 'next'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const baseUrl = 'https://www.tytaytsorulari.com';

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/kayit`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/giris`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    }
  ];

  try {
    const categories = await sql`SELECT category_id FROM categories`;
    const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat: any) => ({
      url: `${baseUrl}/kategori/${cat.category_id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
    routes.push(...categoryRoutes);

    for (const cat of categories) {
      const tests = await sql`SELECT DISTINCT test_index FROM questions WHERE category_id = ${cat.category_id}`;
      const testRoutes: MetadataRoute.Sitemap = tests.map((t: any) => ({
        url: `${baseUrl}/test/${cat.category_id}/${t.test_index}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      }));
      routes.push(...testRoutes);
    }
  } catch (error) {
    console.error('Sitemap category/test fetch error', error);
  }

  try {
    const questions = await sql`SELECT id FROM questions`;
    const questionRoutes: MetadataRoute.Sitemap = questions.map((q: any) => ({
      url: `${baseUrl}/soru/${q.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
    routes.push(...questionRoutes);
  } catch (error) {
    console.error('Sitemap questions fetch error', error);
  }

  return routes;
}
