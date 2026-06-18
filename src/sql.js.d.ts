declare module 'sql.js' {
  interface SqlJsStatic {
    Database: new (data?: ArrayLike<number> | ArrayBuffer | null) => Database
  }

  interface QueryExecResult {
    columns: string[]
    values: any[][]
  }

  interface Statement {
    bind(params?: { [key: string]: any }): boolean
    step(): boolean
    getAsObject(): { [key: string]: any }
    get(): any[]
    free(): boolean
  }

  interface Database {
    exec(sql: string): QueryExecResult[]
    prepare(sql: string): Statement
    run(sql: string): Database
    close(): void
    export(): Uint8Array
  }

  interface InitOptions {
    locateFile?: (file: string) => string
  }

  export default function initSqlJs(options?: InitOptions): Promise<SqlJsStatic>
  export { SqlJsStatic, Database, Statement, QueryExecResult }
}
