export function Getter(target: any, key: string) {
  Object.defineProperty(target, key, {
    get() {
      return this.props[key]; // Access the property from `props`
    },
    enumerable: true,
    configurable: true,
  });
}