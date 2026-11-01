import './news.css';
import { Article } from '../../../types';

class News {
    private readonly container: HTMLElement;
    private readonly template: HTMLTemplateElement;

    public constructor() {
        const container: HTMLElement | null = document.querySelector<HTMLElement>('.news');
        const template: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        if (!container || !template) throw new Error('News markup is missing');
        this.container = container;
        this.template = template;
    }

    public draw(articles: ReadonlyArray<Readonly<Article>>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        articles.slice(0, 10).forEach((article: Readonly<Article>, index: number): void => {
            const clone: DocumentFragment = this.template.content.cloneNode(true) as DocumentFragment;
            const card: HTMLElement = this.find(clone, '.news__item');
            if (index % 2 === 1) card.classList.add('alt');

            const image: HTMLElement = this.find(clone, '.news__meta-photo');
            const imageUrl: string | null = this.safeUrl(article.urlToImage);
            image.style.backgroundImage = imageUrl ? `url("${imageUrl}")` : 'none';

            this.find(clone, '.news__meta-author').textContent = article.author || article.source.name;
            this.find(clone, '.news__meta-date').textContent = article.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');
            this.find(clone, '.news__description-title').textContent = article.title;
            this.find(clone, '.news__description-source').textContent = article.source.name;
            this.find(clone, '.news__description-content').textContent = article.description ?? '';

            const link: HTMLAnchorElement = this.find<HTMLAnchorElement>(clone, '.news__read-more a');
            link.href = this.safeUrl(article.url) ?? '#';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            fragment.append(clone);
        });
        this.container.replaceChildren(fragment);
    }

    private find<T extends Element = HTMLElement>(root: ParentNode, selector: string): T {
        const element: T | null = root.querySelector<T>(selector);
        if (!element) throw new Error(`News template is missing ${selector}`);
        return element;
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
