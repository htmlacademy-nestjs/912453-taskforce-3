export const REVIEW = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 500,
  MIN_RATING: 1,
  MAX_RATING: 5,
}

export const REVIEW_VALID = {
  LENGTH_VALID: `Review length must be between ${REVIEW.MIN_LENGTH} and ${REVIEW.MAX_LENGTH}.`,
  RATING_VALID: `Rating must be between ${REVIEW.MIN_RATING} and ${REVIEW.MAX_RATING}.`
}
