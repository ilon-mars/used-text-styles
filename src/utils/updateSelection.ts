export const updateSelection = (page: PageNode, node: SceneNode) => {
  page.selection = page.selection.concat(node).slice(1);
}
