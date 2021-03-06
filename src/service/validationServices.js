const validateName = (name) =>
  !name
    ? {
        ok: false,
        status: 422,
        message: 'Name is missing!',
      }
    : { ok: true };

const validateEmail = (email) => {
  if (!email) return { ok: false, status: 422, message: 'Email is missing!' };
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    ? { ok: true }
    : {
        ok: false,
        status: 422,
        message: 'Email is not in the correct format!',
      };
};

const validatePassword = (pass) =>
  !pass
    ? { ok: false, status: 422, message: 'Password is missing!' }
    : { ok: true };

const validateId = (id) =>
  isNaN(id)
    ? { ok: false, status: 422, message: 'Not a valid id!' }
    : { ok: true };

const validateTitle = (title) =>
  !title
    ? { ok: false, status: 422, message: 'Title is missing!' }
    : { ok: true };

const validateSummary = (summary) =>
  !summary
    ? { ok: false, status: 422, message: 'Summary is missing!' }
    : { ok: true };

const validateFirstParagraph = (firstParagraph) =>
  !firstParagraph
    ? { ok: false, status: 422, message: 'First paragraph is missing!' }
    : { ok: true };

const validateBody = (body) =>
  !body
    ? { ok: false, status: 422, message: 'Body is missing!' }
    : { ok: true };

const validateCategory = (category) =>
  !category
    ? { ok: false, status: 422, message: 'Category is missing!' }
    : { ok: true };

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateId,
  validateTitle,
  validateSummary,
  validateFirstParagraph,
  validateBody,
  validateCategory,
};
