import { BaseEntity } from 'common/shared/entity/BaseEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Profession extends BaseEntity {
  @Column({ default: '' })
  private descricao!: string;

  @Column({ default: false })
  private situacao!: boolean;
}
