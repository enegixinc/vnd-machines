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
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  machine: MachineEntity[] | { _id: string };

  @ManyToMany(() => ProductEntity, (product) => product.promotions, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
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

  @ApiProperty({ type: Boolean })
  @Column({ default: false })
  isLocal: boolean;

  async createMagexRecord(magexService: MagexService): Promise<void> {
    try {
      console.log('Creating promotion:', this);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore - to be fixed
      const { order: newPromotion } =
        await magexService.promotions.postApiPromosCreate({
          // @ts-expect-error - asjkdbh
          requestBody: Object.assign(this, {
            // machine: this.machine[0]._id,
            // product: this.product.map((product) => product._id),
          }),
        });

      Object.assign(this, newPromotion);
      Object.assign(this, { lastSyncAt: newPromotion.updatedAt });
    } catch (error) {
      console.error('Error creating Magex record:', error);
    }
  }

  async deleteMagexRecord(magexService: MagexService): Promise<void> {
    try {
      console.log('Deleting promotion:', this._id);
      await magexService.promotions.deleteApiPromosById({ id: this._id });
    } catch (error) {
      console.error('Error deleting Magex record', error);
    }
  }

  async fetchMagexRecords(
    magexService: MagexService
  ): Promise<PromotionEntity[]> {
    try {
      const promotions =
        await magexService.promotions.getApiPromosByAccountName({
          accountName: 'tryvnd@point24h.com',
        });
      return promotions as PromotionEntity[];
    } catch (error) {
      console.error('Error fetching Magex records:', error);
      return [];
    }
  }

  async getPromotionById(
    magexService: MagexService,
    id: string
  ): Promise<PromotionEntity> {
    try {
      const promotions = await this.fetchMagexRecords(magexService);

      return promotions.find((promotion) => promotion._id === id);
    } catch (error) {
      console.error('Error fetching Magex record:', error);
      return null;
    }
  }

  async updateMagexRecord(magexService: MagexService): Promise<void> {
    try {
      const id = this._id;
      console.log('Updating promotion:', id);

      const oldPromotion = await this.getPromotionById(magexService, id);

      // @ts-expect-error - to be fixed
      oldPromotion.machine = oldPromotion.machine?.all
        ? 'All Machines'
        : oldPromotion.machine;

      switch (oldPromotion.cateOrProd) {
        case 'prod':
          // @ts-expect-error - to be fixed
          oldPromotion.product = oldPromotion.product.map(
            (product) => product._id
          );
          break;
        case 'cate':
          // @ts-expect-error - to be fixed
          oldPromotion.product = oldPromotion.category.map(
            (category) => category._id
          );
          break;
        case 'All Products':
          // @ts-expect-error - to be fixed
          oldPromotion.product = 'All Products';
      }

      console.log('new promotion:', Object.assign({}, oldPromotion, this));

      await magexService.promotions.patchApiPromosUpdateById({
        id: this._id,
        // @ts-expect-error - to be fixed
        requestBody: Object.assign({}, oldPromotion, this),
      });

      const newPromotion = await this.getPromotionById(magexService, id);

      Object.assign(this, newPromotion);
      Object.assign(this, { lastSyncAt: new Date() });
    } catch (error) {
      console.error('Error updating Magex record:', error);
    }
  }
}
