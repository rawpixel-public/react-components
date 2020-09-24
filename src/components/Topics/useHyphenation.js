import React from "react";

export default (groupIcon, name, active) => {
  const [lines, setLines] = React.useState({ hyphenated: false, multi: false });
  const ref = React.useRef();

  React.useEffect(() => {
    if (!name || !("createRange" in document)) {
      return;
    }

    const LINE_HEIGHT = 15;
    const titleElement = ref.current;
    const textNode = Array.from(titleElement.childNodes).find(
      e => e.nodeName === "#text"
    );
    const text = name;

    // Check if any words' bounding rect spans more than one line.
    const words = text.split(" ");
    const wordSpansLine = !!words
      .map(word => {
        const range = document.createRange();
        const start = text.indexOf(word);
        const end = start + word.length;
        range.setStart(textNode, start);
        range.setEnd(textNode, end);
        return range.getBoundingClientRect().height > LINE_HEIGHT;
      })
      .filter(Boolean).length;

    // Apply hyphenated css if a word spans across lines.
    if (wordSpansLine) {
      setLines({ hyphenated: true, multi: true });
    } else if (words.length === 1 && titleElement.clientHeight > LINE_HEIGHT) {
      setLines({ hyphenated: true, multi: true });
    } else {
      setLines({
        hyphenated: false,
        multi: titleElement.clientHeight > LINE_HEIGHT
      });
    }
  }, [groupIcon, name, active]);

  return [ref, lines];
};
