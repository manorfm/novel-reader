import HTMLExtractor from "../../src/html/extractor";

const pageMocked = `
<html>
<body>
<ul class="chapter-actions">
  <li>
      <a href="https://www.readlightnovel.me/martial-peak/chapter-2291" class="prev prev-link">Previous</a>
  </li>
  <li>
      <select onchange="location = this.options[this.selectedIndex].value;">
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter--">
        Volume N/A                                                - CH -</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-71">
        Volume N/A                                                - CH 71</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-72">
        Volume N/A                                                - CH 72</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-73">
        Volume N/A                                                - CH 73</option>
                                          <option selected="selected" value="https://www.readlightnovel.me/martial-peak/chapter-74">
        Volume N/A                                                - CH 74</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-75-76">
        Volume N/A                                                - CH 75-76</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-505-5">
        Volume N/A                                                - CH 505-5</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-505">
        Volume N/A                                                - CH 505</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-505-5">
        Volume N/A                                                - CH 505.5</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter--668">
        Volume N/A                                                - CH  668</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-968-">
        Volume N/A                                                - CH 968.</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-981-5">
        Volume N/A                                                - CH 981.5</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2291">
        Volume N/A                                                - CH 2291</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2292">
        ↳  Volume N/A                                                - CH 2292</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2332">
        Volume N/A                                                - CH 2332</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2333">
        Volume N/A                                                - CH 2333</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2334">
        Volume N/A                                                - CH 2334</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2335">
        Volume N/A                                                - CH 2335</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2336">
        Volume N/A                                                - CH 2336</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2337">
        Volume N/A                                                - CH 2337</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2338">
        Volume N/A                                                - CH 2338</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2339">
        Volume N/A                                                - CH 2339</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2340">
        Volume N/A                                                - CH 2340</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2341">
        Volume N/A                                                - CH 2341</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2342">
        Volume N/A                                                - CH 2342</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2343">
        Volume N/A                                                - CH 2343</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2344">
        Volume N/A                                                - CH 2344</option>
                                          <option value="https://www.readlightnovel.me/martial-peak/chapter-2345">
        Volume N/A                                                - CH 2345</option>
                                      <option value="" disabled="">------</option>
      </select>
  </li>

  <li>
    <a href="https://www.readlightnovel.me/martial-peak/chapter-2293" class="next next-link">Next</a>
  </li>
</ul>
<div class="hidden" id="chapterhidden">
  <h1>Martial Peak – Chapter 266, Exterminate</h1>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>
    <strong>Translator:&nbsp;</strong><strong>Silavin&nbsp;</strong
    ><strong>&amp;&nbsp;</strong><strong>PewPew</strong
    ><strong>LaserGun</strong>
  </p>
  <p><strong>Editor: Richard</strong></p>
  <p><strong>Proofreader:&nbsp;Leo of Zion Mountain</strong></p>
  <p>&nbsp;</p>
  <p>
    Everything happened too fast. When she was thrown back, the girl didn’t even
    have time to react before falling flat on the ground.
  </p>
  <p>&nbsp;</p>
  <p>
    When the group of people chasing behind her saw this scene, all of them
    became excited and rushed up to where their prey had fallen, instantly
    surrounding her.
  </p>
  <p>
    Tip: any tips
  </p>
  <p>
  If you find any errors call mamy
  </p>
  <p>&nbsp;</p>
</div>
</body>
</html>
`
import got from 'got';
jest.mock('got')

describe('Testing extractor', () => {
  test('given an page then should extract and separate info and contents ', async () => {
    const htmlExtractor = new HTMLExtractor();

    got.mockReturnValue(({
      body: pageMocked
    }))
    const url = 'http://any.com'

    const content = await htmlExtractor.extract(url, 266);

    // console.log(content)
    
    const expectedInfo = [
      'Translator: Silavin  PewPewLaserGun',
      'Editor: Richard',
      'Proofreader: Leo of Zion Mountain'
    ]

    const expectedContents = [
      'Everything happened too fast. When she was thrown back, the girl didn’t even\n' +
      '    have time to react before falling flat on the ground.',
      'When the group of people chasing behind her saw this scene, all of them\n' +
      '    became excited and rushed up to where their prey had fallen, instantly\n' +
      '    surrounding her.'
    ]

    const page =  {
      nextChapters: [
        '75-76', '505-5', '505',
        '505-5', '-668',  '968-',
        '981-5', '2291',  '2292',
        '2332',  '2333',  '2334',
        '2335',  '2336',  '2337',
        '2338',  '2339',  '2340',
        '2341',  '2342',  '2343',
        '2344',  '2345'
      ],
      previousPage: '73',
      nextPage: '75-76'
    };

    expect(content.infos).toStrictEqual(expectedInfo)
    expect(content.contents).toStrictEqual(expectedContents)
    expect(content.navigator).toStrictEqual(page)
  });
});