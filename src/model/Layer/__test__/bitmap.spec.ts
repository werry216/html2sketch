import Bitmap from '../Bitmap';

describe('Bitmap 类', () => {
  it('Bitmap 可正常生成 Sketch JSON', () => {
    const bitmap = new Bitmap({
      url: 'foo.png',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });

    //@ts-ignore
    expect(bitmap.toSketchJSON().image.url).toEqual('foo.png');

    expect(bitmap.toSketchJSON()).toMatchSnapshot();
    expect(bitmap.toSketchJSON()).toStrictEqual({
      _class: 'bitmap',
      booleanOperation: -1,
      clippingMaskMode: 0,
      do_objectID: 'UUID',
      clippingMask: '',
      exportOptions: {
        _class: 'exportOptions',
        exportFormats: [],
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
      },
      fillReplacesImage: false,
      frame: {
        _class: 'rect',
        constrainProportions: false,
        height: 100,
        width: 100,
        x: 0,
        y: 0,
      },
      hasClippingMask: false,
      image: {
        _class: 'MSJSONOriginalDataReference',
        _ref: 'images/UUID',
        _ref_class: 'MSImageData',
        url: 'foo.png',
      },
      intendedDPI: 32,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: false,
      isVisible: true,
      layerListExpandedType: 0,
      name: 'bitmap',
      nameIsFixed: false,
      resizingConstraint: 63,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      style: {
        _class: 'style',
        borderOptions: {
          _class: 'borderOptions',
          dashPattern: [],
          isEnabled: true,
          lineCapStyle: 0,
          lineJoinStyle: 0,
        },
        borders: [],
        colorControls: {
          _class: 'colorControls',
          brightness: 0,
          contrast: 1,
          hue: 0,
          isEnabled: false,
          saturation: 1,
        },
        contextSettings: {
          _class: 'graphicsContextSettings',
          blendMode: 0,
          opacity: 1,
        },
        do_objectID: 'UUID',
        endMarkerType: 0,
        fills: [],
        innerShadows: [],
        miterLimit: 10,
        shadows: [],
        startMarkerType: 0,
        windingRule: 1,
      },
    });
  });
  describe('ensureBase64DataURL', function () {
    const img =
      'data:image/png;base64,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';
    const x = Bitmap.ensureBase64DataURL(img);
    expect(x).toBe(img);
  });
});
