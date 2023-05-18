export const COMMENT_LENGTH = {
  Min: 10,
  Max: 300
};

export const COMMENT_VALIDATION_ERRORS = {
  CommentLength: `Comment length must be between ${COMMENT_LENGTH.Min} and ${COMMENT_LENGTH.Max} chars.`,
};
