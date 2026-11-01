import './sources.css';
import { NewsSource } from '../../../types';

class Sources {
    private readonly container: HTMLElement;
    private readonly template: HTMLTemplateElement;

    public constructor() {
        const container: HTMLElement | null = document.querySelector<HTMLElement>('.sources');
        const template: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (!container || !template) throw new Error('Sources markup is missing');
        this.container = container;
        this.template = template;
    }

    public draw(sources: ReadonlyArray<Readonly<NewsSource>>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        sources.forEach((source: Readonly<NewsSource>): void => {
            const clone: DocumentFragment = this.template.content.cloneNode(true) as DocumentFragment;
            const item: HTMLElement | null = clone.querySelector<HTMLElement>('.source__item');
            const name: HTMLElement | null = clone.querySelector<HTMLElement>('.source__item-name');
            if (!item || !name) throw new Error('Source template is incomplete');
            item.dataset.sourceId = source.id;
            item.setAttribute('role', 'button');
            item.tabIndex = 0;
            name.textContent = source.name;
            fragment.append(clone);
        });
        this.container.replaceChildren(fragment);
    }

    public select(sourceId: string): void {
        this.container.querySelectorAll<HTMLElement>('.source__item').forEach((item: HTMLElement): void => {
            item.setAttribute('aria-pressed', String(item.dataset.sourceId === sourceId));
        });
    }
}

export default Sources;
