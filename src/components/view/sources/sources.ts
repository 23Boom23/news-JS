import './sources.css';
import { NewsSource } from '../../../types';

class Sources {
    private readonly container: HTMLElement;

    public constructor() {
        const container: HTMLElement | null = document.querySelector<HTMLElement>('.sources');
        if (!container) throw new Error('Sources element is missing');
        this.container = container;
    }

    public draw(sources: ReadonlyArray<Readonly<NewsSource>>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        sources.forEach((source: Readonly<NewsSource>): void => {
            const button: HTMLButtonElement = document.createElement('button');
            button.className = 'source__item';
            button.type = 'button';
            button.dataset.sourceId = source.id;
            button.textContent = source.name;
            fragment.append(button);
        });
        this.container.replaceChildren(fragment);
    }

    public select(sourceId: string): void {
        this.container.querySelectorAll<HTMLButtonElement>('.source__item').forEach((button: HTMLButtonElement): void => {
            button.setAttribute('aria-pressed', String(button.dataset.sourceId === sourceId));
        });
    }
}

export default Sources;
