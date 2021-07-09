import { SignalRtestePage } from './app.po';

describe('signal-rteste App', function() {
  let page: SignalRtestePage;

  beforeEach(() => {
    page = new SignalRtestePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
