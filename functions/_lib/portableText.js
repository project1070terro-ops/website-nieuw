export function toPlainText(blocks = []) {
  return blocks
    .map((block) => {
      if (block?._type !== 'block' || !Array.isArray(block.children)) return '';
      return block.children
        .filter((child) => child?._type === 'span' && typeof child.text === 'string')
        .map((child) => child.text)
        .join('');
    })
    .filter(Boolean)
    .join('\n\n')
    .trim();
}
