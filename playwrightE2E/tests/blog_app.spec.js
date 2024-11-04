const { test, expect, beforeEach, describe } = require("@playwright/test");
const helper = require('./helper')

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Ro Ri',
        username: 'Syn',
        password: 'secret'
      }
    })

    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Ro",
        username: "Syny",
        password: "secret",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    
    const locator = await page.getByText("Log in");
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("Syn");
      await page.getByTestId("password").fill("secret");
      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByText('Ro Ri logged in')).toBeVisible()
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("Syn");
      await page.getByTestId("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText("Wrong username or password")
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    });
  });

  describe('When logged in', ()=>{
    beforeEach(async ({page}) =>{
      await page.getByTestId("username").fill("Syn");
      await page.getByTestId("password").fill("secret");
      await page.getByRole("button", { name: "login" }).click();
    })

    test('a new blog can be created', async ({page})=>{
      await page.getByRole("button", { name: "Create New Blog" }).click()
      await page.getByTestId('title').fill('Testing creating blog from playwright')
      await page.getByTestId('author').fill('Rodolfo')
      await page.getByTestId('url').fill('playwright.com')
      await page.getByRole('button', {name: 'Create'}).click()

      await expect(
        page.getByText(
          "a new blog Testing creating blog from playwright by Rodolfo added"
        )
      ).toBeVisible()

    })

    test('the blog can be liked', async ({page})=>{
      await page.getByRole("button", { name: "Create New Blog" }).click();
      await page
        .getByTestId("title")
        .fill("Testing creating blog from playwright");
      await page.getByTestId("author").fill("Rodolfo");
      await page.getByTestId("url").fill("playwright.com");
      await page.getByRole("button", { name: "Create" }).click();
      await page.getByRole('button', {name: 'view'}).click()
      const likesBefore = await page.getByTestId("likes").textContent();
      await page.getByRole('button', {name: 'like'}).click()
      await  page.waitForFunction(
        (likesBefore) => {
          return document.querySelector('[data-testid="likes"]').textContent !== likesBefore
        },
        likesBefore
      )
    
      await expect(likesBefore).toBe("0 like");
      const likesAfter = await page.getByTestId("likes").textContent();
      await expect(likesAfter).toBe("1 like");
    })

    test("the blog can be deleted", async ({ page }) => {
      await page.getByRole("button", { name: "Create New Blog" }).click();
      await page
        .getByTestId("title")
        .fill("Testing creating blog from playwright");
      await page.getByTestId("author").fill("Rodolfo");
      await page.getByTestId("url").fill("playwright.com");
      await page.getByRole("button", { name: "Create" }).click();
      await page.getByRole("button", { name: "view" }).click();
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole('button', {name: 'remove'}).click();
      // page.getByText("Testing creating blog from playwright").waitFor(state='hidden')
      await page.waitForTimeout(2500);
      await expect(page.getByText("Testing creating blog from playwright")).not.toBeVisible()
    });

    test("only blog creater can delete blog", async ({ page }) => {
      await helper.loginWith(page, 'Syn', 'secret')
      await helper.createBlog(page, 'Testing creating blog from playwright', 'Rodolfo', 'playwright.com')
      await page.waitForTimeout(2000);
      await page.getByRole('button', {name: 'logout'}).click()
      await helper.loginWith(page, 'Syny', 'secret')
      await page.waitForTimeout(2000);
      await helper.createBlog(page, 'Testing delete show', 'Me', 'jest.com')
      await page.waitForTimeout(2000);
      // await page.waitForSelector('button[name="view"]', { state: "visible" });
      // const viewButtons = await page.getByRole("button", { name: "view" }).all()
      await page.getByRole("button", { name: "view" }).first().click()
      await page.getByRole("button", { name: "view" }).click()
      const removeButtons = await page.getByRole('button', {name: 'remove'}).all()
      await expect(removeButtons.length).toBe(1)
    });

    test.only('blogs are arranged in the order according to likes', async ({page})=>{
      await helper.loginWith(page, 'Syn', 'secret')
      await page.waitForTimeout(500);
      await helper.createBlog(
        page,
        "Testing creating blog from playwright",
        "Rodolfo",
        "playwright.com"
      );
      await page.waitForTimeout(500);
      await helper.createBlog(page, "Testing delete show", "Me", "jest.com");
      await page.waitForTimeout(500);
      await helper.createBlog(page, "Testing arranged in order", "Presly", "mlb.com");
      await page.waitForTimeout(500);
      const viewButton1 = await page.getByRole("button", { name: "view" }).first();
      await page.waitForTimeout(500);
      const viewButton2 = await page
        .getByRole("button", { name: "view" })
        .nth(1);
        await page.waitForTimeout(500);
        const viewButton3 = await page
          .getByRole("button", { name: "view" })
          
     
      
        // Click the first view button
        await viewButton1.click();
        await page.waitForTimeout(500);
        await viewButton2.click();
        await page.waitForTimeout(500);
        await viewButton3.click();
        await page.waitForTimeout(500);
        // If you want to click the second button instead, you can do:
        // await viewButtons[1].click();
      
      await page.waitForTimeout(500);
      const likeButton1 = await page.getByRole("button", { name: "like" }).first()
      const likeButton2 = await page
        .getByRole("button", { name: "like" })
        .nth(1);
        const likeButton3 = await page
          .getByRole("button", { name: "like" })
          .nth(2);
      const likeButtons = await page.getByRole('button', {name: 'like'}).all()
      if (likeButtons.length > 0) {
        await likeButton3.click();
        await page.waitForTimeout(500);
        await likeButton3.click();
        await page.waitForTimeout(500);
        await likeButton3.click();
        await page.waitForTimeout(500);
        await likeButton1.click();
        await page.waitForTimeout(500);
        await likeButton1.click();
        await page.waitForTimeout(500);
        await likeButton1.click();
        await page.waitForTimeout(500);
        await likeButton2.click();
        await page.waitForTimeout(500);
      } else {
        console.error("No like buttons found");
      }
      
      let like1 = await page.getByTestId('likes').first().textContent()
      let like2 = await page.getByTestId("likes").nth(1).textContent();
      let like3 = await page.getByTestId("likes").nth(2).textContent();
      
      like1 = parseInt(like1.charAt(0), 10);
      like2 = parseInt(like2.charAt(0), 10);
      like3 = parseInt(like3.charAt(0), 10);

      await expect(like1).toBeGreaterThan(like2)
      await expect(like2).toBeGreaterThan(like3)
    })

  })

  

});

