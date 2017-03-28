import { VrsummAnnotationPage } from './app.po';

describe('vrsumm-annotation App', () => {
  let page: VrsummAnnotationPage;

  beforeEach(() => {
    page = new VrsummAnnotationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
