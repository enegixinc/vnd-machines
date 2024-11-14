import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { SearchableMagexEntity } from '../../common/database.entity';
import { MagexService } from '../../services/magex/magex.service';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../products/entities/product.entity';
import { MachineEntity } from '../machines/entities/machine.entity';
import { CategoryEntity } from '../categories/category.entity';
import { MultiLangEntity } from '../products/entities/multiLang.entity';

@Entity('promotions')
export class PromotionEntity extends SearchableMagexEntity {
  @BeforeInsert()
  @BeforeUpdate()
  handleSearchableFields() {
    this.searchableText = MultiLangEntity.handleSearchableText(
      Object.values(this)
    );
  }

  @ApiProperty({ default: false })
  @Column({ default: false })
  isAllProducts: boolean;

  @ApiProperty({ default: false })
  @Column({ default: false })
  isAllMachines: boolean;

  @ManyToMany(() => MachineEntity, (machine) => machine.promotions, {
    nullable: true,
  })
  @JoinTable()
  machine: MachineEntity[] | { _id: string };

  @ManyToMany(() => ProductEntity, (product) => product.promotions, {
    nullable: true,
  })
  @JoinTable()
  product: ProductEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.promotion, {
    nullable: true,
  })
  category: CategoryEntity[];

  @ApiProperty({ type: String })
  @Column({ default: '' })
  code: string;

  @ApiProperty({ type: String })
  @Column({ default: '' })
  department: string;

  @ApiProperty({ type: Boolean })
  @Column({ default: false })
  percentage: boolean;

  @ApiProperty({ type: String })
  @Column()
  cateOrProd: string;

  @ApiProperty({ type: Number })
  @Column({ type: 'integer' })
  productsToBuy: number;

  @ApiProperty({ type: Boolean })
  @Column({ default: true })
  active: boolean;

  @ApiProperty({ type: [String] })
  @Column('simple-array', { nullable: true })
  emailCode: string[];

  @ApiProperty({ type: [String] })
  @Column('simple-array', { nullable: true })
  oneTimeCode: string[];

  @ApiProperty({ type: [String] })
  @Column('simple-array', { nullable: true })
  originCode: string[];

  @ApiProperty({ type: String })
  @Column()
  title: string;

  @ApiProperty({ type: Date })
  @Column()
  startDate: Date;

  @ApiProperty({ type: Date })
  @Column()
  endDate: Date;

  @ApiProperty({ type: String })
  @Column()
  startTime: string;

  @ApiProperty({ type: String })
  @Column()
  endTime: string;

  @ApiProperty({ type: String })
  @Column()
  promoType: string;

  @ApiProperty({ type: Number })
  @Column({ type: 'numeric' })
  amount: number;

  @ApiProperty({ type: String })
  @Column()
  referTo: string;

  @ApiProperty({ type: Boolean })
  @Column({ default: false })
  isOne: boolean;

  async createMagexRecord(magexService: MagexService): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore - to be fixed
    const { order: newPromotion } =
      await magexService.promotions.postApiPromosCreate({
        // @ts-expect-error - asjkdbh
        requestBody: Object.assign(this, {
          machine: this.machine[0]._id,
          product: this.product.map((product) => product._id),
        }),
      });

    Object.assign(this, newPromotion);
    Object.assign(this, { lastSyncAt: newPromotion.updatedAt });
  }

  async deleteMagexRecord(magexService: MagexService): Promise<void> {
    await magexService.promotions.deleteApiPromosById({ id: this._id });
  }

  async fetchMagexRecords(
    magexService: MagexService
  ): Promise<PromotionEntity[]> {
    try {
      const promotions =
        await magexService.promotions.getApiPromosByAccountName({
          accountName: 'tryvnd@point24h.com',
        });
      console.log('Promotions fetched:', promotions);
      return promotions as PromotionEntity[];
    } catch (error) {
      console.error('Error fetching Magex records:', error);
      return [];
    }
  }

  async updateMagexRecord(magexService: MagexService): Promise<void> {
    console.log('Updating promotion:', this._id);
    await magexService.promotions.patchApiPromosUpdateById({
      id: this._id,
      requestBody: Object.assign(this),
    });

    const promotions = await this.fetchMagexRecords(magexService);

    const newPromotion = promotions.find(
      (promotion) => promotion._id === this._id
    );

    Object.assign(this, newPromotion);
    Object.assign(this, { lastSyncAt: new Date() });
  }
}
