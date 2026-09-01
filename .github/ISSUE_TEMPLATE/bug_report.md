name: Bug Report
description: Report a bug or issue
title: "[BUG] "
labels: ["bug", "needs-triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thank you for reporting a bug! Please provide as much detail as possible.
  - type: textarea
    attributes:
      label: Description
      description: What happened?
      placeholder: "Describe the bug..."
    validations:
      required: true
  - type: textarea
    attributes:
      label: Steps to Reproduce
      description: How can we reproduce this?
      placeholder: |
        1. Go to...
        2. Click...
        3. See error...
    validations:
      required: true
  - type: textarea
    attributes:
      label: Expected Behavior
      description: What should happen?
      placeholder: "Expected behavior..."
    validations:
      required: true
  - type: textarea
    attributes:
      label: Screenshots
      description: Add screenshots if applicable
  - type: textarea
    attributes:
      label: Environment
      description: Your setup details
      placeholder: |
        - OS: [e.g., macOS, Windows, Linux]
        - Node version:
        - Browser:
    validations:
      required: true
