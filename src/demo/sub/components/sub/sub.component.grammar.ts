/**
 * @see https://developer.mozilla.org/ja/docs/Web/API/SpeechGrammarList#Examples
 */
export const ColorGrammar = new SpeechGrammarList();

ColorGrammar.addFromString(
`#JSGF V1.0;
grammar colors;
public <color> = aqua | azure | beige | bisque |
  black | blue | brown | chocolate | coral | crimson | cyan | fuchsia |
  ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki |
  lavender | lime | linen | magenta | maroon | moccasin | navy | olive |
  orange | orchid | peru | pink | plum | purple | red | salmon | sienna |
  silver | snow | tan | teal | thistle | tomato | turquoise |
  violet | white | yellow ;
`, 1);
