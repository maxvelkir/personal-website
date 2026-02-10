export const html = (strings, ...values) =>
  strings.reduce((out, str, i) => out + str + (values[i] ?? ""), "");
