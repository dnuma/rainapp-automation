import { test, expect } from "@playwright/test";
import { URL_TEST, USERNAME, EMAIL, NAVIGATION, BUTTONS, TITLES } from "@config/constants"
import { BasePage } from "@pages/base.page";
import { BlogPage } from "@pages/blog.page";

// Slow down the test for better visualization
test.use({launchOptions: {slowMo: 300 }});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(TITLES.HOME);  
});

test.describe('Navigate on RainApp website',
  () => {
    /**
     * Navigates to each link in the navigation bar and evaluates that it is the current one.
     */
    test('Navigation test', async ({ page })  => {
      const basePage = new BasePage(page);
      const ariaCurrentAttribute = 'aria-current';
      const selectedLinkAttribute = 'page';

      // Validate that all links in the nav bar are visible
      expect.soft( await basePage.isNavTabVisible( NAVIGATION.ABOUT )).toBeTruthy();
      expect.soft( await basePage.isNavTabVisible( NAVIGATION.CAREERS )).toBeTruthy();
      expect.soft( await basePage.isNavTabVisible( NAVIGATION.BLOG )).toBeTruthy();
      expect.soft( await basePage.isNavTabVisible( NAVIGATION.SUPPORT )).toBeTruthy();
      expect.soft( await basePage.isNavTabVisible( BUTTONS.BOOK )).toBeTruthy();
      expect.soft( await basePage.isNavTabVisible( BUTTONS.EMPLOYERS_ACCESS )).toBeTruthy();

      // Click on each link of the top bar and evaluate that is the current one
      await basePage.nameInput.click();
      expect.soft(await basePage.nameInput.getAttribute(ariaCurrentAttribute)).toMatch(selectedLinkAttribute);
      expect.soft(page).toHaveURL(URL_TEST.ABOUT);

      await basePage.emailInput.click();
      expect.soft(await basePage.emailInput.getAttribute(ariaCurrentAttribute)).toMatch(selectedLinkAttribute);
      expect.soft(page).toHaveURL(URL_TEST.CAREERS);

      await basePage.navBlog.click();
      expect.soft(await basePage.navBlog.getAttribute(ariaCurrentAttribute)).toMatch(selectedLinkAttribute);
      expect.soft(page).toHaveURL(URL_TEST.BLOG);

      await basePage.navSupport.click();
      expect.soft(await basePage.navSupport.getAttribute(ariaCurrentAttribute)).toMatch(selectedLinkAttribute);
      expect.soft(page).toHaveURL(URL_TEST.SUPPORT);      
    });

    /**
     * Test to sign up for blog news on the blog page with valid and invalid email formats.
     */
    test('Sign up for blog news', async ({ page })  => {
      const blogPage = new BlogPage(page);
      const fullUserName = `${USERNAME.FIRST_NAME} ${USERNAME.LAST_NAME}`;
      const isReceiveNews = true;
      
      await blogPage.navBlog.click();
      expect(page).toHaveURL(URL_TEST.BLOG);

      await blogPage.fillBlogForm( fullUserName, EMAIL.VALID, isReceiveNews );
      expect.soft( await blogPage.formSubmitted.isVisible(), 'Valid email format' ).toBeTruthy();
      
      await page.reload();
      await blogPage.fillBlogForm( fullUserName, EMAIL.INVALID, isReceiveNews );
      expect.soft( await blogPage.formSubmitted.isVisible(), 'Invalid email format' ).not.toBeTruthy();
    });

  });
