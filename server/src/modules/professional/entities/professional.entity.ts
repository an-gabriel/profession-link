import { Profession } from '../../profession/entities/profession.entity';

import { BaseEntity } from '../../../common/entities/Base.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Professional extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  nome!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email!: string;

  @ManyToOne(() => Profession)
  @JoinColumn({ name: 'tipoDeProfissional' })
  tipoDeProfissional!: string;

  @Column({ type: 'boolean', default: true })
  situacao!: boolean;
}
