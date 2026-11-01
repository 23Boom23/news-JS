import AppLoader from './appLoader';
import {
    ArticlesResponse,
    isArticlesResponse,
    isSourcesResponse,
    NewsEndpoint,
    SourcesResponse,
} from '../../types';

class AppController extends AppLoader {
    private mockArticles: ArticlesResponse | null = null;

    public async getSources(): Promise<SourcesResponse> {
        if (!this.useMocks) {
            return this.getResp({ endpoint: NewsEndpoint.Sources }, isSourcesResponse);
        }

        const [sources, articles]: [SourcesResponse, ArticlesResponse] = await Promise.all([
            this.getResp({ endpoint: NewsEndpoint.MockSources }, isSourcesResponse),
            this.getResp({ endpoint: NewsEndpoint.MockEverything }, isArticlesResponse),
        ]);
        this.mockArticles = articles;
        return sources;
    }

    public getNews(sourceId: string): Promise<ArticlesResponse> {
        if (this.useMocks && this.mockArticles) {
            const articles = this.mockArticles.articles.filter((article) => article.source.id === sourceId);
            return Promise.resolve({ ...this.mockArticles, totalResults: articles.length, articles });
        }
        return this.getResp(
            {
                endpoint: NewsEndpoint.Everything,
                options: { sources: sourceId, pageSize: 10 },
            },
            isArticlesResponse
        );
    }
}

export default AppController;
