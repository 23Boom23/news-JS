import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ArticlesResponse, SourcesResponse } from '../../types';

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
        try {
            const response: SourcesResponse = await this.controller.getSources();
            this.view.drawSources(response.sources);
        } catch (error: unknown) {
            console.error(error);
        }
    }

    private async showNews(sourceId: string): Promise<void> {
        const currentRequest: number = ++this.requestId;
        this.view.selectSource(sourceId);
        this.view.clearNews();
        try {
            const response: ArticlesResponse = await this.controller.getNews(sourceId);
            if (currentRequest !== this.requestId) return;
            this.view.drawNews(response.articles);
        } catch (error: unknown) {
            if (currentRequest === this.requestId) console.error(error);
        }
    }
}

export default App;
