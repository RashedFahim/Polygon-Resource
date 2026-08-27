export const getProductSlug = (name) => name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const getProductPath = (name) => `/${getProductSlug(name)}`;

export const getProductAnchor = (name) => `product-${getProductSlug(name)}`;
