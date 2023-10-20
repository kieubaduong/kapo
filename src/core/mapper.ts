export abstract class Mapper<RESPONSE, ENTITY, REQUEST> {
  abstract fromResponse(param: RESPONSE): ENTITY;
  abstract toRequest(param: ENTITY): REQUEST;
}
