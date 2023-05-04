import { NAVIGATION } from "@data/constants";
import type { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly navBlog: Locator;
  readonly navSupport: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = this.page.getByRole("link", { name: NAVIGATION.ABOUT });
    this.emailInput = this.page.getByRole("link", { name: NAVIGATION.CAREERS });
    this.navBlog = this.page.getByRole("link", { name: NAVIGATION.BLOG });
    this.navSupport = this.page.getByRole("link", { name: NAVIGATION.SUPPORT });
  }

  /**
   * Checks if the navigation tab with the given text is visible on the page.
   * @param {string} tabText - The text of the navigation tab to check visibility for.
   * @returns {Promise<boolean>} - A Promise that resolves to a boolean indicating whether the tab is visible or not.
   */
  async isNavTabVisible(tabText: string): Promise<boolean> {
    const navLocator = this.page.getByRole("link", { name: tabText }).first();
    return await navLocator.isVisible();
  }

  /**
   * Retrieves the value of the 'aria-current' attribute of a navigation tab with the given text.
   * @param {string} tabText - The text of the navigation tab.
   * @returns {Promise<string|null>} - A promise that resolves to the value of the 'aria-current' attribute of the tab, or null if the tab was not found.
   */
  async getNavTabAttribute(tabText: string): Promise<string | null> {
    const ariaCurrentAttribute = "aria-current";
    const tabLocator = this.page.getByRole("link", { name: tabText });
    return await tabLocator.getAttribute(ariaCurrentAttribute);
  }


  /**
   * Clicks on a navigation tab with the specified text.
   * @param {string} tabText - The text of the navigation tab to click.
   */
  async clickNavTab(tabText: string) {
    const tabLocator = this.page.getByRole("link", { name: tabText });
    await tabLocator.click();
  }

  /**
   * Changes the checked status of a checkbox.
   * @param {Locator} checkBox - The locator of the checkbox to change.
   * @param {boolean} status - A flag indicating whether to check the checkbox (true) or uncheck it (false).
   */
  async changeCheckboxCheck(checkBox: Locator, status: boolean) {
    if (status) await checkBox.check();
    else await checkBox.uncheck();
  }
}
