import './news.css';
import { Article } from '../../../types';

class News {
    private readonly container: HTMLElement;

    public constructor() {
        const container: HTMLElement | null = document.querySelector<HTMLElement>('.news');
        if (!container) throw new Error('News element is missing');
        this.container = container;
    }

    public draw(articles: ReadonlyArray<Readonly<Article>>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        articles.slice(0, 10).forEach((article: Readonly<Article>, index: number): void => {
            fragment.append(this.createCard(article, index));
        });
        this.container.replaceChildren(fragment);
    }

    private createCard(article: Readonly<Article>, index: number): HTMLElement {
        const card: HTMLElement = document.createElement('article');
        card.className = 'news__item';

        const media: HTMLElement = document.createElement('div');
        media.className = 'news__media';
        const imageUrl: string | null = this.safeUrl(article.urlToImage);
        if (imageUrl) {
            const image: HTMLImageElement = document.createElement('img');
            image.src = imageUrl;
            image.alt = '';
            image.loading = 'lazy';
            image.addEventListener('error', (): void => image.remove(), { once: true });
            media.append(image);
        }
        const mediaLabel: HTMLSpanElement = document.createElement('span');
        mediaLabel.className = 'news__media-label';
        mediaLabel.textContent = `NEWS / ${String(index + 1).padStart(2, '0')}`;
        media.append(mediaLabel);

        const body: HTMLElement = document.createElement('div');
        body.className = 'news__body';

        const meta: HTMLParagraphElement = document.createElement('p');
        meta.className = 'news__meta';
        const published: string = article.publishedAt.slice(0, 10);
        meta.textContent = `${article.source.name} · ${published || 'Date unavailable'}`;

        const title: HTMLHeadingElement = document.createElement('h3');
        title.className = 'news__title';
        title.textContent = article.title;

        const description: HTMLParagraphElement = document.createElement('p');
        description.className = 'news__description';
        description.textContent = article.description || 'Open the article to read the full story.';

        const byline: HTMLParagraphElement = document.createElement('p');
        byline.className = 'news__byline';
        byline.textContent = article.author ? `By ${article.author}` : 'News desk';

        const link: HTMLAnchorElement = document.createElement('a');
        link.className = 'news__link';
        link.textContent = 'Read article ↗';
        link.href = this.safeUrl(article.url) ?? '#';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        body.append(meta, title, description, byline, link);
        card.append(media, body);
        return card;
    }

    private safeUrl(value: string | null): string | null {
        if (!value) return null;
        try {
            const url: URL = new URL(value);
            return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
        } catch {
            return null;
        }
    }
}

export default News;
