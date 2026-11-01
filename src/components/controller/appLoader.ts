import Loader from './loader';

declare const __NEWS_API_URL__: string;
declare const __NEWS_API_KEY__: string;

class AppLoader extends Loader {
    protected readonly useMocks: boolean;

    public constructor() {
        const apiKey: string = __NEWS_API_KEY__.trim();
        super(__NEWS_API_URL__, apiKey ? { apiKey } : {});
        this.useMocks = apiKey.length === 0;
    }
}

export default AppLoader;
