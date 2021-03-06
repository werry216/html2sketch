import { Bitmap, Svg, parseToBitmap } from 'html2sketch';
import { StrToRenderSVG } from 'html2sketch/utils/svg';
import { errorBase64Url, getBase64ImageString } from 'html2sketch/utils/image';
import { antdRawSvg, setupTestNode } from '@test-utils';

const dataUrl =
  'data:image/png;base64,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';

beforeAll(() => {
  const innerHTML = `
  <div id="div"></div>
  <img id='img' alt="Ant Design" src=${dataUrl} />
  <img id='png' alt="Ant Design" src="https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png" />
  <img id='error-img' alt="error" src="https://xssd.5ac50a.svg" />
  <img id='no-protocol-png' alt="Ant Design" src="//gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png" />
  `;
  setupTestNode(innerHTML);
});

describe('parseToBitmap', () => {
  describe('Png ??????', () => {
    it('????????????', async () => {
      const img = document.getElementById('img') as HTMLImageElement;
      const imageLayer = await parseToBitmap(img);
      expect((imageLayer as Bitmap)?.url).toBe(
        'data:image/png;base64,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',
      );
    });
  });

  describe('Png ????????????', () => {
    it('???????????? ????????????????????????', async () => {
      const img = document.getElementById('im') as HTMLImageElement;
      const imageLayer = await parseToBitmap(img);
      expect(imageLayer).toBeUndefined();
    });
    it('???????????????????????? ????????????????????????', async () => {
      const img = document.getElementById('div') as HTMLImageElement;
      const imageLayer = await parseToBitmap(img);
      expect(imageLayer).toBeUndefined();
    });

    // TODO ???????????????????????? ?????????????????????????
    it('????????????svg???????????????,???????????????', async () => {
      const img = document.getElementById('error-img') as HTMLImageElement;

      const imageLayer = await parseToBitmap(img);

      expect((imageLayer as Bitmap)?.base64).toBe(
        getBase64ImageString(errorBase64Url),
      );
    }, 120000);

    it('??????????????? ???????????????', async () => {
      const img = document.getElementById('png') as HTMLImageElement;
      const imageLayer = await parseToBitmap(img);
      expect((imageLayer as Bitmap)?.base64).toBe(
        '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',
      );
    });
    // TODO ?????? Mock protocol ??????
    // it('??????protocol ????????????', async () => {
    //   const img = document.getElementById(
    //     'no-protocol-png',
    //   ) as HTMLImageElement;
    //   const imageLayer = await parseToBitmap(img);
    //   expect((imageLayer as Bitmap)?.base64).toBe(
    //     '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',
    //   );
    // });
  });

  describe('Svg', () => {
    beforeAll(() => {
      const innerHTML = `<img id='svg' alt="Ant Design" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />`;
      setupTestNode(innerHTML);
    });
    it('??????????????? Svg', async () => {
      const img = document.getElementById('svg') as HTMLImageElement;
      const bcr = img.getBoundingClientRect();
      const imageLayer = await parseToBitmap(img);

      const svg = await StrToRenderSVG(antdRawSvg, {
        width: bcr.width,
        height: bcr.height,
      });

      expect((imageLayer as Svg)?.rawSVGString).toBe(svg);
    });
  });
});
