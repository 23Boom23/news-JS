import News from './news/news';
import Sources from './sources/sources';
import { Article, NewsSource } from '../../types';

export class AppView {
    private readonly news: News = new News();
    private readonly sources: Sources = new Sources();
    private readonly status: HTMLElement;

    public constructor() {
        const status: HTMLElement | null = document.querySelector<HTMLElement>('.status');
        if (!status) throw new Error('Status element is missing');
        this.status = status;
    }

    public drawNews(articles: ReadonlyArray<Readonly<Article>>): void {
        this.news.draw(articles);
        this.setStatus(articles.length ? '' : 'No articles are available for this source.');
    }

    public drawSources(sources: ReadonlyArray<Readonly<NewsSource>>): void {
        this.sources.draw(sources);
    }

    public selectSource(sourceId: string): void {
        this.sources.select(sourceId);
    }

    public setStatus(message: string): void {
        this.status.textContent = message;
        this.status.hidden = message.length === 0;
    }
}

export default AppView;
