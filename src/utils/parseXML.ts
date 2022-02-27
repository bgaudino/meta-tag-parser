export function parseXML(xmlString: string) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  // Check for errors
  const parsererrorTag = Array.from(xmlDoc.getElementsByTagName("parsererror"));
  const errors = parsererrorTag.map((tag) => {
    const error = tag.getElementsByTagName("div")[0].innerText.split(":");
    return {
      key: error[0],
      value: error[1],
    };
  });

  // Look for metadata tag
  const metadata = xmlDoc.getElementsByTagName("metadata")[0];

  // If metadata tag search children, otherwise search for meta and link tags
  const tags = metadata
    ? Array.from(metadata.children)
    : [
        ...Array.from(xmlDoc.getElementsByTagName("meta")),
        ...Array.from(xmlDoc.getElementsByTagName("link")),
      ];

  // Find tags with a11y prefix in property or name attribute
  // or conformance property since the a11y prefix is not techincally required
  const conformanceProperties = [
    "certifiedBy",
    "certifierCredential",
    "certifierReport",
  ];
  const a11y = tags.filter((tag) => {
    const attributes = [
      tag.getAttribute("property"),
      tag.getAttribute("name"),
      tag.getAttribute("rel"),
    ];
    return attributes.some(
      (attr) => attr?.startsWith("a11y") || conformanceProperties.includes(attr || "")
    );
  });

  // Convert to array of objects
  const data = a11y.map((tag) => {
    if (tag.tagName === "meta") {
      const property = tag.getAttribute("property") || tag.getAttribute("name");
      const content = tag.textContent || tag.getAttribute("content");
      if (property)
        return {
          tag: "meta",
          property: property.replace("a11y:", ""),
          content,
        };
    }
    if (tag.tagName === "link") {
      const property = tag.getAttribute("rel");
      const content = tag.getAttribute("href");
      if (property)
        return {
          tag: "link",
          property: property.replace("a11y:", ""),
          content,
        };
    }
    return { property: "", content: "" };
  });

  return {
    data,
    errors,
    success: errors.length === 0,
  };
}
