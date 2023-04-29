import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

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
   * Fills out the blog form with the given username, email and option to receive newsletter.
   * @param {string} username - The username to be entered in the name input field.
   * @param {string} email - The email to be entered in the email input field.
   * @param {boolean} isReceiveNews - A flag indicating whether to check the "Receive Newsletter" checkbox or not.
   */
  async fillBlogForm(username: string, email: string, isReceiveNews: boolean ) {
    await this.nameInput.type(username);
    await this.emailInput.type(email);
    await this.changeCheckboxCheck(this.receiveNewsletter, isReceiveNews);
    await this.submitButton.click();
  }
}
