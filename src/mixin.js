function Mixin() {
  if (typeof this.extended === "function") {
    this.extended();
  }
}

Mixin.includeInto = function(constructor) {
  this.extend(constructor.prototype);
  for (let name in this) {
    const value = this[name];
    if (ExcludedClassProperties.indexOf(name) === -1) {
      if (!constructor.hasOwnProperty(name)) {
        constructor[name] = value;
      }
    }
  }
  return this.included?.call(constructor);
};

Mixin.extend = function(object) {
  for (const name of Object.getOwnPropertyNames(this.prototype)) {
    if (ExcludedPrototypeProperties.indexOf(name) === -1) {
      if (!object.hasOwnProperty(name)) {
        object[name] = this.prototype[name];
      }
    }
  }
  return this.prototype.extended?.call(object);
};

const ExcludedClassProperties = ['__super__'];

for (let name in Mixin) {
  ExcludedClassProperties.push(name);
}

const ExcludedPrototypeProperties = ['constructor', 'extended'];

module.exports = Mixin;
