// in order to have elegant error handling solution, we need to wrap it in an asyncHandler.

// we have a function that takes in req, res, next and it's going to resolve promise
// and if it resolves, it's going to call next, which then calls next piece of middleware.
// we can handle error through express and dont have to need try catch blocks for error handling.
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = asyncHandler;