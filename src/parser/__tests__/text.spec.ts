import { parseToText, Text } from 'html2sketch';

describe('parseToText', () => {
  beforeAll(() => {
    document.head.innerHTML = `
<style>
body {
margin:0;
}
.label:after {
    content: ":";
    position: relative;
    top: -.5px;
    margin: 0 8px 0 2px;
}
</style>
`;
    document.body.innerHTML = `
<div>
<div id="text"">123</div>
<span id="span-text"><span role="img" aria-label="apple" class="anticon anticon-apple"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="apple" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M747.4 535.7C747 467.50000000000006 777.9 416.1 840.3 378.20000000000005C805.4 328.20000000000005 752.5999999999999 300.70000000000005 683 295.40000000000003C617.1 290.20000000000005 545 333.8 518.6 333.8C490.70000000000005 333.8 426.90000000000003 297.2 376.70000000000005 297.2C273.1 298.8 163 379.8 163 544.6C163 593.3000000000001 171.9 643.6 189.7 695.4000000000001C213.5 763.6000000000001 299.29999999999995 930.7 388.79999999999995 928.0000000000001C435.59999999999997 926.9000000000001 468.69999999999993 894.8000000000001 529.5999999999999 894.8000000000001C588.6999999999999 894.8000000000001 619.3 928.0000000000001 671.4999999999999 928.0000000000001C761.7999999999998 926.7000000000002 839.3999999999999 774.8000000000002 861.9999999999999 706.4000000000001C740.8999999999999 649.3000000000001 747.3999999999999 539.2 747.3999999999999 535.7zM736.8 802.7C722.5 822.6 708.0999999999999 838.3000000000001 694.9 848.4000000000001C684.4 856.4000000000001 676.3 859.8000000000001 670.9 860.0000000000001C661.9 859.9000000000001 653.1999999999999 857.7000000000002 636.1999999999999 851.2000000000002C634.9999999999999 850.7000000000002 633.6999999999999 850.2000000000002 631.9999999999999 849.6000000000001L627.5999999999999 847.9000000000001C610.1999999999999 841.2 599.8 837.6000000000001 586.4999999999999 834.1000000000001C567.8999999999999 829.3000000000002 549.3999999999999 826.7000000000002 529.5999999999999 826.7000000000002C509.3999999999999 826.7000000000002 490.3999999999999 829.2000000000002 471.4999999999999 833.9000000000002C457.5999999999999 837.4000000000002 445.89999999999986 841.3000000000002 428.7999999999999 847.7000000000002C428.0999999999999 848.0000000000001 420.6999999999999 850.8000000000002 418.5999999999999 851.6000000000001C415.0999999999999 852.9000000000001 412.3999999999999 853.9000000000001 409.8999999999999 854.8000000000002C399.49999999999994 858.4000000000002 392.8999999999999 859.9000000000002 386.99999999999994 860.0000000000002C386.29999999999995 860.0000000000002 385.69999999999993 859.9000000000002 385.19999999999993 859.8000000000002C384.0999999999999 859.6000000000001 382.69999999999993 859.2000000000002 381.0999999999999 858.5000000000002C376.5999999999999 856.7000000000003 371.19999999999993 853.4000000000002 365.0999999999999 848.7000000000003C351.0999999999999 837.8000000000003 335.69999999999993 820.7000000000003 319.9999999999999 798.8000000000003C292.4999999999999 760.2000000000003 266.4999999999999 709.0000000000003 253.9999999999999 673.1000000000003C238.59999999999988 628.3000000000003 230.9999999999999 585.4000000000002 230.9999999999999 544.5000000000002C230.9999999999999 484.30000000000024 248.7999999999999 438.5000000000002 279.39999999999986 407.4000000000002C305.6999999999999 380.8000000000002 341.09999999999985 365.9000000000002 377.1999999999999 365.1000000000002C383.09999999999985 365.2000000000002 391.6999999999999 366.6000000000002 402.59999999999985 369.6000000000002C411.1999999999999 371.9000000000002 420.59999999999985 375.00000000000017 433.29999999999984 379.50000000000017C437.09999999999985 380.90000000000015 450.1999999999998 385.6000000000002 451.79999999999984 386.20000000000016C459.49999999999983 389.00000000000017 465.29999999999984 391.00000000000017 470.99999999999983 392.8000000000002C489.1999999999998 398.6000000000002 503.29999999999984 401.8000000000002 518.5999999999998 401.8000000000002C534.0999999999998 401.8000000000002 547.3999999999997 398.50000000000017 566.2999999999998 392.00000000000017C573.3999999999999 389.6000000000002 599.1999999999998 380.00000000000017 603.7999999999998 378.40000000000015C629.3999999999999 369.3000000000001 648.2999999999998 364.40000000000015 664.5999999999998 363.20000000000016C669.3999999999997 362.8000000000002 673.6999999999998 362.8000000000002 677.7999999999998 363.10000000000014C700.4999999999999 364.90000000000015 719.8999999999999 369.40000000000015 736.3999999999999 376.90000000000015C698.7999999999998 420.3000000000001 679.3999999999999 473.40000000000015 679.4999999999999 535.3000000000002C679.1999999999999 550.0000000000002 680.3999999999999 567.0000000000002 684.5999999999999 587.1000000000001C690.9999999999999 617.6000000000001 703.1999999999999 647.8000000000002 722.4999999999999 676.1000000000001C737.1999999999999 697.6000000000001 755.3999999999999 717.0000000000001 777.1999999999999 733.9000000000001C765.6999999999999 757.6000000000001 751.5999999999999 782.1000000000001 736.8 802.7zM642.3 230.70000000000005C693 170.50000000000006 688.4 115.70000000000005 686.9 96.00000000000006C642.1 98.60000000000005 590.3 126.50000000000006 560.8 160.80000000000007C528.3 197.60000000000008 509.19999999999993 243.10000000000008 513.3 294.4000000000001C561.6999999999999 298.1000000000001 605.9 273.2000000000001 642.3 230.7000000000001z" style="fill: rgba(0, 0, 0, 0.85); color: rgba(0, 0, 0, 0.85); font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.85); text-rendering: optimizelegibility;"></path></svg></span>Tab 1</span>
<div id="div-text"><span role="img" aria-label="apple" class="anticon anticon-apple"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="apple" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M747.4 535.7C747 467.50000000000006 777.9 416.1 840.3 378.20000000000005C805.4 328.20000000000005 752.5999999999999 300.70000000000005 683 295.40000000000003C617.1 290.20000000000005 545 333.8 518.6 333.8C490.70000000000005 333.8 426.90000000000003 297.2 376.70000000000005 297.2C273.1 298.8 163 379.8 163 544.6C163 593.3000000000001 171.9 643.6 189.7 695.4000000000001C213.5 763.6000000000001 299.29999999999995 930.7 388.79999999999995 928.0000000000001C435.59999999999997 926.9000000000001 468.69999999999993 894.8000000000001 529.5999999999999 894.8000000000001C588.6999999999999 894.8000000000001 619.3 928.0000000000001 671.4999999999999 928.0000000000001C761.7999999999998 926.7000000000002 839.3999999999999 774.8000000000002 861.9999999999999 706.4000000000001C740.8999999999999 649.3000000000001 747.3999999999999 539.2 747.3999999999999 535.7zM736.8 802.7C722.5 822.6 708.0999999999999 838.3000000000001 694.9 848.4000000000001C684.4 856.4000000000001 676.3 859.8000000000001 670.9 860.0000000000001C661.9 859.9000000000001 653.1999999999999 857.7000000000002 636.1999999999999 851.2000000000002C634.9999999999999 850.7000000000002 633.6999999999999 850.2000000000002 631.9999999999999 849.6000000000001L627.5999999999999 847.9000000000001C610.1999999999999 841.2 599.8 837.6000000000001 586.4999999999999 834.1000000000001C567.8999999999999 829.3000000000002 549.3999999999999 826.7000000000002 529.5999999999999 826.7000000000002C509.3999999999999 826.7000000000002 490.3999999999999 829.2000000000002 471.4999999999999 833.9000000000002C457.5999999999999 837.4000000000002 445.89999999999986 841.3000000000002 428.7999999999999 847.7000000000002C428.0999999999999 848.0000000000001 420.6999999999999 850.8000000000002 418.5999999999999 851.6000000000001C415.0999999999999 852.9000000000001 412.3999999999999 853.9000000000001 409.8999999999999 854.8000000000002C399.49999999999994 858.4000000000002 392.8999999999999 859.9000000000002 386.99999999999994 860.0000000000002C386.29999999999995 860.0000000000002 385.69999999999993 859.9000000000002 385.19999999999993 859.8000000000002C384.0999999999999 859.6000000000001 382.69999999999993 859.2000000000002 381.0999999999999 858.5000000000002C376.5999999999999 856.7000000000003 371.19999999999993 853.4000000000002 365.0999999999999 848.7000000000003C351.0999999999999 837.8000000000003 335.69999999999993 820.7000000000003 319.9999999999999 798.8000000000003C292.4999999999999 760.2000000000003 266.4999999999999 709.0000000000003 253.9999999999999 673.1000000000003C238.59999999999988 628.3000000000003 230.9999999999999 585.4000000000002 230.9999999999999 544.5000000000002C230.9999999999999 484.30000000000024 248.7999999999999 438.5000000000002 279.39999999999986 407.4000000000002C305.6999999999999 380.8000000000002 341.09999999999985 365.9000000000002 377.1999999999999 365.1000000000002C383.09999999999985 365.2000000000002 391.6999999999999 366.6000000000002 402.59999999999985 369.6000000000002C411.1999999999999 371.9000000000002 420.59999999999985 375.00000000000017 433.29999999999984 379.50000000000017C437.09999999999985 380.90000000000015 450.1999999999998 385.6000000000002 451.79999999999984 386.20000000000016C459.49999999999983 389.00000000000017 465.29999999999984 391.00000000000017 470.99999999999983 392.8000000000002C489.1999999999998 398.6000000000002 503.29999999999984 401.8000000000002 518.5999999999998 401.8000000000002C534.0999999999998 401.8000000000002 547.3999999999997 398.50000000000017 566.2999999999998 392.00000000000017C573.3999999999999 389.6000000000002 599.1999999999998 380.00000000000017 603.7999999999998 378.40000000000015C629.3999999999999 369.3000000000001 648.2999999999998 364.40000000000015 664.5999999999998 363.20000000000016C669.3999999999997 362.8000000000002 673.6999999999998 362.8000000000002 677.7999999999998 363.10000000000014C700.4999999999999 364.90000000000015 719.8999999999999 369.40000000000015 736.3999999999999 376.90000000000015C698.7999999999998 420.3000000000001 679.3999999999999 473.40000000000015 679.4999999999999 535.3000000000002C679.1999999999999 550.0000000000002 680.3999999999999 567.0000000000002 684.5999999999999 587.1000000000001C690.9999999999999 617.6000000000001 703.1999999999999 647.8000000000002 722.4999999999999 676.1000000000001C737.1999999999999 697.6000000000001 755.3999999999999 717.0000000000001 777.1999999999999 733.9000000000001C765.6999999999999 757.6000000000001 751.5999999999999 782.1000000000001 736.8 802.7zM642.3 230.70000000000005C693 170.50000000000006 688.4 115.70000000000005 686.9 96.00000000000006C642.1 98.60000000000005 590.3 126.50000000000006 560.8 160.80000000000007C528.3 197.60000000000008 509.19999999999993 243.10000000000008 513.3 294.4000000000001C561.6999999999999 298.1000000000001 605.9 273.2000000000001 642.3 230.7000000000001z" style="fill: rgba(0, 0, 0, 0.85); color: rgba(0, 0, 0, 0.85); font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.85); text-rendering: optimizelegibility;"></path></svg></span>Tab 1</div>
<div id="ellipsis" style="
padding-left:8px;
width: 190px;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
">位全眼等越子亲作向下入第金社准。</div>
<div id="align-right" style="width: 190px;text-align: right;">位全眼</div>
<span id="span-align-right" style=" display:block; width: 190px;text-align: right;">眼位全</span>
<div style="width: 100px;text-align: right;">
  <label id="label" class="label">亲作向</label>
</div>
<span id="tag" style="
  color: rgb(24, 144, 255);
  background: rgb(230, 247, 255);
  border: 1px solid rgb(217, 217, 217);
  padding: 0 7px;
  height: 22px;
  display: inline-block;
  font-size: 12px;
  line-height: 20px;
  border-radius: 2px;
">
蓝色
</span>
</div>
`;
  });
  it('文本正常解析', () => {
    const node = document.getElementById('text') as HTMLDivElement;

    const text = (parseToText(node) as unknown) as Text;
    expect(text).toBeTruthy();

    expect(text.toSketchJSON().attributedString.string).toBe('123');
  });
  it('空文本不解析', () => {
    const node = document.createElement('div');

    const text = parseToText(node);
    expect(text).toBeUndefined();
  });
  it('span 文本+图标 文本解析正常', () => {
    const node = document.getElementById('span-text') as HTMLSpanElement;

    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();
    expect(text.x).toBe(16);
  });
  it('div 文本+图标 文本解析正常', () => {
    const node = document.getElementById('div-text') as HTMLSpanElement;

    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();
    expect(text.x).toBe(16);
  });
  it('ellipsis 文本解析正常', () => {
    const node = document.getElementById('ellipsis') as HTMLDivElement;

    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();
    expect(text.x).toBe(8);
    expect(text.text).toBe('位全眼等越子亲作向下...');
  });
  it('align-right 文本解析正常', () => {
    const node = document.getElementById('align-right') as HTMLDivElement;
    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();
    expect(text.x).toBe(142);
    expect(text.text).toBe('位全眼');
  });
  it('span-align-right 文本解析正常', () => {
    const node = document.getElementById('span-align-right') as HTMLSpanElement;
    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();
    expect(text.x).toBe(142);
    expect(text.text).toBe('眼位全');
  });
  it('label 文本解析正常', () => {
    const node = document.getElementById('label') as HTMLLabelElement;
    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();
    expect(text.x).toBe(37.78125);
    expect(text.text).toBe('亲作向');
  });
  it('tag 文本解析正常', () => {
    const node = document.getElementById('tag') as HTMLLabelElement;
    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();
    expect(text.y).toBe(157);
  });
});
