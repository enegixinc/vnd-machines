import { Entity } from 'typeorm';
import { MagexDatabaseEntity } from '../../common/database.entity';
import { MagexService } from '../../services/magex/magex.service';

@Entity('orders')
export class OrderEntity extends MagexDatabaseEntity {
  createMagexRecord(magexService: MagexService): Promise<void> {
    return Promise.resolve(undefined);
  }

  deleteMagexRecord(magexService: MagexService): Promise<void> {
    return Promise.resolve(undefined);
  }

  fetchMagexRecords(magexService: MagexService): Promise<OrderEntity[]> {
    // return magexService.orders.postOrders({
    //   formData: {
    //     start: '2024-04-10T00:00:00.000Z',
    //     end: '2024-04-14T23:59:59.999Z',
    //     id: 'tryvnd@point24h.com',
    //     ids: '657ab86ec7201f469894300f',
    //   },
    // }) as Promise<OrderEntity[]>;

    // @ts-expect-error mock data
    return Promise.resolve(mocked);
  }

  updateMagexRecord(magexService: MagexService): Promise<void> {
    return Promise.resolve(undefined);
  }
}

const mocked = [
  {
    status: 'Completed',
    payment_type: 'CASH',
    lang: 'en',
    _id: '6617a3b3d8bd1f1398447d64',
    machineID: {
      _id: '657ab86ec7201f469894300f',
      name: '5687',
      description: 'ZAIN',
    },
    products: [
      {
        quantity: 1,
        discount: 0,
        proposed: false,
        _id: '6617a3b3d8bd1f1398447d65',
        product: null,
        upc: '04',
        name: 'Sample 4 - Small Pot for Snacks',
        lane: '135',
        detail: 'Small Pot for Snacks',
        soldPrice: 0,
        tax_amount: 0,
        retail_price: 0,
        row_number: '23501',
      },
    ],
    referTo: 'tryvnd@point24h.com',
    tax: 0,
    total: 0,
    currency: 'KD',
    createdAt: '2024-04-11T11:45:55.000Z',
    createdAtUtc: '2024-04-11T08:45:55.000Z',
    utcOffset: 3,
    payment_transaction_id: '',
    payment_receipt: '',
    cart_number: '235',
    card_number: '',
    card_department: '',
    email: '',
    reservation_code: '',
    return_code: '',
    __v: 0,
  },
  {
    status: 'Completed',
    payment_type: 'CASH',
    lang: 'en',
    _id: '6617a097d8bd1f1398447666',
    machineID: {
      _id: '657ab86ec7201f469894300f',
      name: '5687',
      description: 'ZAIN',
    },
    products: [
      {
        quantity: 1,
        discount: 0,
        proposed: false,
        _id: '6617a097d8bd1f1398447667',
        product: null,
        upc: '04',
        name: 'Sample 4 - Small Pot for Snacks',
        lane: '135',
        detail: 'Small Pot for Snacks',
        soldPrice: 0,
        tax_amount: 0,
        retail_price: 0,
        row_number: '23401',
      },
    ],
    referTo: 'tryvnd@point24h.com',
    tax: 0,
    total: 0,
    currency: 'KD',
    createdAt: '2024-04-11T11:32:34.000Z',
    createdAtUtc: '2024-04-11T08:32:34.000Z',
    utcOffset: 3,
    payment_transaction_id: '',
    payment_receipt: '',
    cart_number: '234',
    card_number: '',
    card_department: '',
    email: '',
    reservation_code: '',
    return_code: '',
    __v: 0,
  },
  {
    status: 'Completed',
    payment_type: 'CASH',
    lang: 'en',
    _id: '66178f40d8bd1f1398445f5e',
    machineID: {
      _id: '657ab86ec7201f469894300f',
      name: '5687',
      description: 'ZAIN',
    },
    products: [
      {
        quantity: 1,
        discount: 0,
        proposed: false,
        _id: '66178f40d8bd1f1398445f5f',
        product: null,
        upc: '05',
        name: 'Sample 5 - Toast Sandwich',
        lane: '121',
        detail: 'Toast Sandwich',
        soldPrice: 0,
        tax_amount: 0,
        retail_price: 0,
        row_number: '23301',
      },
    ],
    referTo: 'tryvnd@point24h.com',
    tax: 0,
    total: 0,
    currency: 'KD',
    createdAt: '2024-04-11T10:18:44.000Z',
    createdAtUtc: '2024-04-11T07:18:44.000Z',
    utcOffset: 3,
    payment_transaction_id: '',
    payment_receipt: '',
    cart_number: '233',
    card_number: '',
    card_department: '',
    email: '',
    reservation_code: '',
    return_code: '',
    __v: 0,
  },
];
