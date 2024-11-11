import { DataSource, QueryRunner } from 'typeorm';

class TypeOrmAdapter {
  private queryRunner: QueryRunner;

  private readonly dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.queryRunner = dataSource.createQueryRunner();
  }

  private createQueryRunner(): void {
    this.queryRunner = this.dataSource.createQueryRunner();
  }

  public getQueryRunner(): QueryRunner {
    return this.queryRunner;
  }

  public async startTransaction(): Promise<void> {
    if (this.queryRunner.isTransactionActive) {
      return;
    }
    if (this.queryRunner.isReleased) {
      await this.queryRunner.connect();
    }
    await this.queryRunner.startTransaction();
  }

  public async commitTransaction(): Promise<void> {
    if (!this.queryRunner.isTransactionActive) {
      return;
    }
    await this.queryRunner.commitTransaction();
    await this.queryRunner.release();
    this.createQueryRunner();
  }

  public async rollbackTransaction(): Promise<void> {
    if (!this.queryRunner.isTransactionActive) {
      return;
    }
    await this.queryRunner.rollbackTransaction();
    await this.queryRunner.release();
    this.createQueryRunner();
  }
}

export default TypeOrmAdapter;
