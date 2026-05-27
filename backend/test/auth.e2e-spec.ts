/**
 * Black-box (system) test plan for POST /auth/login.
 *
 * Twenty test cases — each fires a real HTTP request against a booted
 * NestJS application via Supertest and asserts only on externally
 * observable behaviour: status code and (for the happy path) response
 * body.
 *
 * The AuthService is replaced with a stub that returns success only for
 * the magic pair "fares" / "secret123" and throws UnauthorizedException
 * for every other format-valid combination. That way we can distinguish
 *   • validation failure  → 400 (service not called),
 *   • validation success → service called, may return 201 or 401.
 */
import {
  INestApplication,
  Logger,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request = require('supertest');
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';

describe('POST /auth/login (e2e) — 20 cases', () => {
  let app: INestApplication;
  let authService: { login: jest.Mock };

  beforeAll(async () => {
    authService = { login: jest.fn() };

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    app = moduleRef.createNestApplication({ logger: false });
    Logger.overrideLogger(false);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    authService.login.mockReset();
    authService.login.mockImplementation(async (dto: any) => {
      if (dto?.username === 'fares' && dto?.password === 'secret123') {
        return { requiresOtp: true, otpId: 'otp-1' };
      }
      throw new UnauthorizedException('Invalid credentials');
    });
  });

  const postLogin = (body: any) =>
    request(app.getHttpServer())
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(body));

  // ─── Validation failures (HTTP 400, service NOT called) ────────────────
  it('1. empty body → 400', async () => {
    const res = await postLogin({});
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('2. missing username → 400', async () => {
    const res = await postLogin({ password: 'secret123' });
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('3. missing password → 400', async () => {
    const res = await postLogin({ username: 'fares' });
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('4. empty username string → 400', async () => {
    const res = await postLogin({ username: '', password: 'secret123' });
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('5. empty password string → 400', async () => {
    const res = await postLogin({ username: 'fares', password: '' });
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('6. password below min length (5 chars) → 400', async () => {
    const res = await postLogin({ username: 'fares', password: 'abcde' });
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('7. password at min length (6 chars) → service called, 401 from stub', async () => {
    const res = await postLogin({ username: 'fares', password: 'abcdef' });
    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(401);
  });

  it('8. username as number → 400', async () => {
    const res = await postLogin({ username: 123, password: 'secret123' });
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('9. password as number → 400', async () => {
    const res = await postLogin({ username: 'fares', password: 123456 });
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('10. null username → 400', async () => {
    const res = await postLogin({ username: null, password: 'secret123' });
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('11. null password → 400', async () => {
    const res = await postLogin({ username: 'fares', password: null });
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('12. unknown extra field (whitelist) → 400', async () => {
    const res = await postLogin({
      username: 'fares',
      password: 'secret123',
      isAdmin: true,
    });
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('13. multiple unknown fields → 400', async () => {
    const res = await postLogin({
      username: 'fares',
      password: 'secret123',
      role: 'admin',
      token: 'fake',
    });
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('14. body is an array → 400', async () => {
    const res = await postLogin([]);
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('15. body is a plain string → 400', async () => {
    const res = await postLogin('hello');
    expect(res.status).toBe(400);
    expect(authService.login).not.toHaveBeenCalled();
  });

  // ─── Happy path & service-level rejections ─────────────────────────────
  it('16. valid credentials → 201 + JSON payload', async () => {
    const res = await postLogin({ username: 'fares', password: 'secret123' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ requiresOtp: true, otpId: 'otp-1' });
    expect(authService.login).toHaveBeenCalledTimes(1);
  });

  it('17. whitespace-only username → service called, 401 from stub', async () => {
    const res = await postLogin({ username: '   ', password: 'secret123' });
    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(401);
  });

  it('18. SQL-injection-like input → service called, 401 from stub', async () => {
    const res = await postLogin({
      username: "' OR 1=1--",
      password: 'secret123',
    });
    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(401);
  });

  it('19. wrong password → service called, 401 from stub', async () => {
    const res = await postLogin({ username: 'fares', password: 'wrongpass' });
    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(401);
  });

  // ─── HTTP-semantics ────────────────────────────────────────────────────
  it('20. wrong HTTP method (GET) → 404', async () => {
    const res = await request(app.getHttpServer()).get('/auth/login');
    expect(res.status).toBe(404);
    expect(authService.login).not.toHaveBeenCalled();
  });
});
