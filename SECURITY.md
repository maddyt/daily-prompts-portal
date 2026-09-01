# Security Policy

## Reporting Security Issues

**Do not** file security issues on the public issue tracker.

Instead, please report security vulnerabilities by emailing: [your-email@example.com]

Include the following information:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will acknowledge receipt within 48 hours and provide an update within 5 days.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Security Best Practices

### For Users

1. **Environment Variables**: Never commit `.env.local` files with real credentials
2. **Supabase Keys**: Use anon keys in frontend, never expose service role keys
3. **Dependencies**: Keep dependencies updated regularly
4. **CORS**: Properly configure CORS in Supabase for your domain only

### For Contributors

1. Never commit secrets or credentials
2. Use environment variables for sensitive data
3. Review dependencies before adding
4. Report vulnerabilities privately

## Dependency Management

We use:
- Supabase SDK - regularly updated for security patches
- Next.js - follows security best practices
- Tailwind CSS - no security-critical dependencies

Subscribe to security advisories for these projects.
