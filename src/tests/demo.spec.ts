import { test, expect } from "@playwright/test";
import { URL_TEST, USERNAME, EMAIL, NAVIGATION, BUTTONS, TITLES } from "@data/constants"
import { BasePage } from "@pages/base.page";
import { BlogPage } from "@pages/blog.page";
import { UserData } from "@interfaces/userData";

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
      const selectedLinkAttribute = 'page';

      // Validate that all links in the nav bar are visible
      expect.soft( await basePage.isNavTabVisible( NAVIGATION.ABOUT )).toBeTruthy();
      expect.soft( await basePage.isNavTabVisible( NAVIGATION.CAREERS )).toBeTruthy();
      expect.soft( await basePage.isNavTabVisible( NAVIGATION.BLOG )).toBeTruthy();
      expect.soft( await basePage.isNavTabVisible( NAVIGATION.SUPPORT )).toBeTruthy();
      expect.soft( await basePage.isNavTabVisible( BUTTONS.BOOK )).toBeTruthy();
      expect.soft( await basePage.isNavTabVisible( BUTTONS.EMPLOYERS_ACCESS )).toBeTruthy();

      // Click on each link of the top bar and evaluate that is the current one
      await basePage.clickNavTab(NAVIGATION.ABOUT);
      expect.soft(await basePage.getNavTabAttribute(NAVIGATION.ABOUT)).toMatch(selectedLinkAttribute);
      expect.soft(page).toHaveURL(URL_TEST.ABOUT);

      await basePage.clickNavTab(NAVIGATION.CAREERS);
      expect.soft(await basePage.getNavTabAttribute(NAVIGATION.CAREERS)).toMatch(selectedLinkAttribute);
      expect.soft(page).toHaveURL(URL_TEST.CAREERS);

      await basePage.clickNavTab(NAVIGATION.BLOG);
      expect.soft(await basePage.getNavTabAttribute(NAVIGATION.BLOG)).toMatch(selectedLinkAttribute);
      expect.soft(page).toHaveURL(URL_TEST.BLOG);

      await basePage.clickNavTab(NAVIGATION.SUPPORT);
      expect.soft(await basePage.getNavTabAttribute(NAVIGATION.SUPPORT)).toMatch(selectedLinkAttribute);
      expect.soft(page).toHaveURL(URL_TEST.SUPPORT);      
    });

    /**
     * Test to sign up for blog news on the blog page without checking the news checkbox
     */
      test('Sign up for blog news without checking the newsletter checkbox', async ({ page })  => {
        const blogPage = new BlogPage(page);
        const isReceiveNews = false;
        const validUser: UserData = {
          userName: `${USERNAME.FIRST_NAME} ${USERNAME.LAST_NAME}`,
          email: EMAIL.VALID
        };
  
        await blogPage.navBlog.click();
        await blogPage.fillBlogForm( validUser, isReceiveNews );
        expect.soft(page).toHaveURL(URL_TEST.BLOG);
        expect( await blogPage.formSubmitted.isVisible(), 'No news checkbox checked' ).not.toBeTruthy();
      });

    /**
     * Test to sign up for blog news on the blog page with valid email formats.
     */
    test('Sign up for blog news with valid email', async ({ page })  => {
      const blogPage = new BlogPage(page);
      const validUser: UserData = {
        userName: `${USERNAME.FIRST_NAME} ${USERNAME.LAST_NAME}`,
        email: EMAIL.VALID
      };

      await blogPage.navBlog.click();
      await blogPage.fillBlogForm( validUser );
      expect.soft(page).toHaveURL(URL_TEST.BLOG);
      expect( await blogPage.formSubmitted.isVisible(), 'Valid email format' ).toBeTruthy();
    });

    /**
     * Test to sign up for blog news on the blog page with valid and invalid email formats.
     */
    test('Sign up for blog news with invalid email', async ({ page })  => {
      const blogPage = new BlogPage(page);
      const invalidUser: UserData = {
        userName: `${USERNAME.FIRST_NAME} ${USERNAME.LAST_NAME}`,
        email: EMAIL.INVALID
      };      
      
      await blogPage.navBlog.click();
      await blogPage.fillBlogForm( invalidUser );
      expect.soft(page).toHaveURL(URL_TEST.BLOG);
      expect( await blogPage.formSubmitted.isVisible(), 'Invalid email format' ).not.toBeTruthy();
    });

  });
