import { test } from "@playwright/test";
import { readFileSync } from "fs";

test("dictionary attack", async ({ page }) => {
    test.setTimeout(0);

    await page.goto("/login");

    const email = page.getByTestId("email");
    const pass = page.getByTestId("pass");
    const loginButton = page.getByTestId("login");

    const successMsg = page
        .locator("div", { hasText: "You're logged in!" })
        .nth(6);

    const dictionary = readFileSync("./e2e/dictionary-list.txt")
        .toString()
        .split("\n");

    for (const password of dictionary) {
        await email.fill("test@test.test");
        await pass.fill(password);
        await loginButton.click();

        await page.locator("#nprogress").waitFor({
            state: "attached",
            timeout: 5000,
        });

        await page.locator("#nprogress").waitFor({
            state: "detached",
            timeout: 5000,
        });

        if (await successMsg.isVisible()) {
            break;
        }
    }
});
