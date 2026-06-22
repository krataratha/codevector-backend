export function encodeCursor(cursor: any): string {
  return Buffer.from(
    JSON.stringify(cursor)
  ).toString("base64");
}

export function decodeCursor(cursor: string) {
  return JSON.parse(
    Buffer.from(cursor, "base64").toString()
  );
}