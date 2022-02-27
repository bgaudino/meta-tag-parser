import React from "react";
import { parseXML } from "./utils/parseXML";

const EPUB3 = `
<metadata>
  <link rel="dcterms:conformsTo"
        href="http://www.idpf.org/epub/a11y/accessibility-20170105.html#wcag-aa"/>
  <meta property="a11y:certifiedBy">Dewey, Checkett and Howe</meta>
  <meta property="a11y:certifierCredential">Certifiably Accessible</meta>
  <link rel="a11y:certifierReport"
        href="https://example.com/reports/a11y/pub.html"/>
  …
</metadata>
`;

const EPUB3Result = [
  {
    tag: "meta",
    property: "certifiedBy",
    content: "Dewey, Checkett and Howe",
  },
  {
    tag: "meta",
    property: "certifierCredential",
    content: "Certifiably Accessible",
  },
  {
    tag: "link",
    property: "certifierReport",
    content: "https://example.com/reports/a11y/pub.html",
  },
];

const EPUB2 = `
<metadata>
  <meta name="dcterms:conformsTo"
        content="http://www.idpf.org/epub/a11y/accessibility-20170105.html#wcag-aa"/>
  <meta name="a11y:certifiedBy" content="Dewey, Checkett and Howe"/>
  <meta name="a11y:certifierCredential" content="Certifiably Accessible"/>
  <meta name="a11y:certifierReport"
        content="https://example.com/reports/a11y/pub.html"/>
  …
</metadata>
`;

const EPUB2Result = [
  {
    tag: "meta",
    property: "certifiedBy",
    content: "Dewey, Checkett and Howe",
  },
  {
    tag: "meta",
    property: "certifierCredential",
    content: "Certifiably Accessible",
  },
  {
    tag: "meta",
    property: "certifierReport",
    content: "https://example.com/reports/a11y/pub.html",
  },
];

test("parse EPUB3 XML", () => {
  const xml = parseXML(EPUB3);
  expect(xml.data).toEqual(EPUB3Result);
});

test("parse EPUB2 XML", () => {
  const xml = parseXML(EPUB2);
  expect(xml.data).toEqual(EPUB2Result);
});
