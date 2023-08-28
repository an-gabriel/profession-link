import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/shared/entities/Base.entity';

@Entity()
export class Profession extends BaseEntity {
  @Column({ type: 'varchar' })
  private descricao!: string;

  @Column({ default: true, type: 'boolean' })
  private situacao!: boolean;
}
