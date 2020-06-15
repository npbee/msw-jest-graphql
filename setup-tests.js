let { server } = require("./mocks/server");

// Set these up here so we don't have to do it for each test
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
