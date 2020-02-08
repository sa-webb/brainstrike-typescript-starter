// encodeCursor and decodeCursor code borrowed from https://github.com/kirkbrauer/typeorm-graphql-pagination by Kirk Brauer.
import { encode, decode } from "opaqueid";

export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface PageInfoInterface {
  startCursor: string | null;
  endCursor: string | null;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * A cursor object.
 */
export interface Cursor {
  /**
   * The ID of the entity.
   */
  id: string;
  /**
   * The entity type.
   */
  type: string;
}

/**
 * The invalid cursor error.
 */
export class InvalidCursorError extends Error {
  /**
   * Constructs a new InvalidCursorError.
   */
  constructor() {
    super();
    this.name = "Invalid Cursor Error";
    this.message = "Invalid cursor";
  }
}

/**
 * The invalid cursor type error.
 */
export class InvalidCursorTypeError extends Error {
  /**
   * The expected cursor type.
   */
  private expectedType: string;

  /**
   * The actual cursor type.
   */
  private actualType: string;

  /**
   * Constructs a new InvalidCursorTypeError
   * @param expectedType The expected cursor type.
   * @param actualType The actual cursor type.
   */
  constructor(expectedType: string, actualType: string) {
    super();
    this.name = "Invalid Cursor Type Error";
    this.expectedType = expectedType;
    this.actualType = actualType;
    this.message = `Invalid cursor, expected type ${expectedType}, but got type ${actualType}`;
  }
}

/**
 * Encodes a pagination cursor.
 * @param id The entity ID.
 * @param type The entity type.
 * @param index The entity index in the results.
 */
export function encodeCursor(id: string, type: string): string {
  return encode(`C|${type}|${id}`);
}

/**
 * Decodes a pagination cursor.
 * @param cursor The cursor to decode.
 * @param type The entity type.
 */
export function decodeCursor(cursor: string, type: string): Cursor {
  // Split the cursor
  const split: string[] = decode(cursor).split("|");
  // Verify that it is a valid cursor
  if (split[0] !== "C") throw new InvalidCursorError();
  // Throw an error if the cursor type is incorrect
  if (split[1] !== type) throw new InvalidCursorTypeError(type, split[1]);
  // Return the cursor data
  return {
    id: split[2],
    type: split[1]
  };
}

export function buildPageInfo<
  T extends { cursor: string; node: { rowNumber: number } }
>(edges: T[], totalCount: string): PageInfoInterface {
  const firstEdge = edges[0] ?? null;
  const lastEdge = edges.length ? edges[edges.length - 1] : null;

  const startCursor = firstEdge?.cursor ?? null;
  const endCursor = lastEdge?.cursor ?? null;

  const hasNextPage = lastEdge
    ? Number(lastEdge.node.rowNumber) < Number(totalCount)
    : false;

  const hasPreviousPage = edges.length
    ? Number(firstEdge.node.rowNumber) > 1
    : false;

  return {
    startCursor,
    endCursor,
    totalCount: Number(totalCount),
    hasNextPage,
    hasPreviousPage
  };
}