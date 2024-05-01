import { I_MAGEX_Product } from '@core';

export class MagexProduct {
  constructor(props: I_MAGEX_Product) {
    Object.assign(this, props);
    this.convertMultiLangToJson();
  }

  convertMultiLangToJson() {
    const multiLangProps = [
      'name',
      'detail',
      'keyFeatures',
      'include',
      'specification',
      'description',
      'ingredients',
    ];
    multiLangProps.forEach((prop) => {
      if (this[prop] && typeof this[prop] === 'object') {
        this[prop] = JSON.stringify(this[prop]);
      }
    });
  }
}
