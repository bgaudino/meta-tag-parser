import { XMLParser, XMLValidator } from "fast-xml-parser";

function getTags(tags: any) {
  if (!tags) return [];
  return tags.length > 0 ? tags : [tags];
}

export function parseMetadata(xmlString: string) {
  const options = {
    ignoreAttributes: false,
  };
  const parser = new XMLParser(options);
  const isValid = XMLValidator.validate(xmlString);
  const error = isValid !== true ? isValid.err : null;

  const parsed = parser.parse(xmlString);

  // Search for meta and link tags in metadata and head tags or in root
  const tags = [
    parsed.metadata?.meta,
    parsed.metadata?.link,
    parsed.head?.meta,
    parsed.head?.link,
    parsed.meta,
    parsed.link,
  ];
  const metaTags = tags.reduce((acc, curr) => acc.concat(getTags(curr)), []);

  // Find tags with a11y prefix in property or name attribute
  // or conformance property since the a11y prefix is not techincally required
  const conformanceProperties = [
    "certifiedBy",
    "certifierCredential",
    "certifierReport",
  ];
  const a11yTags = metaTags.filter((tag: {
    [key: string]: any;
  }) => {
    const attributes = [tag["@_property"], tag["@_name"], tag["@_rel"]];
    return attributes.some(
      (attr) =>
        attr?.startsWith("a11y:") || conformanceProperties.includes(attr || "")
    );
  });

  // Convert to array of objects
  const tagData = a11yTags.map((tag: {
    [key: string]: any;
  }) => {
    const property = tag["@_property"] || tag["@_name"] || tag["@_rel"];
    const content = tag["#text"] || tag["@_href"] || tag["@_content"];
    return {
      property: property.replace("a11y:", ""),
      content,
    };
  });
  return {
    data: tagData,
    error,
  };
}
