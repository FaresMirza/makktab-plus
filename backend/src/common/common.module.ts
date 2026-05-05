import { Global, Module } from '@nestjs/common';
import { TenantHelper } from './helpers/tenant.helper';

/**
 * Global module exporting cross-cutting helpers (tenant scoping etc.)
 * Imported once at the application root via `app.module.ts`.
 */
@Global()
@Module({
  providers: [TenantHelper],
  exports: [TenantHelper],
})
export class CommonModule {}
