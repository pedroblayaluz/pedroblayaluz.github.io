import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getLPBySlug, getAllLPSlugs } from '@/lib/lps-metadata';
import { LPPage } from '@/components/LPPage';

interface LPPageParams {
  slug: string;
}

export async function generateStaticParams() {
  return getAllLPSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LPPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lp = getLPBySlug(slug);

  if (!lp) {
    return {};
  }

  return {
    title: `${lp.title} ${lp.emoji} | pedroluz`,
    description: lp.description,
    openGraph: {
      title: `${lp.title} ${lp.emoji}`,
      description: lp.description,
      url: `https://pedroluz.com.br/pages/lps/${lp.slug}`,
      images: [
        {
          url: lp.image,
          width: 1200,
          height: 630,
          alt: lp.title,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<LPPageParams> }) {
  const { slug } = await params;
  const lp = getLPBySlug(slug);

  if (!lp) {
    notFound();
  }

  return <LPPage lp={lp} />;
}
