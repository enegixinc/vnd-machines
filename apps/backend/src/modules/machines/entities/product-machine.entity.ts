// import { DatabaseEntity } from '../../../common/database.entity';
// import { MachineEntity } from './machine.entity';
// import { ManyToOne } from 'typeorm';
// import { ProductEntity } from '../../products/entities/product.entity';
//
// export class ProductMachineEntity extends DatabaseEntity {
//   current_stock: number;
//   max_stock: number;
//   upc: string;
//   stock: number;
//   floor: number;
//   lane: number;
//   name: string;
//   motor: string;
//   expiration_date: Date;
//
//   @ManyToOne(() => MachineEntity)
//   machine: MachineEntity;
//
//   @ManyToOne(() => ProductEntity)
//   product: ProductEntity[];
// }
//
// // {
// //   "current_stock": 7,
// //   "_id": "667d26bce7d1771ad0893490",
// //   "id": "66602f15cc11740e8c06dd49",
// //   "max_stock": 9,
// //   "upc": "0019",
// //   "stock": 1,
// //   "floor": 5,
// //   "lane": 1,
// //   "name": "Ceaser  Wrap ",
// //   "motor": "151",
// //   "expiration_date": "2024-06-26T22:00:00.000Z"
// // },
