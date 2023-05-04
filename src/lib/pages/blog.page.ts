import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { UserData } from "@interfaces/userData";

export class BlogPage extends BasePage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly receiveNewsletter: Locator;
  readonly submitButton: Locator;
  readonly formSubmitted: Locator;

  constructor(page: Page) {
    super(page)
    this.page = page;
    this.nameInput = this.page.locator('#name-2');
    this.emailInput = this.page.locator('#email-2');
    this.receiveNewsletter = this.page.locator('#checkbox');
    this.submitButton = this.page.locator(`input[type="submit"]`);
    this.formSubmitted = this.page.getByRole('heading', { name: 'Thank You!' });
  }

 /**
 * Fills out the blog form with the given user data and option to receive newsletter.
 * @param {UserData} user - An object containing the user's name and email to be filled in the form.
 * @param {boolean} isReceiveNews - A flag indicating whether to check the "Receive Newsletter" checkbox or not.
 */
  async fillBlogForm( user: UserData, isReceiveNews = true) {
    await this.nameInput.type(user.userName);
    await this.emailInput.type(user.email);
    await this.changeCheckboxCheck(this.receiveNewsletter, isReceiveNews);  
    await this.submitButton.click();
  }
}
