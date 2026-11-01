import { ApiRequest, getApiError, RequestOptions, ResponseGuard } from '../../types';

class Loader {
    public constructor(
        private readonly baseLink: string,
        private readonly defaultOptions: Readonly<Partial<RequestOptions>>
    ) {}

    private makeUrl(request: Readonly<ApiRequest>): string {
        const base = this.baseLink.endsWith('/') ? this.baseLink : `${this.baseLink}/`;
        const url = new URL(request.endpoint, base);
        const options: Partial<RequestOptions> = { ...this.defaultOptions, ...request.options };

        Object.entries(options).forEach(([key, value]: [string, string | number | undefined]) => {
            if (value !== undefined) url.searchParams.set(key, String(value));
        });

        return url.toString();
    }

    protected async getResp<T>(request: Readonly<ApiRequest>, guard: ResponseGuard<T>): Promise<T> {
        const response: Response = await fetch(this.makeUrl(request));
        if (!response.ok) throw new Error(`Request failed: ${response.status} ${response.statusText}`);

        const payload: unknown = await response.json();
        if (!guard(payload)) throw new Error(getApiError(payload) ?? 'Unexpected News API response');
        return payload;
    }
}

export default Loader;
