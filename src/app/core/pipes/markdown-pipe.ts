import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

// Returns a plain HTML string on purpose (not SafeHtml) so Angular's default
// [innerHTML] sanitizer still runs at bind time — defense in depth even
// though the source Markdown comes from a trusted CMS editor.
@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return marked.parse(value, { async: false }) as string;
  }
}
