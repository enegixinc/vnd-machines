// product.subscriber.ts

import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Inject } from '@nestjs/common';
import { ProductEntity, ProductStatus } from './entities/product.entity';
import { MagexService } from '../../services/magex/magex.service';
import { FillRequestProducts } from '../requests/fill-requests/fill-request.entity';

@EventSubscriber()
export class ProductSubscriber
  implements EntitySubscriberInterface<ProductEntity>
{
  constructor(
    @Inject(DataSource) private readonly dataSource: DataSource,
    @Inject(MagexService) private readonly magexService: MagexService
  ) {
    this.dataSource.subscribers.push(this);
  }

  /**
   * Specifies the entity this subscriber listens to.
   */
  listenTo() {
    return ProductEntity;
  }

  /**
   * Handles product creation.
   * If the product status is ACTIVE, create it in Magex as well.
   */
  async afterInsert(event: InsertEvent<ProductEntity>) {
    const product = event.entity;
    if (!product) return;

    if (product.status === ProductStatus.ACTIVE) {
      await this.createMagexRecord(product);
    }
  }

  /**
   * Handles product updates.
   * Synchronizes changes with Magex based on the product's status and previous state.
   */
  async beforeUpdate(event: UpdateEvent<ProductEntity>) {
    const entity = event.entity as ProductEntity;
    const databaseEntity = event.databaseEntity;

    if (!entity || !databaseEntity) return;

    // Detect status changes
    const statusChanged = entity.status !== databaseEntity.status;

    // If status changed to ACTIVE
    if (statusChanged && entity.status === ProductStatus.ACTIVE) {
      await this.createMagexRecord(entity);
    }

    // If status changed to PENDING from ACTIVE
    if (
      statusChanged &&
      databaseEntity.status === ProductStatus.ACTIVE &&
      entity.status === ProductStatus.PENDING
    ) {
      await this.deleteMagexRecord(entity);
    }

    // If already ACTIVE and status not changed, update Magex
    if (
      databaseEntity.status === ProductStatus.ACTIVE &&
      entity.status === ProductStatus.ACTIVE
    ) {
      await this.updateMagexRecord(entity);
    }
  }

  /**
   * Handles product deletion.
   * If the product was ACTIVE, delete it from Magex as well.
   */
  async beforeRemove(event: RemoveEvent<ProductEntity>) {
    const product = event.entity;
    if (!product) return;

    if (product.status === ProductStatus.ACTIVE) {
      await this.deleteMagexRecord(product);
    }

    // Handle related FillRequestProducts
    await this.handleBeforeDelete(event);
  }

  /**
   * Creates a product in Magex.
   */
  private async createMagexRecord(product: ProductEntity) {
    try {
      const formData = this.prepareFormData(product);

      const { newProduct } =
        (await this.magexService.products.postProductsCreate({
          formData: {
            ...formData,
            category: product.category?._id || null,
            brand: product.brand?._id || null,
            referTo: product.referTo || 'tryvnd@point24h.com',
            ...product.images,
          },
        })) as { newProduct: { _id: string } };

      // Assign Magex ID to product
      product.magex_id = newProduct._id; // Ensure this field corresponds to Magex's ID field

      await this.saveWithListenersDisabled(product);
    } catch (error) {
      console.error('Error creating Magex record:', error);
    }
  }

  /**
   * Updates a product in Magex.
   */
  private async updateMagexRecord(product: ProductEntity) {
    try {
      if (!product.magex_id) {
        console.error('Cannot update Magex record without magex_id');
        return;
      }

      const formData = this.prepareFormData(product);

      await this.magexService.products.putProductsEditById({
        id: product.magex_id, // Use magex_id instead of local _id
        formData: {
          ...formData,
          category: product.category?._id || null,
          brand: product.brand?._id || null,
          referTo: product.referTo || 'tryvnd@point24h.com',
          ...product.images,
        },
      });

      await this.saveWithListenersDisabled(product);
    } catch (error) {
      console.error('Error updating Magex record:', error);
    }
  }

  /**
   * Deletes a product from Magex.
   */
  private async deleteMagexRecord(product: ProductEntity) {
    try {
      if (!product.magex_id) {
        console.error('Cannot delete Magex record without magex_id');
        return;
      }

      await this.magexService.products.deleteProductsDeleteById({
        id: product.magex_id, // Use magex_id instead of local _id
      });

      product.magex_id = null;
      await this.saveWithListenersDisabled(product);
    } catch (error) {
      console.error('Error deleting Magex record:', error);
    }
  }

  /**
   * Prepares form data for Magex API.
   */
  private prepareFormData(product: ProductEntity) {
    const { supplier, ...rest } = product;
    return {
      ...this.removeExtraProps(rest, ['supplier', 'fullName']),
      ...this.handleMultiLangProps(rest),
    };
  }

  /**
   * Removes extra properties from the product object.
   */
  private removeExtraProps(
    object: Partial<ProductEntity>,
    extraProps: string[]
  ) {
    return Object.fromEntries(
      Object.entries(object).filter(([key]) => !extraProps.includes(key))
    );
  }

  /**
   * Handles multi-language properties by stringifying them.
   */
  private handleMultiLangProps(product: Partial<ProductEntity>) {
    const multiLangProps = [
      'name',
      'description',
      'ingredients',
      'detail',
      'include',
      'keyFeatures',
      'specification',
    ];
    return Object.fromEntries(
      Object.entries(product).map(([key, value]) => {
        if (multiLangProps.includes(key)) {
          return [key, JSON.stringify(value)];
        }
        return [key, value];
      })
    );
  }

  /**
   * Handles related FillRequestProducts before deletion.
   */
  private async handleBeforeDelete(event: RemoveEvent<ProductEntity>) {
    const fillRequestProductsRepository =
      this.dataSource.getRepository(FillRequestProducts);

    const productFillRequests = await fillRequestProductsRepository.find({
      where: {
        product_id: event.entity._id,
      },
    });

    for (const frp of productFillRequests) {
      frp.deletedProduct = event.entity;
      await fillRequestProductsRepository.save(frp);
    }
  }

  /**
   * Saves the entity without triggering listeners to prevent infinite loops.
   */
  private saveWithListenersDisabled = async (entity: ProductEntity) => {
    await this.dataSource.manager.save(entity, {
      listeners: false,
    });
  };
}
