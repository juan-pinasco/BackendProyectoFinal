export default class CustomError {
  static createError(message) {
    const error = new Error(message);
    throw error;
  }
}
//
/* export default class NotFoundDocumentError {
  static createError(entity) {
    const error = new Error(`No se encontro ${entity} en la bd `);
    throw error;
  }
}
 */
