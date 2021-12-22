import { ParkzappAngularPage } from './app.po';

describe('parkzapp-angular App', () => {
  let page: ParkzappAngularPage;

  beforeEach(() => {
    page = new ParkzappAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
