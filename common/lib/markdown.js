import { remark } from "remark";
import remarkHtml from "remark-html";
import prism from 'remark-prism';

async function markdownToHtml(markdown) {
    const result = await remark().use(remarkHtml).process(markdown)
    //const result = await remark().use(remarkHtml).use(prism).process(markdown);

    return result.toString();
}

export {
    markdownToHtml
}
