declare global {
  // global 中添加 widget api
  interface PluginAPI {
    widget: WidgetAPI;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // JSX
  namespace JSX {
    interface IntrinsicAttributes {
      key?: string | number | undefined;
    }

    interface ElementChildrenAttribute {
      children: {};
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Widget

  interface WidgetAPI {
    register(component: FunctionalWidget<any>): void;
    h(...args: any[]): JsDesignDeclarativeNode;

    // Hooks
    useWidgetId(): string;
    useSyncedState<T = any>(
      name: string,
      defaultValue: T | (() => T)
    ): [T, (newValue: T | ((currValue: T) => T)) => void];
    useSyncedMap<T = any>(name: string): SyncedMap<T>;
    usePropertyMenu(
      items: WidgetPropertyMenuItem[],
      onChange: (event: WidgetPropertyEvent) => void | Promise<void>
    ): void;

    useEffect(effect: () => (() => void) | void): void;

    waitForTask(promise: Promise<any>): void;

    // Components
    AutoLayout: AutoLayout;
    Frame: Frame;
    Image: ImageComponent;
    Rectangle: Rectangle;
    Ellipse: Ellipse;
    Text: TextComponent;
    SVG: SVG;
    Input: InputComponent;
    Line: Line;
    Fragment: Fragment;
    Span: Span;
  }

  type SyncedMap<T = any> = {
    /** @deprecated use size instead */
    readonly length: number;

    readonly size: number;
    has(key: string): boolean;
    get(key: string): T | undefined;
    set(key: string, value: T): void;
    delete(key: string): void;
    keys(): string[];
    values(): T[];
    entries(): [string, T][];
  };

  type Fragment = FunctionalWidget<FragmentProps>;

  type AutoLayout = FunctionalWidget<AutoLayoutProps>;
  type Frame = FunctionalWidget<FrameProps>;

  type Rectangle = FunctionalWidget<RectangleProps>;

  type ImageComponent = FunctionalWidget<ImageProps>;

  type Ellipse = FunctionalWidget<EllipseProps>;
  type Line = FunctionalWidget<LineProps>;

  type TextComponent = FunctionalWidget<TextProps>;

  type InputComponent = FunctionalWidget<InputProps>;

  type SVG = FunctionalWidget<SVGProps>;
  type Span = (props: SpanProps) => JsDesignVirtualNode<"span">;

  type JsDesignVirtualNode<T> = { __type: T };

  type JsDesignDeclarativeChildren<T> =
    | JsDesignVirtualNode<T>
    | JsDesignDeclarativeChildren<T>[]
    | string
    | null
    | undefined
    | false;

  type JsDesignDeclarativeNode = JsDesignDeclarativeChildren<any>;
  type FunctionalWidget<T> = (props: T) => JsDesignDeclarativeNode;

  type PropertyMenuItemType =
    | "action"
    | "separator"
    | "color-selector"
    | "dropdown"
    | "toggle"
    | "link";

  type HexCode = string;
  interface PropertyMenuItem {
    tooltip: string;
    propertyName: string;
    itemType: PropertyMenuItemType;
  }

  interface WidgetPropertyMenuActionItem extends PropertyMenuItem {
    itemType: "action";
    icon?: string;
    name?: string;
  }
  interface WidgetPropertyMenuLinkItem extends PropertyMenuItem {
    itemType: "link";
    icon?: string | null;
    href: string;
  }
  interface WidgetPropertyMenuSeparatorItem {
    itemType: "separator";
  }

  interface WidgetPropertyMenuColorSelectorOption {
    tooltip: string;
    option: HexCode;
  }

  interface WidgetPropertyMenuColorItem extends PropertyMenuItem {
    itemType: "color-selector";
    options: WidgetPropertyMenuColorSelectorOption[];
    selectedOption: string;
    // 增加系统自带的 colorPicker
    useColorPicker: boolean;
  }

  interface WidgetPropertyMenuDropdownOption {
    option: string;
    label: string;
    icon?: string; // svg 字符串
    tooltip?: string;
  }

  interface WidgetPropertyMenuDropdownItem extends PropertyMenuItem {
    itemType: "dropdown";
    options: WidgetPropertyMenuDropdownOption[];
    selectedOption: string;
    direction: "column" | "row"; // 菜单布局方式，每行限制4个
    optionType: "icon" | "label" | "labelWithIcon"; // 子菜单的展示方式
  }

  interface WidgetPropertyMenuToggleItem extends PropertyMenuItem {
    itemType: "toggle";
    icon?: string;
    isToggled: boolean;
    name?: string;
  }

  type WidgetPropertyMenuItem =
    | WidgetPropertyMenuActionItem
    | WidgetPropertyMenuSeparatorItem
    | WidgetPropertyMenuColorItem
    | WidgetPropertyMenuDropdownItem
    | WidgetPropertyMenuToggleItem
    | WidgetPropertyMenuLinkItem;

  type WidgetPropertyMenu = WidgetPropertyMenuItem[];
  type WidgetPropertyEvent = {
    propertyName: string;
    propertyValue?: string | undefined;
  };

  type WidgetClickEvent = {
    // 相对于画布的绝对位置
    canvasX: number;
    canvasY: number;

    // 相对于被点击节点的相对位置
    offsetX: number;
    offsetY: number;
  };

  interface TextChildren {
    children?:
      | JsDesignVirtualNode<"span">
      | string
      | number
      | (JsDesignVirtualNode<"span"> | string | number)[];
  }

  interface TextProps extends BaseProps, WidgetJSX.TextProps, TextChildren {
    font?: { family: string; style: string };
  }

  interface SpanProps extends WidgetJSX.SpanProps, TextChildren {}

  interface TextEditEvent {
    characters: string;
  }
  interface PlaceholderProps
    extends WidgetJSX.BlendProps,
      Omit<WidgetJSX.TextStyleProps, "href"> {}
  interface InputProps extends Omit<TextProps, "children" | "width"> {
    placeholder?: string;
    onTextEditEnd: (e: TextEditEvent) => void;
    value: string | null;
    placeholderProps?: PlaceholderProps;
    inputFrameProps?: Omit<AutoLayoutProps, "width">;
    width?: WidgetJSX.Size;
    inputBehavior?: "wrap" | "truncate" | "multiline";
  }

  interface FragmentProps extends HasChildrenProps {
    key?: BaseProps["key"];
  }

  interface FrameProps
    extends BaseProps,
      WidgetJSX.FrameProps,
      HasChildrenProps {}

  interface AutoLayoutProps
    extends BaseProps,
      WidgetJSX.AutoLayoutProps,
      HasChildrenProps {}

  interface EllipseProps extends BaseProps, WidgetJSX.EllipseProps {}

  interface RectangleProps extends BaseProps, WidgetJSX.RectangleProps {}

  interface ImageProps extends BaseProps, WidgetJSX.ImageProps {}

  interface LineProps
    extends BaseProps,
      Omit<WidgetJSX.LineProps, "direction" | "length"> {
    length?: WidgetJSX.LineProps["length"];
  }

  interface SVGProps extends BaseProps, Partial<WidgetJSX.FrameProps> {
    src: string;
  }

  interface BaseProps extends WidgetJSX.BaseProps {
    onClick?: (event: WidgetClickEvent) => Promise<any> | void;
    key?: string | number;
    tooltip?: string;
  }

  interface HasChildrenProps {
    children?: JsDesignDeclarativeNode | JsDesignDeclarativeNode[];
  }
  namespace WidgetJSX {
    export interface Vector {
      x: number;
      y: number;
    }

    export interface Color {
      r: number;
      g: number;
      b: number;
      a: number;
    }

    export type AlignItems = "center" | "start" | "end" | "baseline";
    export type BlendMode =
      | "normal"
      | "multiply"
      | "screen"
      | "overlay"
      | "darken"
      | "lighten"
      | "color-dodge"
      | "color-burn"
      | "hard-light"
      | "soft-light"
      | "difference"
      | "exclusion"
      | "hue"
      | "saturation"
      | "color"
      | "luminosity";

    export type PaintType =
      | "image"
      | "solid"
      | "gradient-linear"
      | "gradient-radial"
      | "gradient-angular"
      | "gradient-diamond";

    export interface PaintProps {
      type: PaintType;
      blendMode?: BlendMode;
      visible?: boolean;
      opacity?: number;
    }

    export interface SolidPaint extends PaintProps {
      type: "solid";
      color: Color | HexCode;
    }

    export interface ColorStop {
      position: number;
      color: Color;
    }

    export interface BaseGradientPaint extends PaintProps {
      type:
        | "gradient-linear"
        | "gradient-radial"
        | "gradient-angular"
        | "gradient-diamond";
      gradientStops: ColorStop[];
    }

    export interface GradientPaintWithPositions extends BaseGradientPaint {
      gradientHandlePositions: [Vector, Vector, Vector];
    }

    export interface GradientPaintWithTransform extends BaseGradientPaint {
      gradientTransform: Transform;
    }

    export type GradientPaint =
      | GradientPaintWithPositions
      | GradientPaintWithTransform;

    export type Transform = [
      [number, number, number],
      [number, number, number]
    ];

    export interface ImagePaint extends PaintProps {
      type: "image";
      src: string;
      imageSize?: { width: number; height: number };
      scaleMode?: ScaleMode;
      imageTransform?: Transform;
      scalingFactor?: number;
      rotation?: number;
      imageRef?: string;
    }

    export type Paint = SolidPaint | GradientPaint | ImagePaint;

    export interface DropShadowEffect {
      type: "drop-shadow";
      color: HexCode | Color;
      offset: Vector;
      blur: number;
      blendMode?: BlendMode;
      spread?: number;
      visible?: boolean;
      showShadowBehindNode?: boolean;
    }

    export interface InnerShadowEffect {
      type: "inner-shadow";
      color: HexCode | Color;
      offset: Vector;
      blur: number;
      blendMode?: BlendMode;
      spread?: number;
      visible?: boolean;
    }

    export type ShadowEffect = DropShadowEffect | InnerShadowEffect;

    export interface BlurEffect {
      type: "layer-blur" | "background-blur";
      blur: number;
      visible?: boolean;
    }

    export type Effect = ShadowEffect | BlurEffect;

    export type Size = number | "fill-parent";
    export type AutolayoutSize = Size | "hug-contents";
    export type StrokeAlign = "inside" | "outside" | "center";
    export type StrokeCap =
      | "none"
      | "round"
      | "square"
      | "arrow-lines"
      | "arrow-equilateral";
    export type ScaleMode = "fill" | "fit" | "tile" | "crop";
    export type Overflow = "visible" | "hidden" | "scroll";

    export interface TopConstraint {
      type: "top";
      offset: number;
    }

    export interface BottomConstraint {
      type: "bottom";
      offset: number;
    }

    export interface TopBottomConstraint {
      type: "top-bottom";
      topOffset: number;
      bottomOffset: number;
    }

    export interface LeftConstraint {
      type: "left";
      offset: number;
    }

    export interface RightConstraint {
      type: "right";
      offset: number;
    }

    export interface LeftRightConstraint {
      type: "left-right";
      leftOffset: number;
      rightOffset: number;
    }

    export interface CenterConstraint {
      type: "center";
      offset: number;
    }

    export interface HorizontalScaleConstraint {
      type: "horizontal-scale";
      leftOffsetPercent: number;
      rightOffsetPercent: number;
    }

    export interface VerticalScaleConstraint {
      type: "vertical-scale";
      topOffsetPercent: number;
      bottomOffsetPercent: number;
    }

    type VerticalConstraint =
      | TopConstraint
      | BottomConstraint
      | TopBottomConstraint
      | CenterConstraint
      | VerticalScaleConstraint;
    type HorizontalConstraint =
      | LeftConstraint
      | RightConstraint
      | LeftRightConstraint
      | CenterConstraint
      | HorizontalScaleConstraint;

    export type CornerRadius =
      | number
      | {
          topLeft?: number;
          topRight?: number;
          bottomLeft?: number;
          bottomRight?: number;
        };

    export type Path = {
      path: string;
      windingRule: "evenodd" | "nonzero";
    };

    export type FullPadding = {
      top?: number;
      left?: number;
      bottom?: number;
      right?: number;
    };
    export type VerticalHorizontalPadding = {
      vertical?: number;
      horizontal?: number;
    };
    export type Padding = number | FullPadding | VerticalHorizontalPadding;

    export type FontWeightNumerical =
      | 100
      | 200
      | 300
      | 400
      | 500
      | 600
      | 700
      | 800
      | 900;
    export type FontWeightString =
      | "thin"
      | "extra-light"
      | "light"
      | "normal"
      | "medium"
      | "semi-bold"
      | "bold"
      | "extra-bold"
      | "black";
    export type FontWeight = FontWeightNumerical | FontWeightString;

    export type ArcData = {
      readonly startingAngle: number;
      readonly endingAngle: number;
      readonly innerRadius: number;
    };

    interface HoverStyle {
      fill?:
        | HexCode
        | Color
        | SolidPaint
        | GradientPaint
        | (SolidPaint | GradientPaint)[];
      stroke?:
        | HexCode
        | Color
        | SolidPaint
        | GradientPaint
        | (SolidPaint | GradientPaint)[];
      opacity?: number;
    }

    ///
    /// MIXINS
    ///
    export interface BaseProps extends BlendProps, ConstraintProps {
      name?: string;
      hidden?: boolean;
      hoverStyle?: HoverStyle;
      positioning?: "auto" | "absolute";
    }

    export interface GeometryProps {
      fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[];
      stroke?:
        | HexCode
        | Color
        | SolidPaint
        | GradientPaint
        | (SolidPaint | GradientPaint)[];
      strokeWidth?: number;
      strokeAlign?: StrokeAlign;
      strokeDashPattern?: number[];
    }

    export interface PathProps {
      fillPath?: Path[];
      strokePath?: Path[];
    }

    export interface SizeProps {
      width?: Size;
      height?: Size;
    }

    export interface AutoLayoutSizeProps {
      width?: AutolayoutSize;
      height?: AutolayoutSize;
    }

    export interface CornerProps {
      cornerRadius?: CornerRadius;
    }

    export interface BlendProps {
      blendMode?: BlendMode;
      opacity?: number;
      effect?: Effect | Effect[];
    }

    export interface TransformProps {
      rotation?: number;
      // flipVertical?: boolean
    }

    export interface ConstraintProps {
      x?: number | HorizontalConstraint;
      y?: number | VerticalConstraint;
    }

    export interface LayoutProps {
      spacing?: number | "auto";
      padding?: Padding;
      direction?: "horizontal" | "vertical";
      horizontalAlignItems?: Omit<AlignItems, "baseline">;
      verticalAlignItems?: AlignItems;
    }

    export interface TextStyleProps {
      fontFamily?: string;
      letterSpacing?: number | string;
      textDecoration?: "none" | "strikethrough" | "underline";
      fontSize?: number;
      italic?: boolean;
      textCase?:
        | "upper"
        | "lower"
        | "title"
        | "original"
        | "small-caps"
        | "small-caps-forced";
      fontWeight?: FontWeight;
      fontPostScriptName?: string;
      href?: string;
      fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[];
    }

    ///
    /// COMPONENTS
    ///

    export interface FrameProps
      extends BaseProps,
        GeometryProps,
        Required<SizeProps>,
        TransformProps,
        CornerProps {
      overflow?: Overflow;
    }

    export interface AutoLayoutProps
      extends Omit<FrameProps, "width" | "height">,
        LayoutProps,
        AutoLayoutSizeProps {}

    export interface EllipseProps
      extends BaseProps,
        GeometryProps,
        TransformProps,
        SizeProps {
      arcData?: ArcData;
    }

    export interface ImageProps extends Omit<RectangleProps, "fill"> {
      src: string | ImagePaint;
    }

    export interface LineProps extends BaseProps, TransformProps {
      stroke?: HexCode | Color | SolidPaint | SolidPaint[];
      strokeWidth?: number;
      strokeDashPattern?: number[];
      strokeCap?: StrokeCap;
      length: number | "fill-parent";
      direction?: "horizontal" | "vertical";
    }

    export interface RectangleProps
      extends BaseProps,
        GeometryProps,
        Required<SizeProps>,
        TransformProps,
        CornerProps {}

    export interface SVGProps
      extends BaseProps,
        GeometryProps,
        SizeProps,
        TransformProps,
        PathProps {}

    export interface ParagraphProps {
      spacing: number;
    }

    export interface SpanProps extends TextStyleProps {}

    export interface TextProps
      extends BaseProps,
        AutoLayoutSizeProps,
        TransformProps,
        Omit<GeometryProps, "fill">,
        TextStyleProps {
      paragraphIndent?: number;
      paragraphSpacing?: number;
      horizontalAlignText?: "left" | "right" | "center" | "justified";
      verticalAlignText?: "top" | "center" | "bottom";
      lineHeight?: number | string | "auto";
    }

    export type ComponentProps = AutoLayoutProps | FrameProps;
  }
}

export {};
