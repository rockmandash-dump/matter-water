import { Composites } from 'matter-js';

export default () => {
  const particleOptions = {
    friction: 0.05,
    frictionStatic: 0.1,
    render: { visible: true }
  };

  const constraintOptions = {
    render: { visible: false }
  };

  const softBodyData = {
    xx: 0,
    yy: 200,
    columns: 10,
    rows: 5,
    colGap: -15,
    rowGap: -15,
    crossBrace: true,
    pRadius: 15,
    pOptions: particleOptions,
    cOptions: constraintOptions
  };

  const {
    xx,
    yy,
    columns,
    rows,
    colGap,
    rowGap,
    crossBrace,
    pRadius,
    pOptions,
    cOptions
  } = softBodyData;

  const softBody = Composites.softBody(
    xx,
    yy,
    columns,
    rows,
    colGap,
    rowGap,
    crossBrace,
    pRadius,
    pOptions,
    cOptions
  );

  return softBody;
};
