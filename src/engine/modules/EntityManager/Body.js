import { SHAPES, ENTITY_NODE_TYPES } from "../../constants";
import Vector2D from "../core/Vector2D";
import Commons from "../core/Commons";

import _node from "./_node";

// Styles and textures will be applied to all children as well
// children can have overriden styles as well, inherit unspecified values
class Body extends _node {
  constructor(props) {
    super(props);

    const {
      shape = SHAPES.RECTANGLE,
      width,
      height,
      radius,
      startAngle,
      endAngle,
      vertices,
      eddges,

      position = [0, 0], // center
      transform, // matrix? rotation, scale, translate,

      styles, // backgroundColor, backgroundImage, backgroundGradient, borderColor, borderSize

      debug = false,
      // collision box?
      boundingBox = {
        margins: [0, 0, 0, 0],
        shape: SHAPES.RECTANGLE,
        color: "red",
      },

      ...restProps
    } = props;

    this.type = ENTITY_NODE_TYPES.BODY;

    this.shape = shape;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.vertices = vertices;
    this.eddges = eddges;

    // should I save corners? and edges?
    // users will be giving center pos by default
    this.position = new Vector2D(position[0], position[1]);
    this.transform = transform;

    this.styles = styles;

    this.debug = debug;
    this.boundingBox = boundingBox;

    this.restProps = restProps;
  }

  rotate() {}
  scale() {}
  translate() {}
}

Body.getDebugMessage = (body) => {
  return `Pos :: ${body.position.x}, ${body.position.y}`;
};

Body.createArc = ({
  radius,
  startAngle = 0,
  endAngle = Math.PI * 2,
  position,
  ...restProps
}) => {
  return new Body({
    shape: SHAPES.ARC,
    width: 2 * radius,
    height: 2 * radius,
    startAngle,
    endAngle,
    radius,
    position,
    ...restProps,
  });
};

Body.createRectangle = ({ width, height, position, ...restProps }) => {
  return new Body({
    shape: SHAPES.RECTANGLE,
    width,
    height,
    position,
    ...restProps,
  });
};

Body.createPolygon = ({ vertices, eddges, position, ...restProps }) => {
  let minX = 0;
  let minY = 0;

  let maxX = 0;
  let maxY = 0;

  vertices.map(([x, y]) => {
    minX = Commons.minimum(x, minX);
    maxX = Commons.maximum(x, maxX);

    minY = Commons.minimum(y, minY);
    maxY = Commons.maximum(y, maxY);
  });
  return new Body({
    shape: SHAPES.POLYGON,
    width: maxX - minX,
    height: maxY - minY,
    position,
    vertices,
    eddges,
    ...restProps,
  });
};

export default Body;
