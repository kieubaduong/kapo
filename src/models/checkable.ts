import KapoError from "./kapo.error";

interface Checkable {
    validate(): KapoError;
}

export default Checkable;
