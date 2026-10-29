# FrameworkFromScratch Project:

A project focused on designing and implementing end-to-end test automation framework from the ground up with Playwright Test and TypeScript. It applies the Page Object Model (POM) to organize test scenarios and provides a practical setting for exploring AI-assisted documentation workflows.

## Installation guidelines

Clone the repository and install dependencies:

```bash
git clone https://github.com/KatKamenova/SauceProject.git
cd SauceProject
```

The tests use SauceDemo's public demo account credentials, defined in `Enums/userLoginDetails.ts`. No local credentials file is required.

## Tech Stack

- **Language:** TypeScript
- **Test framework:** Playwright Test
- **Runtime and package manager:** Node.js and npm

## API testing

API tests use an isolated Playwright `APIRequestContext` provided by
`Fixtures/api-fixtures.ts`. The context is created and disposed per test.
Run the API suite with:

```bash
npm run test:api
```

The example test uses the public JSONPlaceholder API. To target a different API,
set `API_BASE_URL` to its HTTP(S) base URL. The Sauce Labs authentication test
uses the documented HTTPS Basic Auth flow and checks a read-only jobs request for
HTTP 200; Sauce Labs does not return an authorization token in the response body
for this authentication flow. Set `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` in your
environment or CI secret store to run it. `SAUCE_API_BASE_URL` is optional and
defaults to the US data center (`https://api.us-west-1.saucelabs.com`); set it to
the API base URL for your account's data center if different. Without the Sauce
Labs credentials, this test is skipped with a reason.

Do not put credentials, tokens, or other secrets in URLs or test source, and
avoid logging secret values.

### License

This is a free personal project. All code in this repository was written by me. No formal open-source license has been specified.

### Contributors / Creators

- **Kat Kamenova, QA Engineer**
- **Contact:** [kkamenova277@gmail.com](mailto:kkamenova277@gmail.com)
