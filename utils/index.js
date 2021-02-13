export const findTestByAttr = (wrapper, val) =>
  wrapper.find(`[data-test='${val}']`);
