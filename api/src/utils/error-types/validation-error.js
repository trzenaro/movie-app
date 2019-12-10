class ValidationError extends Error {
    constructor(error) {
        super(error);
        this.name = 'ValidationError';
        this.errorObject = typeof error === 'object' ? error : null;
    }

    getErrorObject() { return this.errorObject; }
}

module.exports = ValidationError;