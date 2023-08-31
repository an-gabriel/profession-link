import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/Base.entity';
import { Profession } from '../../profession/entities/profession.entity';

@Entity()
export class Professional extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  nome!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email!: string;

  @ManyToOne(() => Profession)
  @JoinColumn({ name: 'tipoDeProfissionalId' })
  tipoDeProfissional!: Profession;

  @Column({ type: 'boolean', default: true })
  situacao!: boolean;
}
