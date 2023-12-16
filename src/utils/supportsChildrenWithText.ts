export const supportsChildrenWithText = (
  node: SceneNode,
): node is FrameNode | ComponentNode | InstanceNode => {
  return (
    node.type === 'FRAME' ||
    node.type === 'GROUP' ||
    node.type === 'COMPONENT' ||
    node.type === 'INSTANCE'
  );
};
