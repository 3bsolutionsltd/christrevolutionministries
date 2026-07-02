# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in this project, please report it privately to:

**Email**: security@christrevolutionministries.org

Please **do not** create a public GitHub issue for security vulnerabilities.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Security Best Practices

### For Repository Maintainers

1. **Never commit sensitive data**:
   - API keys, tokens, passwords
   - OAuth client secrets
   - FTP credentials
   - Database connection strings

2. **Use GitHub Secrets** for:
   - Deployment credentials
   - API tokens
   - Service account keys

3. **Review all pull requests** before merging

4. **Enable 2FA** on all maintainer accounts

### For Contributors

1. **Do not include** personal information in commits
2. **Use environment variables** for configuration
3. **Follow secure coding practices**
4. **Keep dependencies updated**

## Protected Information

The following are NOT included in this public repository:

- Internal documentation and deployment guides
- Deployment scripts with credentials
- OAuth configuration files
- Server configuration files
- Log files

These are managed separately in private documentation.

## Content Security

This website implements:
- Content Security Policy (CSP) headers
- HTTPS enforcement
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Regular security audits

## Contact

For security concerns, contact: info@christrevolutionministries.org
