import { generateCSP } from './../../utils/generateCSP';
describe('generateCSP', () => {
  it('should generate a CSP in the proper format in dev environment', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'dev',
      writable: true,
    });

    const csp = generateCSP();

    expect(csp).toStrictEqual(
      `default-src 'none'; prefetch-src 'self'; img-src 'self'; font-src 'self'; script-src-elem 'self'; connect-src 'self'; style-src 'self' 'unsafe-inline'`
    );
  });

  it('should generate a CSP in the proper format for production environment', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'prod',
      writable: true,
    });

    const csp = generateCSP();

    expect(csp).toStrictEqual(
      `default-src 'none'; prefetch-src 'self'; img-src 'self'; font-src 'self'; script-src-elem 'self'; connect-src 'self'; style-src 'self' 'unsafe-inline'`
    );
  });
});
