import { Injectable } from '@nestjs/common';
import { AuditRepository } from '../queries/audit.queries';

@Injectable()
export class AuditHelper {
    constructor(private readonly auditRepository: AuditRepository) { }

    // Placeholder for audit helper methods
    // Add audit utility/formatting methods here as needed
}
