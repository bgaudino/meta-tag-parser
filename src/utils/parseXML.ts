import { XMLParser, XMLValidator } from "fast-xml-parser";

function makeArray(tags: any) {
  if (!tags) return [];
  return Array.isArray(tags) ? tags : [tags];
}

export function parseMetadata(xmlString: string) {
  const options = {
    ignoreAttributes: false,
  };
  const parser = new XMLParser(options);
  const isValid = XMLValidator.validate(xmlString);
  // fast-xml-parser returns true if the xml is valid
  // and an object with the key "err" if it is not
  const error = isValid !== true ? isValid.err : null;

  try {
    const parsed = parser.parse(xmlString);

    // Search for meta tags in possible parent nodes and in root
    const tags = [
      parsed.html?.head?.meta,
      parsed.html?.head?.link,
      parsed.package?.metadata?.meta,
      parsed.package?.metadata?.link,
      parsed.ncx?.head?.meta,
      parsed.ncx?.head?.link,
      parsed.head?.meta,
      parsed.head?.link,
      parsed.metadata?.meta,
      parsed.metadata?.link,
      parsed.meta,
      parsed.link,
    ];
    const metaTags = tags.reduce(
      (acc, curr) => acc.concat(makeArray(curr)),
      []
    );

    // Find tags with a11y prefix in property or name attribute
    // or conformance property since the a11y prefix is not techincally required
    const conformanceProperties = [
      "certifiedBy",
      "certifierCredential",
      "certifierReport",
    ];
    const a11yTags = metaTags.filter((tag: { [key: string]: any }) => {
      const attributes = [tag["@_property"], tag["@_name"], tag["@_rel"]];
      return attributes.some(
        (attr) =>
          attr?.startsWith("a11y:") ||
          conformanceProperties.includes(attr || "")
      );
    });

    // Convert to array of objects
    const data = a11yTags.map((tag: { [key: string]: any }) => {
      const property = tag["@_property"] || tag["@_name"] || tag["@_rel"];
      const content = tag["#text"] || tag["@_href"] || tag["@_content"];
      return {
        property: property.replace("a11y:", ""),
        content,
      };
    });

    return {
      data,
      error,
    };
  } catch (err) {
    console.log(err);
    return {
      data: [],
      error,
    };
  }
}
