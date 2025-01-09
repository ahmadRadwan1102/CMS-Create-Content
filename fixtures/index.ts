import {test as base, expect} from '@playwright/test'
import { Content } from '../pages/content'
import { authenticate } from '../utils/auth'
type myFixture = {
    content: Content
}
export const test = base.extend<myFixture>({
    page: async ({page, baseURL}, use) => {
        await page.goto(baseURL!);
        await authenticate(page);
        await use(page);
    },
    content: async ({page, baseURL}, use) => {
        const content = new Content(page);
        await use(content);
    }
})

export { expect } from '@playwright/test';
