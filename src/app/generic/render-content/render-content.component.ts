import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { DevRantService } from '@services/devrant.service';
import * as IncrementalDOM from 'incremental-dom';
import MarkdownIt from 'markdown-it';
import MarkdownItIncrementalDOM from 'markdown-it-incremental-dom';
import { LinkDef } from 'ts-devrant';

const md = new MarkdownIt({
    breaks: true,
    linkify: true,
    typographer: true,
}).use(MarkdownItIncrementalDOM, IncrementalDOM);

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const attrs: any[] = tokens[idx].attrs;
    attrs.forEach((attr) => {
        const href = attr[attr.length - 1];
        if (!href.startsWith('/')) {
            tokens[idx].attrPush(['target', '_blank']);
            tokens[idx].attrPush(['class', 'external-link']);
        } else {
            tokens[idx].attrPush([
                'onclick',
                `window.dispatchEvent(new CustomEvent('internal-link', { detail: '${href}' }))`,
            ]);
            tokens[idx].attrPush(['class', 'mention-link']);
            tokens[idx].attrSet('href', 'javascript:void(0);');
        }
    });

    return self.renderToken(tokens, idx, options, env, self);
};

md.configure({
    components: {
        block: {
            rules: [
                'blockquote',
                'code',
                // 'heading',
                // 'hr',
                // 'lheading',
                'list',
                'paragraph',
                // 'table'
            ],
        },
        inline: {
            rules: [
                'autolink',
                // 'backticks',
                // 'del',
                'emphasis',
                'entity',
                'escape',
                // 'footnote_ref',
                // 'htmltag',
                'newline',
                'text',
                'link',
            ],
        },
    },
});

@Component({
    selector: 'app-render-content',
    templateUrl: './render-content.component.html',
    styleUrls: ['./render-content.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RenderContentComponent implements OnInit {
    _internalContent: string;

    set internalContent(renderContent: string) {
        this._internalContent = renderContent;
        this.renderContent();
    }

    get internalContent() {
        return this._internalContent;
    }

    @Input()
    set content(content: string) {
        this.internalContent = content;
        this.fetchMentionsAync();
    }

    @Input()
    set links(links: LinkDef[]) {
        this._links = links;
        this.renderContent();
    }

    get links() {
        return this._links;
    }

    _links: LinkDef[];

    constructor(private ref: ElementRef, private devrant: DevRantService) { }

    ngOnInit(): void { }

    fetchMentionsAync() {
        const mentions = this.internalContent.match(/@([\w-]+)/gi);
        if (mentions) {
            mentions.forEach((mention) => {
                const name = mention.replace(/^@/, '');
                this.linkMentionAsync(name);
            });
        }
    }

    async linkMentionAsync(name) {
        const response = await this.devrant.getUserIdByName(name);
        const userId = response.user_id;
        this.internalContent = this.internalContent.replace(
            `@${name}`,
            `[${name}](/user/${userId})`
        );
    }

    renderContent() {
        let markdown = String(this.internalContent);
        (this.links || [])
            .filter((link) => {
                const regex = /\[[^\]]*\]\([^\)]+\)/gi;
                markdown = markdown.replace(regex, (markdownLink) => {
                    return markdownLink.replace(link.short_url, link.url);
                });
                return true;
            })
            .forEach((link) => {
                markdown = markdown.replace(
                    link.short_url,
                    `[${link.title}](${link.url})`
                );
            });

        IncrementalDOM.patch(
            this.ref.nativeElement,
            md.renderToIncrementalDOM(markdown)
        );
    }
}
