import { test } from "@playwright/test";
import { createReadStream } from "fs";
import { createInterface } from "readline";

test("dictionary attack", async ({ page }) => {
    test.setTimeout(0);

    await page.goto("/login");

    const email = page.getByTestId("email");
    const pass = page.getByTestId("pass");
    const loginButton = page.getByTestId("login");

    const successMsg = page
        .locator("div", { hasText: "You're logged in!" })
        .nth(0);

    const stream = createReadStream("./e2e/dictionary-list.txt")
        .on("error", function (err) {
            console.log("Error while reading file.", err);
        })
        .on("end", function () {
            console.log("Read entire file.");
        });

    const rl = createInterface({
        input: stream,
        output: process.stdout,
    });
    const it = rl[Symbol.asyncIterator]();

    let shouldCheck = true;
    let password = (await it.next()).value;

    while (shouldCheck) {
        await email.fill("test@test.test");
        await pass.fill(password);
        await loginButton.click();

        shouldCheck = await successMsg.isHidden();
        password = (await it.next()).value;
    }
});
