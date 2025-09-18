import { makeAutoObservable } from 'mobx';
import type { PropertyDataProvider } from '../../data-providers/property/types';
import type { Property } from '../../entities';

export class PropertyStore {
  private _properties: Property[] = [];
  constructor(private _propertyDataProvider: PropertyDataProvider) {
    makeAutoObservable(this);
  }

  async loadProperties() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    this._properties = await this._propertyDataProvider.getProperties();
  }

  get properties() {
    return this._properties;
  }
}
