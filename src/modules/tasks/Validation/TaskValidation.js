import * as yup from "yup";

const sqlInjectionPattern =
  /(\b(select|insert|update|delete|drop|alter|truncate|create|replace|exec|execute|union|where|from)\b|--|\/\*|\*\/|;|'|"|`)/i;

const safeText = (fieldName) =>
  yup
    .string()
    .transform((value) => value ?? "")
    .test("no-sql-injection", `${fieldName} mengandung pola input yang tidak diizinkan.`, (value) => {
      if (!value) {
        return true;
      }

      return !sqlInjectionPattern.test(value);
    });

export const taskTitleSchema = yup.object({
  title: safeText("Task")
    .trim()
    .required("Task baru wajib diisi.")
    .max(225, "Task baru tidak boleh lebih dari 225 karakter."),
});

export const taskSearchSchema = yup.object({
  search: safeText("Search").max(225, "Search tidak boleh lebih dari 225 karakter."),
});

export const validateWithSchema = (schema) => (values) => {
  try {
    schema.validateSync(values, { abortEarly: false });
    return {};
  } catch (error) {
    return error.inner.reduce((errors, currentError) => {
      if (!errors[currentError.path]) {
        errors[currentError.path] = currentError.message;
      }

      return errors;
    }, {});
  }
};

export const isSearchValueSafe = (value) => {
  try {
    taskSearchSchema.validateSync({ search: value });
    return true;
  } catch (error) {
    return false;
  }
};
