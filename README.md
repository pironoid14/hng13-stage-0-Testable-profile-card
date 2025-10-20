
# Testable Profile Card

[GitHub Repository](https://github.com/pironoid14/hng13-stage-0-Testable-profile-card)

A small, accessible profile card project built with plain HTML, CSS and JavaScript. Includes a profile page, an About page, and a Contact page with client-side validation.

## Pages
- `index.html` — Profile card with avatar, bio, hobbies, social links and live time (data-testid: `test-profile-card`, `test-user-avatar`, `test-user-name`, etc.).
- `about.html` — Reflective "About Me" page (wraps content in `<main data-testid="test-about-page">` with sections `test-about-bio`, `test-about-goals`, `test-about-confidence`, `test-about-future-note`, `test-about-extra`).
- `contact.html` — Accessible contact form with client-side validation and the following data-testids:
  - `test-contact-name` — full name input
  - `test-contact-email` — email input
  - `test-contact-subject` — subject input
  - `test-contact-message` — message textarea
  - `test-contact-submit` — submit button
  - `test-contact-error-<field>` — per-field error containers (e.g. `test-contact-error-email`)
  - `test-contact-success` — success confirmation container

## Features
- Semantic HTML and sectioning
- Accessible forms (labels, aria-describedby, aria-live) and keyboard navigable
- Responsive layout for mobile/tablet/desktop
- Simple, modular JavaScript for small behaviors (avatar preview, time updates, form validation)

## View locally
No build step required. To view the site locally:

1. Open the project folder in your file explorer.
2. Double-click `index.html`, `about.html`, or `contact.html`; or open them from your editor with Live Preview.

## Accessibility & Testing notes
- All form inputs are labeled and error messages are associated with inputs via `aria-describedby`.
- The contact success message is focusable to announce submission to assistive tech.
- The repository includes `data-testid` attributes on interactive elements to make automated testing straightforward.

## Next steps (suggested)
- Add server-side form handling or AJAX submission for `contact.html`.
- Add automated tests (Jest + Testing Library) to assert presence of `data-testid` elements and validation behavior.

## License
MIT
