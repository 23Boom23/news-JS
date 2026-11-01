import News from './news/news';
import Sources from './sources/sources';
import { Article, NewsSource } from '../../types';

export class AppView {
    private readonly news: News = new News();
    private readonly sources: Sources = new Sources();

    public drawNews(articles: ReadonlyArray<Readonly<Article>>): void {
        this.news.draw(articles);
    }

    public clearNews(): void {
        this.news.draw([]);
    }

    public drawSources(sources: ReadonlyArray<Readonly<NewsSource>>): void {
        this.sources.draw(sources);
    }

    public selectSource(sourceId: string): void {
        this.sources.select(sourceId);
    }
}

export default AppView;
