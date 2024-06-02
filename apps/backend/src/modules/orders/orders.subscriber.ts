// import {
//   DataSource,
//   EntitySubscriberInterface,
//   EventSubscriber,
// } from 'typeorm';
// import { MagexService } from '../../services/magex/magex.service';
// import { Inject } from '@nestjs/common';
// import { EntitySyncer } from '../../common/entities/entity-syncer/entitySyncer';
//
// @EventSubscriber()
// export class OrdersSubscriber
//   extends EntitySyncer<OrdersEntity>
//   implements EntitySubscriberInterface<OrdersEntity>
// {
//   constructor(
//     @Inject(MagexService) private readonly magexService: MagexService,
//     @Inject(DataSource) protected dataSource: DataSource
//   ) {
//     super(dataSource);
//     this.dataSource.subscribers.push(this);
//   }
//
//   listenTo() {
//     return OrdersEntity;
//   }
//
//   async fetchMagexRecords() {
//     this.magexRecords =
//       await this.magexService.categories.getCategoriesByAccountName({
//         accountName: 'tryvnd@point24h.com',
//       });
//   }
// }
