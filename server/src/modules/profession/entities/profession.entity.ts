import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/Base.entity';

@Entity()
export class Profession extends BaseEntity {
  @Column({ type: 'varchar' })
  descricao!: string;

  @Column({ default: true, type: 'boolean' })
  situacao!: boolean;
}
