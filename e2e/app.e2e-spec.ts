import { GtdPage } from './app.po';

describe('gtd App', () => {
  let page: GtdPage;

  beforeEach(() => {
    page = new GtdPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
