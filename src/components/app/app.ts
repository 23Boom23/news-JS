import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsSource, SourcesResponse } from '../../types';

class App {
    private readonly controller: AppController = new AppController();
    private readonly view: AppView = new AppView();
    private requestId = 0;

    public start(): void {
        const sourcesElement: HTMLElement | null = document.querySelector<HTMLElement>('.sources');
        if (!sourcesElement) throw new Error('Sources element is missing');

        const selectSource = (target: EventTarget | null): void => {
            if (!(target instanceof Element)) return;
            const item: HTMLElement | null = target.closest<HTMLElement>('.source__item');
            if (!item || !sourcesElement.contains(item)) return;
            const sourceId: string | undefined = item.dataset.sourceId;
            if (sourceId) void this.showNews(sourceId);
        };
        sourcesElement.addEventListener('click', (event: MouseEvent): void => selectSource(event.target));
        sourcesElement.addEventListener('keydown', (event: KeyboardEvent): void => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            selectSource(event.target);
        });

        void this.loadSources();
    }

    private async loadSources(): Promise<void> {
        this.view.setStatus('Loading sources…');
        try {
            const response: SourcesResponse = await this.controller.getSources();
            const sources: ReadonlyArray<Readonly<NewsSource>> = response.sources;
            this.view.drawSources(sources);
            if (sources.length > 0) {
                await this.showNews(sources[0].id);
            } else {
                this.view.setStatus('No sources are available.');
            }
        } catch (error: unknown) {
            this.view.setStatus(this.errorMessage(error));
        }
    }

    private async showNews(sourceId: string): Promise<void> {
        const currentRequest: number = ++this.requestId;
        this.view.selectSource(sourceId);
        this.view.clearNews();
        this.view.setStatus('Loading articles…');
        try {
            const response = await this.controller.getNews(sourceId);
            if (currentRequest !== this.requestId) return;
            this.view.drawNews(response.articles);
        } catch (error: unknown) {
            if (currentRequest === this.requestId) this.view.setStatus(this.errorMessage(error));
        }
    }

    private errorMessage(error: unknown): string {
        return error instanceof Error ? `Unable to load news: ${error.message}` : 'Unable to load news.';
    }
}

export default App;
