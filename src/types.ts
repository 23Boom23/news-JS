export enum NewsEndpoint {
    Sources = 'sources',
    Everything = 'everything',
    MockSources = 'mocks/sources',
    MockEverything = 'mocks/everything',
}

export interface NewsSource {
    id: string;
    name: string;
}

export interface Article {
    source: Pick<NewsSource, 'name'> & { id: string | null };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
}

export interface SourcesResponse {
    status: 'ok';
    sources: ReadonlyArray<Readonly<NewsSource>>;
}

export interface ArticlesResponse {
    status: 'ok';
    totalResults: number;
    articles: ReadonlyArray<Readonly<Article>>;
}

export interface RequestOptions {
    apiKey: string;
    sources: string;
    pageSize: number;
}

export interface ApiRequest {
    endpoint: NewsEndpoint;
    options?: Readonly<Partial<Pick<RequestOptions, 'sources' | 'pageSize'>>>;
}

export type ResponseGuard<T> = (value: unknown) => value is T;

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isSourcesResponse(value: unknown): value is SourcesResponse {
    return (
        isRecord(value) &&
        value.status === 'ok' &&
        Array.isArray(value.sources) &&
        value.sources.every(
            (source: unknown) => isRecord(source) && typeof source.id === 'string' && typeof source.name === 'string'
        )
    );
}

export function isArticlesResponse(value: unknown): value is ArticlesResponse {
    return (
        isRecord(value) &&
        value.status === 'ok' &&
        typeof value.totalResults === 'number' &&
        Array.isArray(value.articles) &&
        value.articles.every(
            (article: unknown) =>
                isRecord(article) &&
                isRecord(article.source) &&
                typeof article.source.name === 'string' &&
                (typeof article.source.id === 'string' || article.source.id === null) &&
                typeof article.title === 'string' &&
                typeof article.url === 'string' &&
                typeof article.publishedAt === 'string' &&
                (typeof article.author === 'string' || article.author === null) &&
                (typeof article.description === 'string' || article.description === null) &&
                (typeof article.urlToImage === 'string' || article.urlToImage === null)
        )
    );
}

export function getApiError(value: unknown): string | null {
    return isRecord(value) && typeof value.message === 'string' ? value.message : null;
}
