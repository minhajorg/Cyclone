import { BangenPage } from './app.po';

describe('bangen App', () => {
  let page: BangenPage;

  beforeEach(() => {
    page = new BangenPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
