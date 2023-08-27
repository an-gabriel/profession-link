import { BaseEntity } from 'common/shared/entity/BaseEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Profession extends BaseEntity {
  @Column()
  private descricao!: string;

  @Column({ default: true })
  private situacao!: boolean;
}
