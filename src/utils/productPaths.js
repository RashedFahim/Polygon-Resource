export const getProductSlug = (productOrName) => {
  const value = typeof productOrName === 'string'
    ? productOrName
    : productOrName.slug || productOrName.name;

  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

export const getProductPath = (name) => `/${getProductSlug(name)}`;

export const getProductAnchor = (name) => `product-${getProductSlug(name)}`;
