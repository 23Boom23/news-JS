import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsSource, SourcesResponse } from '../../types';

class App {
    private readonly controller: AppController = new AppController();
    private readonly view: AppView = new AppView();
    private selectedSource = '';
    private requestId = 0;

    public start(): void {
        const sourcesElement: HTMLElement | null = document.querySelector<HTMLElement>('.sources');
        if (!sourcesElement) throw new Error('Sources element is missing');

        sourcesElement.addEventListener('click', (event: MouseEvent): void => {
            if (!(event.target instanceof Element)) return;
            const button: HTMLButtonElement | null = event.target.closest<HTMLButtonElement>('.source__item');
            if (!button || !sourcesElement.contains(button)) return;
            const sourceId: string | undefined = button.dataset.sourceId;
            if (sourceId && sourceId !== this.selectedSource) void this.showNews(sourceId);
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
        this.selectedSource = sourceId;
        this.view.selectSource(sourceId);
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
