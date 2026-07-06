import { neon } from '@neondatabase/serverless';

let _sql: any = null;

function getSql() {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set');
    }
    _sql = neon(process.env.DATABASE_URL);
  }
  return _sql;
}

export function sql(strings: TemplateStringsArray, ...values: any[]) {
  return getSql()(strings, ...values);
}
