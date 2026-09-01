name: Feature Request
description: Suggest a new feature or improvement
title: "[FEATURE] "
labels: ["enhancement"]
body:
  - type: markdown
    attributes:
      value: |
        Thank you for the feature request! Describe your idea below.
  - type: textarea
    attributes:
      label: Is your feature related to a problem?
      description: Describe the problem
      placeholder: "A clear and concise description..."
    validations:
      required: true
  - type: textarea
    attributes:
      label: Proposed Solution
      description: How would you solve this?
      placeholder: "Describe the solution..."
    validations:
      required: true
  - type: textarea
    attributes:
      label: Alternatives Considered
      description: Any alternatives?
      placeholder: "Describe any alternative solutions..."
  - type: textarea
    attributes:
      label: Additional Context
      description: Any other context?
      placeholder: "Add any other context here..."
