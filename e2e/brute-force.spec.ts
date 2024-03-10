import { test } from "@playwright/test";

test("brute force attack", async ({ page }) => {
    await page.goto("/login");

    const email = page.getByTestId("email");
    const pass = page.getByTestId("pass");
    const loginButton = page.getByTestId("login");

    const successMsg = page.locator("div", { hasText: "You're logged in!" });

    let shouldCheck = true;

    while (shouldCheck) {
        await email.fill("test@test.test");
        await pass.fill(generatePass());
        //await pass.fill("testtest");
        await loginButton.click();

        shouldCheck = await successMsg.isHidden();
    }
});

function generatePass() {
    const chars =
        //" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~";
        "est";
    const len = 8; // Math.floor(Math.random() * 20);
    let password = "";

    while (password.length < len) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    return password;
}
